// ... existing code ...
// Kartlara hem hover hem de touch/click ile animasyon ekle
document.querySelectorAll('.card').forEach(function(card) {
    // Hover için (masaüstü)
    card.addEventListener('mouseenter', function() {
        card.classList.add('animate');
    });
    card.addEventListener('mouseleave', function() {
        card.classList.remove('animate');
    });

    // Mobil için (dokunma)
    card.addEventListener('touchstart', function() {
        card.classList.add('animate');
    });
    card.addEventListener('touchend', function() {
        card.classList.remove('animate');
    });

    // Alternatif olarak tıklama ile de animasyon tetiklenebilir
    card.addEventListener('click', function() {
        card.classList.add('animate');
        setTimeout(function() {
            card.classList.remove('animate');
        }, 500); // animasyon süresine göre ayarla
    });
});
// ... existing code ...