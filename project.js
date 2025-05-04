document.addEventListener('DOMContentLoaded', function() {
  // URL'den proje ID'sini al
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  if (projectId) {
    // Proje verilerini projeye göre yükle
    loadProjectData(projectId);
  } else {
    // ID yoksa ana sayfaya yönlendir
    window.location.href = 'index.html?page=projects';
  }
  
  // Mobil menü toggle fonksiyonu
  // const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  // if (mobileMenuBtn) {
  //   mobileMenuBtn.addEventListener('click', function() {
  //     const navMenu = document.querySelector('.nav-menu');
  //     navMenu.classList.toggle('active');
  //   });
  // }
  
  // Galeri fonksiyonları
  initializeGallery();
  
  function initializeGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    const images = galleryContainer.querySelectorAll('.gallery-image');
    const prevBtn = galleryContainer.querySelector('.prev-btn');
    const nextBtn = galleryContainer.querySelector('.next-btn');
    const counter = galleryContainer.querySelector('.gallery-counter');
    const thumbnails = document.querySelectorAll('.gallery-item');
    
    let currentIndex = 0;
    const totalImages = images.length;
    
    // İlk resim dışındaki tüm resimleri gizle
    images.forEach((img, index) => {
      if (index !== 0) {
        img.style.display = 'none';
      }
    });
    
    // Sayacı güncelle
    updateCounter();
    
    // Önceki resme geçiş fonksiyonu
    prevBtn.addEventListener('click', function() {
      showImage(currentIndex - 1);
    });
    
    // Sonraki resme geçiş fonksiyonu
    nextBtn.addEventListener('click', function() {
      showImage(currentIndex + 1);
    });
    
    // Küçük resimlere tıklama
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        showImage(index);
      });
    });
    
    // Resmi gösterme fonksiyonu
    function showImage(index) {
      // Mevcut resmi gizle
      images[currentIndex].style.display = 'none';
      thumbnails[currentIndex].classList.remove('active');
      
      // Yeni indeksi hesapla (döngüsel)
      currentIndex = (index + totalImages) % totalImages;
      
      // Yeni resmi göster
      images[currentIndex].style.display = 'block';
      thumbnails[currentIndex].classList.add('active');
      
      // Sayacı güncelle
      updateCounter();
    }
    
    // Sayaç güncelleme fonksiyonu
    function updateCounter() {
      counter.textContent = `${currentIndex + 1} / ${totalImages}`;
    }
    
    // Klavye navigasyonu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showImage(currentIndex + 1);
      }
    });
  }
});

