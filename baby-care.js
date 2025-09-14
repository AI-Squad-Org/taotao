// 宝宝护理指南数据
const babyCareData = {
    // 新生儿阶段 (0-1个月)
    newborn: {
        title: "👶 新生儿期 (0-1个月)",
        sections: [
            {
                id: "feeding",
                title: "🍼 喂养",
                content: [
                    "按需喂养，每2-3小时喂一次",
                    "母乳喂养：每次15-20分钟",
                    "配方奶：每次60-90ml",
                    "注意拍嗝，防止吐奶",
                    "观察大小便次数和颜色"
                ]
            },
            {
                id: "sleep",
                title: "😴 睡眠",
                content: [
                    "每天睡眠16-18小时",
                    "保持仰卧姿势睡觉",
                    "使用结实的床垫，避免柔软物品",
                    "保持房间温度适宜(24-26°C)",
                    "建立规律的睡眠习惯"
                ]
            },
            {
                id: "health",
                title: "❤️ 健康",
                content: [
                    "脐带护理：保持干燥清洁",
                    "体温监测：36.5-37.5°C",
                    "皮肤护理：使用温和的婴儿护肤品",
                    "疫苗接种：按计划进行",
                    "注意黄疸症状"
                ]
            },
            {
                id: "development",
                title: "🌟 发育",
                content: [
                    "视觉：能看清20-30cm距离",
                    "听觉：对声音有反应",
                    "运动：有抓握反射",
                    "社交：开始识别妈妈的声音",
                    "多进行肌肤接触和拥抱"
                ]
            }
        ]
    },

    // 婴儿期 (1-12个月)
    infant: {
        title: "👶 婴儿期 (1-12个月)",
        sections: [
            {
                id: "feeding",
                title: "🍼 喂养",
                content: [
                    "4-6个月开始添加辅食",
                    "从单一食材开始尝试",
                    "逐渐增加食物种类",
                    "保证奶量：600-800ml/天",
                    "注意食物过敏反应"
                ]
            },
            {
                id: "sleep",
                title: "😴 睡眠",
                content: [
                    "建立固定的睡前程序",
                    "白天小睡2-3次",
                    "夜间睡眠10-12小时",
                    "学习自我安抚入睡",
                    "保持安全的睡眠环境"
                ]
            },
            {
                id: "health",
                title: "❤️ 健康",
                content: [
                    "定期体检和生长发育评估",
                    "注意牙齿护理",
                    "预防意外伤害",
                    "按时接种疫苗",
                    "注意常见疾病症状"
                ]
            },
            {
                id: "development",
                title: "🌟 发育",
                content: [
                    "大运动：抬头、翻身、坐、爬、站",
                    "精细动作：抓握、传递物品",
                    "语言：咿呀学语、理解简单指令",
                    "认知：物体恒存性、因果关系",
                    "社交：认生、模仿表情动作"
                ]
            }
        ]
    },

    // 幼儿期 (1-3岁)
    toddler: {
        title: "👦 幼儿期 (1-3岁)",
        sections: [
            {
                id: "feeding",
                title: "🍽️ 饮食",
                content: [
                    "三餐两点规律饮食",
                    "提供多样化的食物",
                    "培养自主进食能力",
                    "控制零食和糖分摄入",
                    "保证充足水分"
                ]
            },
            {
                id: "sleep",
                title: "😴 睡眠",
                content: [
                    "每天总睡眠11-14小时",
                    "建立固定的作息时间",
                    "午睡1-2小时",
                    "处理分离焦虑",
                    "创造舒适的睡眠环境"
                ]
            },
            {
                id: "health",
                title: "❤️ 健康",
                content: [
                    "定期口腔检查",
                    "安全教育：防跌倒、防烫伤",
                    "培养卫生习惯",
                    "注意营养均衡",
                    "定期生长发育评估"
                ]
            },
            {
                id: "development",
                title: "🌟 发育",
                content: [
                    "语言爆发期：词汇量快速增加",
                    "大运动：走路、跑步、跳跃",
                    "精细动作：涂鸦、堆叠积木",
                    "社交：平行游戏、分享意识",
                    "情绪：自我意识增强、叛逆期"
                ]
            }
        ]
    }
};

// 根据月龄获取对应的护理指南
function getCareGuideByAge(months) {
    if (months < 1) {
        return babyCareData.newborn;
    } else if (months < 12) {
        return babyCareData.infant;
    } else {
        return babyCareData.toddler;
    }
}

// 更新显示的年龄
function updateAge() {
    const months = parseInt(document.getElementById('months').value) || 0;
    const days = parseInt(document.getElementById('days').value) || 0;
    
    document.getElementById('selected-age').textContent = 
        `${months}个月${days > 0 ? days + '天' : ''}`;
    
    renderCareContent(months);
}

// 使用当前宝宝年龄
function useCurrentAge() {
    const birthDate = new Date('2024-03-12');
    const today = new Date();
    
    // 计算月数
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += today.getMonth();
    months = Math.max(0, months);
    
    // 计算剩余天数
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - months, birthDate.getDate());
    const days = Math.floor((today - lastMonth) / (1000 * 60 * 60 * 24));
    
    document.getElementById('months').value = months;
    document.getElementById('days').value = days;
    updateAge();
}

// 渲染护理内容
function renderCareContent(months) {
    const careGuide = getCareGuideByAge(months);
    const contentElement = document.getElementById('care-content');
    
    let html = `
        <div class="guide-header">
            <h2>${careGuide.title}</h2>
            <p>以下是根据宝宝当前年龄提供的专业护理建议</p>
        </div>
    `;
    
    careGuide.sections.forEach(section => {
        html += `
            <div class="guide-section" id="${section.id}">
                <h3><i class="fas fa-${getSectionIcon(section.id)}"></i> ${section.title}</h3>
                <ul class="care-list">
                    ${section.content.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    
    contentElement.innerHTML = html;
}

// 获取章节图标
function getSectionIcon(sectionId) {
    const icons = {
        'feeding': 'utensils',
        'sleep': 'bed',
        'health': 'heart',
        'development': 'brain'
    };
    return icons[sectionId] || 'info-circle';
}

// 滚动到指定章节
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 默认显示新生儿内容
    renderCareContent(0);
    
    // 添加输入验证
    const monthsInput = document.getElementById('months');
    const daysInput = document.getElementById('days');
    
    monthsInput.addEventListener('input', function() {
        if (this.value > 36) this.value = 36;
        if (this.value < 0) this.value = 0;
    });
    
    daysInput.addEventListener('input', function() {
        if (this.value > 30) this.value = 30;
        if (this.value < 0) this.value = 0;
    });
});