// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // AOS Animasyon Kütüphanesi Başlatma
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // İlk testimonial'ı etkinleştir
    currentTestimonial(0);

    // Form gönderimini işle
    const form = document.getElementById('tourRequestForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Sayfa scroll olduğunda header stilini değiştir
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Özel mouse cursor
    initCustomCursor();
});

// Mobile Menu İşlevleri
function showMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.add('show');
}

function hideMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('show');
}

// Galeri Modal İşlevleri
let slideIndex = 1;

function openModal() {
    document.getElementById('galleryModal').style.display = 'block';
    showSlides(slideIndex);
}

function closeModal() {
    document.getElementById('galleryModal').style.display = 'none';
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    
    slides[slideIndex - 1].style.display = 'block';
}

// Testimonial Slider İşlevleri
let testimonialIndex = 0;

function currentTestimonial(n) {
    showTestimonials(testimonialIndex = n);
}

function showTestimonials(n) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    // Tüm testimonial ve noktaların aktif sınıfını kaldır
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Seçilen testimonial ve noktayı aktif yap
    testimonials[n].classList.add('active');
    dots[n].classList.add('active');
}

// Özel Cursor İşlevi
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Hareket eventleri
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower cursor için smooth hareket
        setTimeout(function() {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Link ve butonlar için hover efekti
    const links = document.querySelectorAll('a, button, .gallery-item, .tour-card');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'var(--secondary-color)';
        });
    });
}

// Form Gönderimi İşlevi
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Form elementlerini al
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const tourType = form.tourType.value;
    const tourDate = form.tourDate.value;
    const groupSize = form.groupSize.value;
    const message = form.message.value;
    
    // Basit doğrulama
    if (!name || !email || !tourType || !tourDate || !groupSize) {
        alert('Lütfen gerekli alanları doldurun.');
        return;
    }
    
    // Normalde burası bir API'ye istek gönderir
    // Şimdilik başarılı bir gönderim simüle ediyoruz
    
    // Form elementlerini temizle
    form.reset();
    
    // Başarı mesajı göster
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Talebiniz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz!</p>
    `;
    
    // Mesajı ekle ve 5 saniye sonra kaldır
    form.parentNode.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Mobil menüyü kapat
            hideMenu();
            
            // Bölüme kaydır
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // URL'yi güncelle
            history.pushState(null, null, targetId);
        }
    });
});

// Sayfa yüklendiğinde URL hash kontrolü
window.addEventListener('load', function() {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Sayfanın yüklenmesi için kısa bir gecikme
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
}); 