document.addEventListener('DOMContentLoaded', function() {
  // Global variables
  const header = document.querySelector('header');
  const logo = document.querySelector('.logo');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  let isScrolled = false;
  let isMenuOpen = false;

  // Page loader
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', function() {
      loader.classList.add('hidden');
    });
  }

  // Update header state on scroll
  function updateHeaderState() {
    if (window.scrollY > 50) {
      if (!isScrolled) {
        header.classList.add('scrolled');
        logo.classList.add('scrolled');
        isScrolled = true;
      }
    } else {
      if (isScrolled) {
        header.classList.remove('scrolled');
        logo.classList.remove('scrolled');
        isScrolled = false;
      }
    }
  }

  // Check header state on page load
  updateHeaderState();

  // Optimize scroll event with requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (isMenuOpen) return;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateHeaderState();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Page navigation function
  function navigateToPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active', 'fade-in');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      // Add fade-in effect after a short delay
      setTimeout(() => {
        targetPage.classList.add('fade-in');
      }, 10);
      
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Update header state
      setTimeout(updateHeaderState, 20);

      // Update active nav link
      updateActiveNavLink(pageId);
    }
  }
  
  // Update active nav link
  function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      }
    });
  }
  
  // Add click event listeners to all nav links
  const allLinks = document.querySelectorAll('[data-page]');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      
      // Handle mobile menu case
      if (window.innerWidth <= 991 && mobileMenuPanel && mobileMenuPanel.classList.contains('active')) {
        // Close menu
        toggleMobileMenu();
        // Wait for menu animation, then navigate
        setTimeout(() => {
          navigateToPage(pageId);
        }, 400);
      } else {
        // Desktop or menu closed: navigate immediately
        navigateToPage(pageId);
      }
    });
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    let scrollPosition = 0;
    
    function toggleMobileMenu(e) {
      if (e) e.preventDefault();
      
      if (!mobileMenuPanel.classList.contains('active')) {
        // Open menu
        scrollPosition = window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        mobileMenuPanel.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        isMenuOpen = true;
      } else {
        // Close menu
        mobileMenuPanel.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        isMenuOpen = false;
        window.scrollTo(0, scrollPosition);
      }
    }
    
    // Mobile menu event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMobileMenu);
  }
  
  // Phone number validation
  const phoneInput = document.querySelector('input[name="phone"]');
  if (phoneInput) {
    // Only allow numbers
    phoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
    
    // Handle paste events
    phoneInput.addEventListener('paste', function(e) {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData('text');
      this.value = pastedText.replace(/\D/g, '').slice(0, 10);
    });
  }
  
  // URL parameter page routing
  function checkUrlForPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page) {
      navigateToPage(page);
    }
  }
  
  // Check URL parameters on page load
  checkUrlForPage();
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', checkUrlForPage);
  
  // Project filtering functionality
  const projectFilters = document.querySelectorAll('[data-filter]');
  if (projectFilters.length > 0) {
    projectFilters.forEach(filter => {
      filter.addEventListener('click', function(e) {
        e.preventDefault();
        
        const category = this.getAttribute('data-filter');
        const projectItems = document.querySelectorAll('.project-item');
        
        // Update active filter
        projectFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
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
});