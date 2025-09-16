// 生长发育曲线图表功能
class GrowthChart {
    constructor() {
        this.growthData = this.loadData();
        this.initCharts();
        this.setupEventListeners();
        this.updateCharts();
        this.displayRecords();
    }
// WHO标准生长数据 (0-36个月, 厘米/公斤)
// 男孩身高 (P3, P50, P97)
const boysHeightData = {
    p3: [48.0, 51.0, 54.0, 56.5, 58.8, 61.0, 63.0, 64.9, 66.7, 68.4, 70.0, 71.5, 73.0, 74.4, 75.8, 77.1, 78.4, 79.7, 80.9, 82.1, 83.3, 84.4, 85.5, 86.6, 87.7, 88.7, 89.7, 90.7, 91.7, 92.6, 93.5, 94.4, 95.3, 96.1, 96.9, 97.7, 98.5],
    p50: [49.9, 53.7, 57.1, 60.2, 62.9, 65.4, 67.8, 70.1, 72.3, 74.5, 76.5, 78.5, 80.4, 82.2, 84.0, 85.7, 87.4, 89.1, 90.7, 92.3, 93.9, 95.4, 96.9, 98.4, 99.8, 101.2, 102.6, 103.9, 105.2, 106.5, 107.8, 109.0, 110.2, 111.4, 112.6, 113.8, 115.0],
    p97: [55.0, 58.5, 62.0, 65.2, 68.0, 70.6, 73.1, 75.5, 77.8, 80.0, 82.1, 84.2, 86.2, 88.1, 90.0, 91.8, 93.6, 95.3, 97.0, 98.6, 100.2, 101.8, 103.3, 104.8, 106.3, 107.7, 109.1, 110.5, 111.9, 113.2, 114.5, 115.8, 117.1, 118.3, 119.5, 120.7, 121.9]
};

// 男孩体重 (P3, P50, P97)
const boysWeightData = {
    p3: [2.4, 3.2, 3.8, 4.4, 4.9, 5.4, 5.8, 6.2, 6.6, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.8, 9.0, 9.3, 9.5, 9.7, 10.0, 10.2, 10.4, 10.6, 10.8, 11.0, 11.2, 11.4, 11.6, 11.8, 12.0, 12.2, 12.4, 12.6, 12.8, 13.0, 13.2],
    p50: [3.3, 4.5, 5.7, 6.9, 7.9, 8.9, 9.7, 10.5, 11.2, 11.9, 12.5, 13.1, 13.7, 14.2, 14.7, 15.2, 15.6, 16.0, 16.4, 16.8, 17.1, 17.5, 17.8, 18.1, 18.4, 18.7, 19.0, 19.3, 19.6, 19.9, 20.2, 20.5, 20.8, 21.1, 21.4, 21.7, 22.0],
    p97: [4.5, 6.1, 7.5, 8.9, 10.2, 11.4, 12.5, 13.6, 14.6, 15.6, 16.5, 17.4, 18.2, 19.0, 19.8, 20.5, 21.2, 21.9, 22.6, 23.2, 23.8, 24.4, 25.0, 25.6, 26.1, 26.7, 27.2, 27.7, 28.2, 28.7, 29.2, 29.7, 30.2, 30.7, 31.2, 31.7, 32.2]
};

// 女孩身高 (P3, P50, P97)
const girlsHeightData = {
    p3: [47.5, 50.5, 53.7, 56.2, 58.4, 60.5, 62.5, 64.3, 66.0, 67.6, 69.2, 70.7, 72.1, 73.5, 74.9, 76.2, 77.4, 78.7, 79.9, 81.1, 82.3, 83.4, 84.5, 85.6, 86.7, 87.7, 88.7, 89.7, 90.7, 91.6, 92.5, 93.4, 94.3, 95.1, 95.9, 96.7, 97.5],
    p50: [49.1, 52.8, 56.2, 59.2, 61.8, 64.2, 66.5, 68.7, 70.9, 73.0, 75.0, 76.9, 78.8, 80.6, 82.4, 84.1, 85.8, 87.4, 89.0, 90.6, 92.1, 93.7, 95.2, 96.6, 98.0, 99.4, 100.7, 102.0, 103.3, 104.6, 105.8, 107.0, 108.2, 109.4, 110.5, 111.7, 112.8],
    p97: [54.4, 57.9, 61.3, 64.4, 67.1, 69.7, 72.1, 74.4, 76.6, 78.8, 80.8, 82.8, 84.8, 86.6, 88.4, 90.2, 91.9, 93.6, 95.3, 96.9, 98.5, 100.1, 101.6, 103.1, 104.5, 105.9, 107.3, 108.6, 109.9, 111.2, 112.5, 113.7, 114.9, 116.1, 117.3, 118.4, 119.6]
};

// 女孩体重 (P3, P50, P97)
const girlsWeightData = {
    p3: [2.3, 3.1, 3.7, 4.3, 4.8, 5.3, 5.7, 6.1, 6.5, 6.8, 7.2, 7.5, 7.8, 8.1, 8.4, 8.7, 8.9, 9.2, 9.4, 9.6, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 12.9, 13.1],
    p50: [3.2, 4.3, 5.5, 6.6, 7.6, 8.5, 9.3, 10.1, 10.8, 11.4, 12.0, 12.6, 13.2, 13.7, 14.2, 14.7, 15.1, 15.5, 15.9, 16.3, 16.6, 16.9, 17.3, 17.6, 17.9, 18.2, 18.5, 18.8, 19.1, 19.4, 19.7, 20.0, 20.3, 20.6, 20.9, 21.2, 21.5],
    p97: [4.3, 5.8, 7.1, 8.4, 9.6, 10.8, 11.9, 12.9, 13.9, 14.8, 15.7, 16.6, 17.4, 18.2, 18.9, 19.7, 20.4, 21.1, 21.7, 22.4, 23.0, 23.6, 24.2, 24.7, 25.3, 25.8, 26.3, 26.8, 27.3, 27.8, 28.3, 28.8, 29.3, 29.8, 30.3, 30.8, 31.3]
};

const growthStandards = {
    boy: {
        height: boysHeightData,
        weight: boysWeightData
    },
    girl: {
        height: girlsHeightData,
        weight: girlsWeightData
    }
};

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

