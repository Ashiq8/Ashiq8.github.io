/**
 * Syed Ashique Y - Portfolio Website Scripts
 * Clean, lightweight vanilla JavaScript for interactive features
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dynamic Current Year
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle & Accessibility
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileNav = (forceClose = false) => {
    if (!mobileToggle || !mobileMenu) return;
    
    const isOpen = forceClose ? true : mobileToggle.classList.contains('is-active');
    if (isOpen) {
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      mobileToggle.classList.add('is-active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileNav());
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(true));
  });

  // Close mobile drawer if viewport is resized to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileToggle?.classList.contains('is-active')) {
      toggleMobileNav(true);
    }
  });

  // --------------------------------------------------------------------------
  // 3. Navbar Scroll Elevation & Back to Top Visibility
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleWindowScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  };

  window.addEventListener('scroll', handleWindowScroll, { passive: true });
  handleWindowScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Robust Active Section Navigation Highlighting (Desktop & Mobile)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const drawerNavLinks = document.querySelectorAll('.mobile-link');

  const setActiveNav = (targetId) => {
    desktopNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    drawerNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if user has reached bottom of page (highlight Contact)
    if (scrollY + windowHeight >= documentHeight - 60) {
      setActiveNav('contact');
      return;
    }

    // Check if at the very top of page (highlight Home)
    if (scrollY < 180) {
      setActiveNav('home');
      return;
    }

    // Evaluate viewport intersection for sections
    let currentSectionId = 'home';
    const offsetThreshold = 180; // Accounts for header height + visual focus

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionId = section.getAttribute('id');

      if (sectionTop <= offsetThreshold && rect.bottom >= offsetThreshold) {
        currentSectionId = sectionId;
      }
    });

    setActiveNav(currentSectionId);
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll();

  // --------------------------------------------------------------------------
  // 5. Expandable Detailed Project Case Studies
  // --------------------------------------------------------------------------
  const toggleDetailButtons = document.querySelectorAll('.toggle-details-btn');

  toggleDetailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const caseStudyPanel = document.getElementById(targetId);
      if (!caseStudyPanel) return;

      const isExpanded = caseStudyPanel.classList.contains('is-expanded');
      const textSpan = btn.querySelector('span');

      if (isExpanded) {
        caseStudyPanel.classList.remove('is-expanded');
        btn.setAttribute('aria-expanded', 'false');
        if (textSpan) textSpan.textContent = 'View Full Case Study';
      } else {
        caseStudyPanel.classList.add('is-expanded');
        btn.setAttribute('aria-expanded', 'true');
        if (textSpan) textSpan.textContent = 'Collapse Case Study';
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. Toast Notification Utility
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast-notification');
  let toastTimeout = null;

  const showToast = (message, duration = 3000) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-shown');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-shown');
    }, duration);
  };

  // --------------------------------------------------------------------------
  // 7. Copy Email to Clipboard
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailDisplay = document.getElementById('email-address');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyEmailBtn && emailDisplay) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailDisplay.textContent.trim();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for environments where Clipboard API is restricted
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        copyEmailBtn.style.borderColor = 'var(--accent-cyan)';
        showToast('Email address copied to clipboard!');

        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copy Email';
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        showToast(`Email address: ${email}`);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Functional Contact Form (Formspree with Instant Mailto Fallback)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitBtnIcon = document.getElementById('submit-btn-icon');

  if (contactForm) {
    const nameInput = document.getElementById('sender-name');
    const emailInput = document.getElementById('sender-email');
    const subjectInput = document.getElementById('sender-subject');
    const messageInput = document.getElementById('sender-message');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const setFieldError = (inputElement, hasError) => {
      const parentGroup = inputElement.closest('.form-group');
      if (!parentGroup) return;
      if (hasError) {
        parentGroup.classList.add('has-error');
      } else {
        parentGroup.classList.remove('has-error');
      }
    };

    [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
      if (field) {
        field.addEventListener('input', () => {
          setFieldError(field, false);
          if (formStatus) formStatus.style.display = 'none';
        });
      }
    });

    const triggerMailtoFallback = (recipient, name, email, subject, message) => {
      const encodedSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`);
      const encodedBody = encodeURIComponent(
        `Hi Syed,\n\n${message}\n\n---\nSender Name: ${name}\nSender Email: ${email}`
      );
      const mailtoUri = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
      
      window.location.href = mailtoUri;

      if (formStatus) {
        formStatus.textContent = 'Launching your default email client to send this message. Thank you for reaching out!';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
      }
      showToast('Opening your email client...');
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      // Validate name
      if (!nameVal) {
        setFieldError(nameInput, true);
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // Validate email
      if (!emailVal || !validateEmail(emailVal)) {
        setFieldError(emailInput, true);
        isValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // Validate subject
      if (!subjectVal) {
        setFieldError(subjectInput, true);
        isValid = false;
      } else {
        setFieldError(subjectInput, false);
      }

      // Validate message
      if (!messageVal) {
        setFieldError(messageInput, true);
        isValid = false;
      } else {
        setFieldError(messageInput, false);
      }

      if (!isValid) return;

      const recipient = emailDisplay ? emailDisplay.textContent.trim() : 'syedaash740@gmail.com';
      const formAction = contactForm.getAttribute('action') || '';

      // Check if Formspree is still unconfigured (contains placeholder 'YOUR_FORMSPREE_ID')
      if (formAction.includes('YOUR_FORMSPREE_ID')) {
        triggerMailtoFallback(recipient, nameVal, emailVal, subjectVal, messageVal);
        return;
      }

      // If Formspree endpoint is configured, send via AJAX
      if (submitBtn) submitBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = 'Sending...';
      if (submitBtnIcon) submitBtnIcon.classList.add('spin-anim');

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(formAction, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.textContent = 'Message sent successfully! Thank you for reaching out, Syed will get back to you shortly.';
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
          }
          contactForm.reset();
          showToast('Message sent successfully!');
        } else {
          // If Formspree returns an error, fallback gracefully to mailto
          triggerMailtoFallback(recipient, nameVal, emailVal, subjectVal, messageVal);
        }
      } catch (err) {
        // Fallback to mailto if network error occurs
        triggerMailtoFallback(recipient, nameVal, emailVal, subjectVal, messageVal);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = 'Send Message';
        if (submitBtnIcon) submitBtnIcon.classList.remove('spin-anim');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. Project Demo Placeholder Notice Modal
  // --------------------------------------------------------------------------
  const demoModal = document.getElementById('demo-modal');
  const demoButtons = document.querySelectorAll('.demo-placeholder-btn');
  const modalClose = document.getElementById('modal-close');
  const modalOkBtn = document.getElementById('modal-ok-btn');
  const modalProjectName = document.getElementById('modal-project-name');

  const projectTitleMap = {
    'wildfire': 'Explainable Wildfire Segmentation (PEP Project)',
    'brain-tumor': 'Brain Tumor Detection using MRI',
    'speakql': 'SpeakQL Speech-to-SQL System',
    'mcp-browser': 'MCP Browser Debug Server'
  };

  const openDemoModal = (projectId) => {
    if (!demoModal) return;
    const title = projectTitleMap[projectId] || 'Project Demonstration';
    if (modalProjectName) modalProjectName.textContent = title;
    demoModal.classList.add('is-open');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDemoModal = () => {
    if (!demoModal) return;
    demoModal.classList.remove('is-open');
    demoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const demoKey = btn.getAttribute('data-demo');
      openDemoModal(demoKey);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeDemoModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeDemoModal);

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        closeDemoModal();
      }
    });
  }

  // Keyboard accessibility handler for Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (demoModal && demoModal.classList.contains('is-open')) {
        closeDemoModal();
      }
      if (mobileToggle && mobileToggle.classList.contains('is-active')) {
        toggleMobileNav(true);
      }
    }
  });

});