// Proje verilerini yükleme fonksiyonu
function loadProjectData(projectId) {
  // Gerçek bir uygulamada bu veriler API'dan veya bir veritabanından gelebilir
  // Şu an için statik veriler kullanacağız
  const projectsData = {
    'sogut-vadi-konutlari': {
      title: 'Söğüt Vadi Konutları',
      category: 'Konut',
      description: 'Söğüt Vadi Konutları, İstanbul\'un en prestijli bölgelerinden birinde yer alan lüks konut projesidir. Modern mimarisi, geniş yaşam alanları ve sosyal olanaklarıyla öne çıkan projemiz, konforlu bir yaşam sunuyor. Her dairede yüksek kaliteli malzemeler kullanılmış olup, akıllı ev sistemleriyle donatılmıştır. Peyzaj düzenlemesi, yürüyüş parkurları, çocuk oyun alanları ve spor tesisleriyle tam bir yaşam kompleksi olarak tasarlanmıştır.',
      location: 'İstanbul, Beşiktaş',
      area: '25.000 m²',
      completion: 'Haziran 2024',
      status: 'Tamamlandı',
      features: [
        { icon: 'fa-building', title: '4 Blok', description: 'Toplamda 120 daire' },
        { icon: 'fa-swimming-pool', title: 'Yüzme Havuzu', description: 'Açık ve kapalı havuz' },
        { icon: 'fa-leaf', title: 'Yeşil Alan', description: '5.000 m² peyzaj alanı' },
        { icon: 'fa-dumbbell', title: 'Spor Merkezi', description: 'Tam donanımlı fitness salonu' }
      ]
    },
    'sogut-plaza': {
      title: 'Söğüt Plaza',
      category: 'Ticari',
      description: 'Söğüt Plaza, şehrin merkezi iş bölgesinde konumlanmış, A+ sınıfı bir ofis projesidir. Çağdaş mimarisi ve enerji verimli tasarımıyla öne çıkan Söğüt Plaza, işletmelere prestijli bir çalışma ortamı sunmaktadır. Geniş açık ofis katları, toplantı salonları, konferans merkezi ve teknolojik altyapısı ile modern iş dünyasının tüm ihtiyaçlarını karşılayacak şekilde tasarlanmıştır.',
      location: 'İstanbul, Levent',
      area: '18.000 m²',
      completion: 'Mart 2023',
      status: 'Tamamlandı',
      features: [
        { icon: 'fa-briefcase', title: 'Ofis Alanları', description: '50-500 m² arasında değişen ölçüler' },
        { icon: 'fa-car', title: 'Kapalı Otopark', description: '200 araç kapasiteli' },
        { icon: 'fa-coffee', title: 'Kafeterya', description: 'Giriş katında hizmet alanı' },
        { icon: 'fa-shield-alt', title: '7/24 Güvenlik', description: 'Gelişmiş güvenlik sistemleri' }
      ]
    },
    'sogut-endustriyel': {
      title: 'Söğüt Endüstriyel Proje',
      category: 'Endüstriyel',
      description: 'Söğüt Endüstriyel Projesi, modern üretim tesisleri için tasarlanmış geniş ölçekli bir endüstriyel komplekstir. Lojistik ve üretim süreçlerini en verimli şekilde yönetebilmek için optimize edilmiş alan düzenlemesi, yüksek tavanlı depolar ve özel yükleme alanları bulunmaktadır. Enerji tasarruflu aydınlatma sistemleri ve yenilenebilir enerji kaynakları ile çevre dostu bir yaklaşım benimsenmiştir.',
      location: 'Kocaeli, Gebze',
      area: '50.000 m²',
      completion: 'Ekim 2023',
      status: 'Tamamlandı',
      features: [
        { icon: 'fa-industry', title: 'Üretim Alanları', description: 'Modüler bölünebilir alanlar' },
        { icon: 'fa-warehouse', title: 'Depolama', description: '12 metre tavan yüksekliği' },
        { icon: 'fa-truck', title: 'Lojistik', description: '20 adet yükleme rampası' },
        { icon: 'fa-solar-panel', title: 'Güneş Enerjisi', description: 'Çatı güneş panelleri' }
      ]
    }
  };
  
  // İlgili proje verisini al
  const projectData = projectsData[projectId];
  
  if (projectData) {
    // Sayfa başlığını güncelle
    document.title = `${projectData.title} - Söğüt İnşaat`;
    
    // Proje detaylarını doldur
    document.getElementById('project-title').textContent = projectData.title;
    document.getElementById('project-description').textContent = projectData.description;
    document.getElementById('project-location').textContent = projectData.location;
    document.getElementById('project-area').textContent = projectData.area;
    document.getElementById('project-completion').textContent = projectData.completion;
    document.getElementById('project-status').textContent = projectData.status;
    
    // Proje banner arkaplanını güncelle
    const projectBanner = document.querySelector('.project-banner');
    if (projectBanner) {
      projectBanner.style.background = `linear-gradient(rgba(6, 30, 71, 0.85), rgba(6, 30, 71, 0.85)), url('projeler/${projectId}/main-image.jpg') center/cover no-repeat`;
    }
    
    // Proje görsellerini güncelle
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length > 0) {
      galleryImages[0].src = `projeler/${projectId}/main-image.jpg`;
      galleryImages[0].alt = `${projectData.title} - Ana Görsel`;
    }
    
    // Galeri görsellerini güncelle
    const thumbnailImages = document.querySelectorAll('.gallery-item img');
    const imageNames = ['main-image.jpg', 'image-one.jpg', 'image-two.jpg', 'image-three.jpg', 'image-four.jpg'];
    
    thumbnailImages.forEach((img, index) => {
      if (index < imageNames.length) {
        img.src = `projeler/${projectId}/${imageNames[index]}`;
        img.alt = `${projectData.title} - Görsel ${index + 1}`;
      }
    });
    
    // Büyük galeri görsellerini güncelle
    const galleryMainImages = document.querySelectorAll('.gallery-container .gallery-image');
    galleryMainImages.forEach((img, index) => {
      if (index < imageNames.length) {
        img.src = `projeler/${projectId}/${imageNames[index]}`;
        img.alt = `${projectData.title} - Görsel ${index + 1}`;
      }
    });
    
    // Proje özelliklerini doldur
    const featuresContainer = document.getElementById('project-features');
    featuresContainer.innerHTML = ''; // Mevcut içeriği temizle
    
    projectData.features.forEach(feature => {
      const featureItem = document.createElement('div');
      featureItem.className = 'feature-item';
      featureItem.innerHTML = `
        <div class="feature-icon"><i class="fas ${feature.icon}"></i></div>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      `;
      featuresContainer.appendChild(featureItem);
    });
  } else {
    // Proje bulunamazsa ana sayfaya yönlendir
    alert('Proje bulunamadı!');
    window.location.href = 'index.html?page=projects';
  }
}