        // 删除记录事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const index = e.target.dataset.index;
                this.deleteRecord(index);
            }
        });

        // 导出事件
        document.getElementById('export-btn')?.addEventListener('click', () => this.exportData());
        // 导入事件
        document.getElementById('import-btn')?.addEventListener('click', () => this.importData());

        // 性别切换
        document.getElementById('gender-select')?.addEventListener('change', (e) => {
            this.gender = e.target.value;
            this.saveData();
            this.updateCharts();
            this.updateAssessment();
        });

        // 设置默认日期为今天
        document.getElementById('record-date').value = new Date().toISOString().split('T')[0];
        this.gender = localStorage.getItem('babyGender') || 'boy'; // 默认男孩
        document.getElementById('gender-select').value = this.gender;
    }

    // 添加生长记录
    addGrowthRecord() {
        const record = {
            date: document.getElementById('record-date').value,
            ageMonths: parseInt(document.getElementById('age-months').value),
            height: parseFloat(document.getElementById('height').value),
            weight: parseFloat(document.getElementById('weight').value)
        };

        // 简单验证
        if (record.ageMonths < 0 || record.ageMonths > 36) {
            alert('月龄应在0-36个月之间');
            return;
        }
        if (record.height < 40 || record.height > 120) {
            alert('身高应在40-120cm之间');
            return;
        }
        if (record.weight < 2 || record.weight > 25) {
            alert('体重应在2-25kg之间');
            return;
        }

        // 检查重复月龄
        const existingIndex = this.growthData.findIndex(r => r.ageMonths === record.ageMonths);
        if (existingIndex !== -1) {
            if (!confirm('该月龄已有记录，是否覆盖？')) return;
            this.growthData[existingIndex] = record;
        } else {
            this.growthData.push(record);
        }

        this.growthData.sort((a, b) => a.ageMonths - b.ageMonths);
        
        this.saveData();
        this.updateCharts();
        this.updateAssessment();
        this.displayRecords();
        
        // 重置表单
        document.getElementById('growth-form').reset();
        document.getElementById('record-date').value = new Date().toISOString().split('T')[0];
    }

    // 删除记录
    deleteRecord(index) {
        if (confirm('确认删除此记录？')) {
            this.growthData.splice(index, 1);
            this.saveData();
            this.updateCharts();
            this.updateAssessment();
            this.displayRecords();
        }
    }

    // 显示记录列表
    displayRecords() {
        const recordsContainer = document.getElementById('records-list');
        if (!recordsContainer) return;

        if (this.growthData.length === 0) {
            recordsContainer.innerHTML = '<p>暂无记录</p>';
            return;
        }

        recordsContainer.innerHTML = this.growthData.map((record, index) => `
            <div class="record-item">
                <span>${record.date} (${record.ageMonths}个月)</span>
                <span>身高: ${record.height}cm</span>
                <span>体重: ${record.weight}kg</span>
                <button class="delete-btn" data-index="${index}">删除</button>
            </div>
        `).join('');
    }

    // 导出数据
    exportData() {
        const dataStr = JSON.stringify(this.growthData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `growth-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // 导入数据
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const importedData = JSON.parse(event.target.result);
                        if (Array.isArray(importedData)) {
                            this.growthData = importedData;
                            this.saveData();
                            this.updateCharts();
                            this.updateAssessment();
                            this.displayRecords();
                            alert('数据导入成功');
                        } else {
                            alert('无效的数据格式');
                        }
                    } catch (err) {
                        alert('导入失败：' + err.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
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

    // 获取标准身高数据（WHO标准，扩展到36个月）
    getStandardHeightData(ages) {
        const standardHeightsBoy = {
            0: 49.9, 1: 54.7, 2: 58.4, 3: 61.4, 4: 63.9,
            5: 65.9, 6: 67.6, 7: 69.2, 8: 70.6, 9: 72.0,
            10: 73.3, 11: 74.5, 12: 75.7, 13: 76.9, 14: 78.0,
            15: 79.1, 16: 80.2, 17: 81.2, 18: 82.3, 19: 83.2,
            20: 84.2, 21: 85.1, 22: 86.0, 23: 86.9, 24: 87.8,
            25: 88.6, 26: 89.4, 27: 90.2, 28: 91.0, 29: 91.8,
            30: 92.5, 31: 93.3, 32: 94.1, 33: 94.8, 34: 95.6,
            35: 96.3, 36: 97.1
        };

        const standardHeightsGirl = {
            0: 49.1, 1: 53.7, 2: 57.1, 3: 59.8, 4: 62.1,
            5: 64.0, 6: 65.7, 7: 67.3, 8: 68.7, 9: 70.1,
            10: 71.5, 11: 72.8, 12: 74.0, 13: 75.2, 14: 76.4,
            15: 77.5, 16: 78.5, 17: 79.5, 18: 80.5, 19: 81.5,
            20: 82.5, 21: 83.4, 22: 84.3, 23: 85.2, 24: 86.1,
            25: 86.9, 26: 87.7, 27: 88.5, 28: 89.3, 29: 90.1,
            30: 90.9, 31: 91.6, 32: 92.4, 33: 93.2, 34: 93.9,
            35: 94.7, 36: 95.4
        };

        const standards = this.gender === 'girl' ? standardHeightsGirl : standardHeightsBoy;
        return ages.map(age => standards[age] || null);
    }

    // 获取标准体重数据（WHO标准，扩展到36个月）
    getStandardWeightData(ages) {
        const standardWeightsBoy = {
            0: 3.3, 1: 4.5, 2: 5.6, 3: 6.4, 4: 7.0,
            5: 7.5, 6: 7.9, 7: 8.3, 8: 8.6, 9: 8.9,
            10: 9.2, 11: 9.4, 12: 9.6, 13: 9.9, 14: 10.1,
            15: 10.3, 16: 10.5, 17: 10.7, 18: 10.9, 19: 11.1,
            20: 11.3, 21: 11.5, 22: 11.8, 23: 12.0, 24: 12.2,
            25: 12.4, 26: 12.7, 27: 12.9, 28: 13.1, 29: 13.3,
            30: 13.5, 31: 13.8, 32: 14.0, 33: 14.2, 34: 14.4,
            35: 14.6, 36: 14.9
        };

        const standardWeightsGirl = {
            0: 3.2, 1: 4.2, 2: 5.1, 3: 5.8, 4: 6.4,
            5: 6.9, 6: 7.3, 7: 7.6, 8: 7.9, 9: 8.2,
            10: 8.5, 11: 8.7, 12: 8.9, 13: 9.2, 14: 9.4,
            15: 9.6, 16: 9.8, 17: 10.0, 18: 10.2, 19: 10.4,
            20: 10.5, 21: 10.7, 22: 10.9, 23: 11.1, 24: 11.3,
            25: 11.5, 26: 11.7, 27: 11.9, 28: 12.1, 29: 12.3,
            30: 12.5, 31: 12.7, 32: 12.9, 33: 13.1, 34: 13.3,
            35: 13.5, 36: 13.7
        };

        const standards = this.gender === 'girl' ? standardWeightsGirl : standardWeightsBoy;
        return ages.map(age => standards[age] || null);
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
                <div class="overall-assessment">
                    <p class="${this.getOverallAssessmentClass(heightPercentile, weightPercentile)}">
                        ${this.getOverallAssessmentText(heightPercentile, weightPercentile)}
                    </p>
                </div>
                <p class="assessment-note">
                    * 基于WHO儿童生长标准参考值 (性别: ${this.gender === 'boy' ? '男孩' : '女孩'})
                </p>
            </div>
        `;
    }

    // 计算百分位数（简化版本，基于标准偏差的粗略估计）
    calculatePercentile(value, standard, type) {
        if (!standard) return 'P50'; // 默认值

        const sd = standard * 0.1;
        const zScore = (value - standard) / sd;
        
        if (zScore > 2) return 'P97';
        if (zScore > 1.5) return 'P90';
        if (zScore > 0.67) return 'P75';
        if (zScore > 0) return 'P50';
        if (zScore > -0.67) return 'P25';
        if (zScore > -1.5) return 'P10';
        return 'P3';
    }

    // 获取百分位 CSS 类
    getPercentileClass(percentile) {
        if (percentile === 'P97' || percentile === 'P90') return 'high';
        if (percentile === 'P75' || percentile === 'P25') return 'normal';
        if (percentile === 'P10' || percentile === 'P3') return 'low';
        return 'normal';
    }

    // 获取整体评估文本
    getOverallAssessmentText(heightP, weightP) {
        const heightLevel = this.getLevel(heightP);
        const weightLevel = this.getLevel(weightP);
        
        if (heightLevel === 'high' && weightLevel === 'high') {
            return '发育优秀，身高体重均高于平均水平';
        } else if (heightLevel === 'normal' && weightLevel === 'normal') {
            return '发育正常，身高体重处于正常范围';
        } else if (heightLevel === 'low' || weightLevel === 'low') {
            return '建议关注发育情况，必要时咨询医生';
        } else {
            return '发育情况需进一步观察';
        }
    }

    // 获取整体评估 CSS 类
    getOverallAssessmentClass(heightP, weightP) {
        const heightLevel = this.getLevel(heightP);
        const weightLevel = this.getLevel(weightP);
        
        if ((heightLevel === 'low' || weightLevel === 'low') && !(heightLevel === 'high' && weightLevel === 'high')) {
            return 'warning';
        } else if (heightLevel === 'high' && weightLevel === 'high') {
            return 'excellent';
        }
        return 'normal';
    }

    // 获取水平分类
    getLevel(percentile) {
        if (percentile === 'P97' || percentile === 'P90') return 'high';
        if (percentile === 'P75' || percentile === 'P25') return 'normal';
        if (percentile === 'P10' || percentile === 'P3') return 'low';
        return 'normal';
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    new GrowthChart();
});