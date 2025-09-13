// 计算宝宝年龄
function calculateBabyAge() {
    const birthDate = new Date('2024-03-12');
    const today = new Date();
    
    // 计算天数
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 计算月数
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += today.getMonth();
    months = months <= 0 ? 0 : months;
    
    document.getElementById('days-old').textContent = diffDays;
    document.getElementById('months-old').textContent = months;
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
    calculateBabyAge();
    
    // 每天更新年龄
    setInterval(calculateBabyAge, 24 * 60 * 60 * 1000);
});