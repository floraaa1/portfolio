(function () {
    'use strict';
    console.log("Hello");

    document.addEventListener('DOMContentLoaded', () => {
    
        // ==========================================
        // 1. 魔法星尘拖尾特效 (Magic Stardust)
        // ==========================================
        document.addEventListener('mousemove', function(e) {
            // 限制生成频率，避免太卡 (每移动几次才生成一个)
            if (Math.random() < 0.1) { 
                createStar(e.pageX, e.pageY);
            }
        });
    
        function createStar(x, y) {
            const star = document.createElement('div');
            star.classList.add('magic-star');
            
            // 随机颜色：在金色、青色、粉色之间切换
            const colors = ['#ffd700', '#4cc9f0', '#f72585', '#ffffff'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机大小
            const size = Math.random() * 8 + 4 + 'px'; // 4px 到 12px 之间
            
            star.style.left = x + 'px';
            star.style.top = y + 'px';
            star.style.backgroundColor = randomColor;
            star.style.width = size;
            star.style.height = size;
            
            // 如果是特殊形状（比如用clip-path做星星），这里可以扩展
            // 简单的圆形光点已经很有魔法感了
            
            document.body.appendChild(star);
    
            // 动画结束后从 DOM 中移除，防止网页变卡
            setTimeout(() => {
                star.remove();
            }, 1000); // 这里的 1000ms 要和 CSS 里的 animation duration 对应
        }
    
        // ==========================================
        // 2. 打字机效果 (Typewriter Effect)
        // ==========================================
        const heroTitle = document.querySelector('#hero h1');
        const originalText = "Hi, I'm Shutong!"; // 想要打出的字
        
        // 清空原有文字，准备开始打字
        heroTitle.textContent = '';
        heroTitle.classList.add('typing-cursor'); // 添加光标
    
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); // 打字速度，越小越快
            } else {
                // 打字结束，移除光标闪烁（可选）
                 heroTitle.classList.remove('typing-cursor');
            }
        }
    
        // 延迟 500ms 后开始打字
        setTimeout(typeWriter, 500);
    
    
        // ==========================================
        // 3. 滚动显现咒语 (Scroll Reveal)
        // ==========================================
        // 选取所有主要的区块和卡片
        const revealElements = document.querySelectorAll('.content-section, .project-grid-wrapper, .info-card, .bio-card');
    
        // 先给它们加上初始的 hidden class
        revealElements.forEach(el => el.classList.add('reveal-section'));
    
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 当元素进入视口，添加 active class
                    entry.target.classList.add('active');
                    // 动画只播放一次，所以停止观察
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15, // 元素出现 15% 时触发
            rootMargin: "0px 0px -50px 0px" // 稍微提前一点触发
        });
    
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    
        // ==========================================
        // 4. Logo 互动彩蛋 (点击月亮旋转)
        // ==========================================
        const magicSymbol = document.querySelector('.magic-symbol');
        if(magicSymbol) {
            magicSymbol.addEventListener('click', () => {
                magicSymbol.style.transition = 'transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                magicSymbol.style.transform = 'rotate(360deg) scale(1.5)';
                
                // 旋转完复位
                setTimeout(() => {
                     magicSymbol.style.transform = 'rotate(0deg) scale(1)';
                }, 1000);
            });
        }
    
    });
})();