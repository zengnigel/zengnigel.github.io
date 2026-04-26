document.addEventListener('DOMContentLoaded', function() {
  
  // ===============================
  // Dark Mode Toggle
  // ===============================
  (function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    toggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      if (newTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      }
    });
  })();
  
  
  // ===============================
  // Scroll Animation (IntersectionObserver)
  // ===============================
  (function initScrollAnimation() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(function(el) {
      observer.observe(el);
    });
  })();
  
  
  // ===============================
  // Blog list — load from posts/index.json
  // ===============================
  (function initBlogList() {
    const list = document.getElementById('blog-list');
    if (!list) return;

    // Determine path prefix (posts are one level deeper)
    const isPost = window.location.pathname.includes('/posts/');
    const prefix = isPost ? '../' : '';

    fetch(prefix + 'posts/index.json')
      .then(function(r) { return r.json(); })
      .then(function(posts) {
        if (!posts.length) {
          list.innerHTML = '<p style="color: var(--text-secondary);">Coming soon...</p>';
          return;
        }
        list.innerHTML = posts.map(function(p) {
          return '<a href="' + prefix + p.url + '" class="note-item">'
            + '<span class="note-date">' + p.date + '</span>'
            + '<span class="note-title">' + p.title + '</span>'
            + '</a>';
        }).join('');
      })
      .catch(function() {
        list.innerHTML = '<p style="color: var(--text-secondary);">Coming soon...</p>';
      });
  })();


  // ===============================
  // Active nav link based on current page
  // ===============================
  (function initNavLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  })();
  
});