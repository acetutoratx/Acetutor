// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle with better iOS support
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    // Toggle menu on button click
    const toggleMenu = () => {
      const isOpen = menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Prevent background scrolling when menu is open
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
    };
    
    // Add touch event for better mobile support
    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('touchend', (e) => {
      e.preventDefault();
      toggleMenu();
    });
    
    // Close menu when clicking on a nav link
    const closeMenu = () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeMenu);
      link.addEventListener('touchend', (e) => {
        e.preventDefault();
        closeMenu();
        // Navigate to the link's href
        window.location.href = link.href;
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }
  
  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('appear');
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Close mobile menu if open
        if (menuToggle && navLinks && menuToggle.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        // Smooth scroll to target
        window.scrollTo({ 
          top: target.offsetTop - 80, 
          behavior: 'smooth' 
        });
      }
    });
  });

  // Plan Toggle
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const planDescriptions = document.querySelectorAll('.plan-description');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleButtons.forEach(b => b.classList.remove('active'));
      planDescriptions.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const plan = btn.dataset.plan;
      document.querySelector(`.plan-description[data-plan="${plan}"]`).classList.add('active');
    });
  });

  if (toggleButtons.length > 0) toggleButtons[0].click();

  // Card hover animations
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 15px 40px rgba(42, 77, 122, 0.18)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 6px 25px rgba(42, 77, 122, 0.06)';
    });
  });
});