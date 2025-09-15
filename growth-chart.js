// 生长发育曲线图表功能
class GrowthChart {
    constructor() {
        this.growthData = this.loadData();
        this.initCharts();
        this.setupEventListeners();
        this.updateCharts();
    }

    // 加载本地存储的数据
    loadData() {
        const savedData = localStorage.getItem('babyGrowthData');
        return savedData ? JSON.parse(savedData) : [];
    }

    // 保存数据到本地存储
    saveData() {
        localStorage.setItem('babyGrowthData', JSON.stringify(this.growthData));
    }

    // 初始化图表
    initCharts() {
        // 身高图表
        this.heightChart = new Chart(
            document.getElementById('height-chart'),
            this.getChartConfig('身高', 'cm', '#ff6b6b')
        );

        // 体重图表
        this.weightChart = new Chart(
            document.getElementById('weight-chart'),
            this.getChartConfig('体重', 'kg', '#4ecdc4')
        );
    }

    // 获取图表配置
    getChartConfig(label, unit, color) {
        return {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: `宝宝${label}`,
                        data: [],
                        borderColor: color,
                        backgroundColor: color + '20',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: `${label}标准(P50)`,
                        data: [],
                        borderColor: '#95a5a6',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `${label}发育曲线`
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${context.parsed.y} ${unit}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '月龄'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: unit
                        }
                    }
                }
            }
        };
    }

    // 设置事件监听器
    setupEventListeners() {
        const form = document.getElementById('growth-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addGrowthRecord();
        });

        // 设置默认日期为今天
        document.getElementById('record-date').value = new Date().toISOString().split('T')[0];
    }

    // 添加生长记录
    addGrowthRecord() {
        const record = {
            date: document.getElementById('record-date').value,
            ageMonths: parseInt(document.getElementById('age-months').value),
            height: parseFloat(document.getElementById('height').value),
            weight: parseFloat(document.getElementById('weight').value)
        };

        this.growthData.push(record);
        this.growthData.sort((a, b) => a.ageMonths - b.ageMonths);
        
        this.saveData();
        this.updateCharts();
        this.updateAssessment();
        
        // 重置表单
        document.getElementById('growth-form').reset();
        document.getElementById('record-date').value = new Date().toISOString().split('T')[0];
    }

    // 更新图表数据
    updateCharts() {
        if (this.growthData.length === 0) return;

        const ages = this.growthData.map(record => record.ageMonths);
        const heights = this.growthData.map(record => record.height);
        const weights = this.growthData.map(record => record.weight);

        // 更新身高图表
        this.heightChart.data.labels = ages;
        this.heightChart.data.datasets[0].data = heights;
        this.heightChart.data.datasets[1].data = this.getStandardHeightData(ages);
        this.heightChart.update();

        // 更新体重图表
        this.weightChart.data.labels = ages;
        this.weightChart.data.datasets[0].data = weights;
        this.weightChart.data.datasets[1].data = this.getStandardWeightData(ages);
        this.weightChart.update();
    }

    // 获取标准身高数据（WHO标准）
    getStandardHeightData(ages) {
        // WHO 0-2岁男孩身高标准（P50）
        const standardHeights = {
            0: 49.9, 1: 54.7, 2: 58.4, 3: 61.4, 4: 63.9,
            5: 65.9, 6: 67.6, 7: 69.2, 8: 70.6, 9: 72.0,
            10: 73.3, 11: 74.5, 12: 75.7, 13: 76.9, 14: 78.0,
            15: 79.1, 16: 80.2, 17: 81.2, 18: 82.3, 19: 83.2,
            20: 84.2, 21: 85.1, 22: 86.0, 23: 86.9, 24: 87.8
        };

        return ages.map(age => standardHeights[age] || null);
    }

    // 获取标准体重数据（WHO标准）
    getStandardWeightData(ages) {
        // WHO 0-2岁男孩体重标准（P50）
        const standardWeights = {
            0: 3.3, 1: 4.5, 2: 5.6, 3: 6.4, 4: 7.0,
            5: 7.5, 6: 7.9, 7: 8.3, 8: 8.6, 9: 8.9,
            10: 9.2, 11: 9.4, 12: 9.6, 13: 9.9, 14: 10.1,
            15: 10.3, 16: 10.5, 17: 10.7, 18: 10.9, 19: 11.1,
            20: 11.3, 21: 11.5, 22: 11.8, 23: 12.0, 24: 12.2
        };

        return ages.map(age => standardWeights[age] || null);
    }

    // 更新发育评估
    updateAssessment() {
        if (this.growthData.length === 0) return;

        const latestRecord = this.growthData[this.growthData.length - 1];
        const standardHeight = this.getStandardHeightData([latestRecord.ageMonths])[0];
        const standardWeight = this.getStandardWeightData([latestRecord.ageMonths])[0];

        const heightPercentile = this.calculatePercentile(latestRecord.height, standardHeight, 'height');
        const weightPercentile = this.calculatePercentile(latestRecord.weight, standardWeight, 'weight');

        const assessmentElement = document.getElementById('assessment-result');
        assessmentElement.innerHTML = `
            <div class="assessment-summary">
                <h3>${latestRecord.ageMonths}个月发育评估</h3>
                <div class="assessment-metrics">
                    <div class="metric">
                        <span class="label">身高：</span>
                        <span class="value">${latestRecord.height} cm</span>
                        <span class="percentile ${this.getPercentileClass(heightPercentile)}">${heightPercentile}</span>
                    </div>
                    <div class="metric">
                        <span class="label">体重：</span>
                        <span class="value">${latestRecord.weight} kg</span>
                        <span class="percentile ${this.getPercentileClass(weightPercentile)}">${weightPercentile}</span>
                    </div>
                </div>
                <p class="assessment-note">
                    * 基于WHO儿童生长标准参考值
                </p>
            </div>
        `;
    }

    // 计算百分位数
    calculatePercentile(actual, standard, type) {
        if (!standard) return '暂无数据';
        
        const ratio = actual / standard;
        let percentile;
        
        if (ratio < 0.9) percentile = '偏低';
        else if (ratio < 1.1) percentile = '正常';
        else percentile = '偏高';
        
        return percentile;
    }

    // 获取百分位数的CSS类
    getPercentileClass(percentile) {
        switch (percentile) {
            case '偏低': return 'low';
            case '正常': return 'normal';
            case '偏高': return 'high';
            default: return '';
        }
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    new GrowthChart();
});