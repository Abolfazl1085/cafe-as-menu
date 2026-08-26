// =========================
// 1. نمایش تاریخ امروز
// =========================

document.addEventListener('DOMContentLoaded', function() {
    const dateSpan = document.getElementById('currentDate');
    if (dateSpan) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        dateSpan.textContent = now.toLocaleDateString('fa-IR', options);
    }
});

// =========================
// 2. دکمه تغییر تم (روز/شب)
// =========================

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    // بررسی تم ذخیره شده
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        // تغییر آیکون
        const isLight = document.body.classList.contains('light-mode');
        this.textContent = isLight ? '☀️' : '🌙';
        
        // ذخیره در localStorage
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// =========================
// 3. دکمه بازگشت به بالا
// =========================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =========================
// 4. فیلتر دسته‌بندی
// =========================

const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // حذف کلاس active از همه دکمه‌ها
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        menuItems.forEach(item => {
            if (filter === 'all') {
                item.classList.remove('hidden');
            } else if (item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// =========================
// 5. اسکرول به بخش‌ها با کلیک روی دکمه‌های فیلتر
// =========================

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        if (filter !== 'all') {
            const targetSection = document.getElementById(`${filter}-section`);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            }
        }
    });
});

// =========================
// 6. کلیک روی آیتم منو (نمایش جزئیات)
// =========================

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const name = this.dataset.name;
        const price = this.querySelector('.price')?.textContent?.trim() || 'نامشخص';
        const desc = this.querySelector('p')?.textContent || 'توضیحی موجود نیست';
        
        // نمایش در کنسول (می‌توانید به دلخواه تغییر دهید)
        console.log(`🍽 ${name} | 💰 ${price} | 📝 ${desc}`);
        
        // نمایش نوتیفیکیشن ساده
        showNotification(`🍽 ${name} - ${price}`, 'info');
    });
});

// =========================
// 7. سیستم نوتیفیکیشن