// Lightbox Fonksiyonları
let currentImageIndex = 0;
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCounter = document.querySelector('.lightbox-counter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryContainer = document.querySelector('.gallery-container');
const galleryImages = document.querySelectorAll('.gallery-image');
const galleryItems = document.querySelectorAll('.gallery-item');

// Sadece görüntülenen ana resme tıklama olayı ekle
if (galleryContainer) {
  const displayedImages = document.querySelectorAll('.gallery-image');
  displayedImages.forEach((image, index) => {
    // Ana görsellere zoom-cursor sınıfı ekle
    image.classList.add('zoom-cursor');
    
    image.addEventListener('click', function(e) {
      e.stopPropagation(); // Tıklama olayının üst öğelere yayılmasını engelle
      openLightbox(index);
    });
  });
}

// Küçük resimlere tıklama olayını kaldır
// galleryItems.forEach((item, index) => {
//   item.addEventListener('click', function() {
//     openLightbox(index);
//   });
// });

// Lightbox'ı açma fonksiyonu
function openLightbox(index) {
  currentImageIndex = index;
  const imageSrc = galleryImages[index].src;
  lightboxImage.src = imageSrc;
  lightboxImage.alt = galleryImages[index].alt;
  updateCounter();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Sayfanın kaydırılmasını engelle
}

// Lightbox'ı kapatma fonksiyonu
lightboxClose.addEventListener('click', function() {
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Sayfanın kaydırılmasını tekrar etkinleştir
  
  // Lightbox'ta en son görüntülenen fotoğrafı ana galeride de göster
  showImage(currentImageIndex);
});

// Önceki resme geçiş
lightboxPrev.addEventListener('click', function(e) {
  e.stopPropagation(); // Tıklama olayının üst öğelere yayılmasını engelle
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex].src;
  lightboxImage.alt = galleryImages[currentImageIndex].alt;
  updateCounter();
});

// Sonraki resme geçiş
lightboxNext.addEventListener('click', function(e) {
  e.stopPropagation(); // Tıklama olayının üst öğelere yayılmasını engelle
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex].src;
  lightboxImage.alt = galleryImages[currentImageIndex].alt;
  updateCounter();
});

// Sayaç güncelleme
function updateCounter() {
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// ESC tuşu ile kapatma
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Sol ok tuşu ile önceki resim
  if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;
    updateCounter();
  }
  
  // Sağ ok tuşu ile sonraki resim
  if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;
    updateCounter();
  }
});

// Lightbox dışına tıklama ile kapatma
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});
