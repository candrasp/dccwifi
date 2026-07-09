import './style.css';
import { 
  createIcons, 
  Wifi, 
  Shield, 
  Zap, 
  Phone, 
  MapPin, 
  Check, 
  ArrowRight, 
  Menu, 
  X, 
  Users, 
  Award, 
  Clock, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  HelpCircle,
  Activity,
  Layers,
  Home as HomeIcon,
  Briefcase,
  Monitor,
  Infinity,
  Coffee
} from 'lucide';

// Initialize Lucide Icons
createIcons({
  icons: {
    Wifi,
    Shield,
    Zap,
    Phone,
    MapPin,
    Check,
    ArrowRight,
    Menu,
    X,
    Users,
    Award,
    Clock,
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
    Star,
    HelpCircle,
    Activity,
    Layers,
    HomeIcon,
    Briefcase,
    Monitor,
    Infinity,
    Coffee
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // ── SVG Animation Performance Optimization ──
  // Pure CSS animation is hardware-accelerated, so we don't need runtime DOM manipulation.

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        // Add dynamic opening animations
        setTimeout(() => mobileMenu.classList.add('opacity-100', 'translate-y-0'), 10);
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('opacity-0', 'translate-y-[-10px]');
        setTimeout(() => mobileMenu.classList.add('hidden'), 200);
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
    });

    // Close menu when clicking link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('opacity-0', 'translate-y-[-10px]');
        setTimeout(() => mobileMenu.classList.add('hidden'), 200);
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  // ── Header Scroll State: Use IntersectionObserver on a sentinel element ──
  // REASON: Reading window.scrollY inside a scroll handler forces a synchronous
  // layout ("layout thrashing") which blocks the browser from painting the next
  // frame. IntersectionObserver fires off the main thread and avoids this.
  const header = document.getElementById('header');

  // Create an invisible sentinel div just below the fold of the header
  const scrollSentinel = document.createElement('div');
  scrollSentinel.style.cssText = 'position:absolute;top:60px;left:0;width:1px;height:1px;pointer-events:none;';
  scrollSentinel.setAttribute('aria-hidden', 'true');
  document.body.prepend(scrollSentinel);

  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      // When sentinel is NOT intersecting = user scrolled past 60px = show solid header
      if (entry.isIntersecting) {
        header.removeAttribute('data-scrolled');
      } else {
        header.setAttribute('data-scrolled', 'true');
      }
    },
    { threshold: 0, rootMargin: '0px' }
  );

  headerObserver.observe(scrollSentinel);

  // Scroll Spy (Active link indicator) using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the middle portion of the viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-brand-blue-600', 'font-semibold');
            link.classList.remove('text-slate-600');
          } else {
            link.classList.remove('text-brand-blue-600', 'font-semibold');
            link.classList.add('text-slate-600');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    button.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');
      
      // Close other FAQs
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherContent !== content) {
          otherContent.classList.add('hidden');
          otherIcon.style.transform = 'rotate(0deg)';
          otherItem.classList.remove('border-brand-blue-600', 'bg-brand-blue-50/30');
          otherItem.classList.add('border-slate-200');
        }
      });

      if (isOpen) {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
        item.classList.remove('border-brand-blue-600', 'bg-brand-blue-50/30');
        item.classList.add('border-slate-200');
      } else {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        item.classList.add('border-brand-blue-600', 'bg-brand-blue-50/30');
        item.classList.remove('border-slate-200');
      }
    });
  });

  // Gallery Lightbox Modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');

  if (galleryItems.length && modal && modalImg && modalTitle && modalClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const img = item.querySelector('img');
        const title = item.dataset.title;
        
        modalImg.src = img.src;
        modalTitle.textContent = title;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Disable page scrolling
      });
    });

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto'; // Enable page scrolling
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('#modal-close') || e.target === modal.querySelector('.relative')) {
        // Only close if clicking background or close button
        if (e.target === modal) {
          closeModal();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
