/**
 * PiraGo Security News - Interactive Features
 * - Theme Switcher (Dark / Light)
 * - Mobile Navigation Menu
 * - Dynamic Table Search / Filter
 */

(function() {
  'use strict';

  // --- 1. Theme Switcher ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  function getCurrentTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark' || current === 'light') return current;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('pirago_theme', theme);
    } catch (e) {}
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
      const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Lắng nghe thay đổi hệ thống nếu chưa chọn thủ công
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!localStorage.getItem('pirago_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --- 2. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const piragoNav = document.getElementById('piragoNav');

  if (mobileMenuBtn && piragoNav) {
    mobileMenuBtn.addEventListener('click', function() {
      const isOpen = piragoNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Đóng khi click ngoài menu
    document.addEventListener('click', function(e) {
      if (!piragoNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        piragoNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Đóng khi bấm Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && piragoNav.classList.contains('open')) {
        piragoNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 3. Table Search / Filter (Dành cho các trang Báo cáo) ---
  const filterInput = document.getElementById('tableFilterInput');
  if (filterInput) {
    filterInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      const tables = document.querySelectorAll('table tbody');

      tables.forEach(tbody => {
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
          if (!query) {
            row.style.display = '';
            return;
          }
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    });
  }

  // --- 4. Copy Share Link ---
  const copyShareBtns = document.querySelectorAll('.share-copy');
  copyShareBtns.forEach(function(copyShareBtn) {
    const labelEl = copyShareBtn.querySelector('.share-copy-text');
    const defaultLabel = labelEl ? labelEl.textContent : '';
    let copyTimer = null;

    copyShareBtn.addEventListener('click', function() {
      const url = copyShareBtn.getAttribute('data-copy-url') || window.location.href;
      const copiedLabel = copyShareBtn.getAttribute('data-copied-label') || defaultLabel;

      function markCopied() {
        if (labelEl) labelEl.textContent = copiedLabel;
        copyShareBtn.classList.add('is-copied');
        clearTimeout(copyTimer);
        copyTimer = setTimeout(function() {
          if (labelEl) labelEl.textContent = defaultLabel;
          copyShareBtn.classList.remove('is-copied');
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(markCopied).catch(function() {});
      } else {
        const input = document.createElement('textarea');
        input.value = url;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        try {
          if (document.execCommand('copy')) markCopied();
        } catch (e) {}
        document.body.removeChild(input);
      }
    });
  });
})();
