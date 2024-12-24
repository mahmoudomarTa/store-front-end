const horizontalScroll = document.querySelector('.horizontal-scroll');
let isDown = false;
let startX;
let scrollLeft;

if(horizontalScroll){
    horizontalScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        horizontalScroll.classList.add('active');
        startX = e.pageX - horizontalScroll.offsetLeft;
        scrollLeft = horizontalScroll.scrollLeft;
    });

    horizontalScroll.addEventListener('mouseleave', () => {
        isDown = false;
        horizontalScroll.classList.remove('active');
    });

    horizontalScroll.addEventListener('mouseup', () => {
        isDown = false;
        horizontalScroll.classList.remove('active');
    });

    horizontalScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - horizontalScroll.offsetLeft;
        const walk = (x - startX) * 3;
        horizontalScroll.scrollLeft = scrollLeft - walk;
    });

}
const productsContainer = document.getElementById('productsContainer');
const categoriesScroll = document.getElementById('categoriesWrapper');

    let lastScrollTop = 0;

if(categoriesScroll){
    const originalCategoriesContent = categoriesScroll.innerHTML;
    const originalParentHeight = categoriesScroll.parentElement.offsetHeight;
    categoriesScroll.style.transition = 'opacity 0.3s, transform 0.3s';
    categoriesScroll.parentElement.style.transition = 'height 0.3s';
    if(productsContainer){
        productsContainer.addEventListener('scroll', () => {
            const currentScrollTop = productsContainer.scrollTop;
            
            if (currentScrollTop > lastScrollTop) {
                categoriesScroll.style.opacity = '0';
                categoriesScroll.style.transform = 'translateY(-100%)';
                categoriesScroll.parentElement.style.height = '0';
                setTimeout(() => {
                    if (currentScrollTop > lastScrollTop) {
                        categoriesScroll.innerHTML = null;
                    }
                }, 300);
            } else {
                categoriesScroll.innerHTML = originalCategoriesContent;
                categoriesScroll.parentElement.style.height = originalParentHeight + 'px';
                setTimeout(() => {
                    categoriesScroll.style.opacity = '1';
                    categoriesScroll.style.transform = 'translateY(0)';
                }, 50);
            }
            
            lastScrollTop = currentScrollTop;
        });
    }
}


const lightBtn = document.getElementById('lightBtn');
const darkBtn = document.getElementById('darkBtn');
// Initially hide/show buttons based on saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    darkBtn.style.display = 'none';
    lightBtn.style.display = 'block';
} else {
    lightBtn.style.display = 'none';
    darkBtn.style.display = 'block';
}
const darkStylesheet = document.createElement('link');
darkStylesheet.rel = 'stylesheet';
darkStylesheet.href = 'css/dark.css';

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
        document.head.appendChild(darkStylesheet);
    } else {
        if (document.head.contains(darkStylesheet)) {
            document.head.removeChild(darkStylesheet);
        }
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}


if (lightBtn) {
    lightBtn.addEventListener('click', () => {
        setTheme('light');
        lightBtn.style.display = 'none';
        darkBtn.style.display = 'block';
    });
}

if(darkBtn){
    darkBtn.addEventListener('click', () => {
        setTheme('dark');
        darkBtn.style.display = 'none';
        lightBtn.style.display = 'block';
    });
}

loadTheme();