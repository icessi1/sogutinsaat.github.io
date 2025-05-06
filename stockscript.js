document.addEventListener('DOMContentLoaded', function() {
  // Sayfa yükleme animasyonu
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', function() {
      loader.classList.add('hidden');
    });
  }
  
  // Header ve logo küçültme - scroll ile
  const header = document.querySelector('header');
  const logo = document.querySelector('.logo');
  
  // Titreme önleyici değişkenler
  let isScrolled = false;
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const currentScrollY = window.scrollY;
        
        // Eğer 50px'den fazla scroll yapıldıysa ve henüz scrolled sınıfı eklenmemişse
        if (currentScrollY > 50 && !isScrolled) {
          header.classList.add('scrolled');
          logo.classList.add('scrolled');
          isScrolled = true;
        } 
        // Eğer 20px'den az scroll yapıldıysa ve scrolled sınıfı ekliyse
        // Eşik değerini 30'dan 20'ye düşürdük
        else if (currentScrollY < 20 && isScrolled) {
          header.classList.remove('scrolled');
          logo.classList.remove('scrolled');
          isScrolled = false;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
  
  // Sayfa yönlendirme fonksiyonu
  function navigateToPage(pageId) {
    // Önce tüm sayfaları gizle
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active', 'fade-in');
    });
    
    // Seçilen sayfayı göster
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      // Kısa bir gecikme sonra fade-in efektini ekle
      setTimeout(() => {
        targetPage.classList.add('fade-in');
      }, 10);
      
      // Sayfanın en üstüne kaydır (smooth scrolling ile)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Nav menüsündeki aktif linki güncelle
      updateActiveNavLink(pageId);
    }
  }
  
  // Nav menüsündeki aktif linki güncelleme
  function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      }
    });
  }
  
  // Tüm nav linkleri için click event listener ekle
  const allLinks = document.querySelectorAll('[data-page]');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      navigateToPage(pageId);
      
      // Mobil menü açıksa kapat
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });
  
  // Mobil menü toggle fonksiyonu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      const navMenu = document.querySelector('.nav-menu');
      navMenu.classList.toggle('active');
    });
  }
  
  // İletişim formu gönderimi
  // Telefon numarası doğrulama
  document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('input[name="phone"]');
    
    if (phoneInput) {
      // Sadece sayı girişine izin ver
      phoneInput.addEventListener('input', function(e) {
        // Sayı olmayan tüm karakterleri kaldır
        this.value = this.value.replace(/\D/g, '');
        
        // 10 karakterden fazla girilmesini engelle
        if (this.value.length > 10) {
          this.value = this.value.slice(0, 10);
        }
      });
      
      // Kopyala-yapıştır işlemlerini kontrol et
      phoneInput.addEventListener('paste', function(e) {
        // Varsayılan yapıştırma işlemini engelle
        e.preventDefault();
        
        // Panodaki metni al
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        
        // Sadece sayıları filtrele
        const numericText = pastedText.replace(/\D/g, '').slice(0, 10);
        
        // Filtrelenmiş sayıları input alanına ekle
        this.value = numericText;
      });
      
      // Tuş basma olaylarını kontrol et
      phoneInput.addEventListener('keypress', function(e) {
        // Basılan tuş sayı değilse engelle
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      });
    }
  });
  
  // URL parametrelerine göre sayfa yönlendirme
  function checkUrlForPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page) {
      navigateToPage(page);
    }
  }
  
  // Sayfa yüklendiğinde URL parametrelerini kontrol et
  checkUrlForPage();
  
  // Browser geri/ileri butonları için event listener
  window.addEventListener('popstate', function() {
    checkUrlForPage();
  });
  
  // Özelleştirilmiş proje filtreleme (opsiyonel)
  const projectFilters = document.querySelectorAll('[data-filter]');
  if (projectFilters.length > 0) {
    projectFilters.forEach(filter => {
      filter.addEventListener('click', function(e) {
        e.preventDefault();
        
        const category = this.getAttribute('data-filter');
        const projectItems = document.querySelectorAll('.project-item');
        
        projectFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        projectItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Header scroll efekti
  let lastScrollTop = 0;
  const scrollThreshold = 5; // Eşik değeri
  
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Scroll yönünü ve eşik değerini kontrol et
    if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) {
      return; // Eşik değerinden küçük değişimleri yoksay
    }
    
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Mobil Menü Aç/Kapat
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  
  // Menü açma
  if (mobileMenuBtn && mobileMenuPanel && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuPanel.classList.add('active');
      mobileMenuOverlay.classList.add('active');
    });
  
    // Menü kapama (çarpı veya overlay tıklanınca)
    mobileMenuClose.addEventListener('click', function() {
      mobileMenuPanel.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
    });
    mobileMenuOverlay.addEventListener('click', function() {
      mobileMenuPanel.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
    });
  
    // Menüden bir seçeneğe tıklanınca menüyü kapat
    mobileMenuPanel.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenuPanel.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
      });
    });
  }
});
