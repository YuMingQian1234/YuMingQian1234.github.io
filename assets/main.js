/* =========================================================
   林一 · 个人主页交互
   - 主题切换 / 移动端菜单 / 滚动进度 / 滚动显隐
   - 导航高亮 / 数字动画 / 打字角色轮播
   - 复制邮箱 / 作品卡片跟随鼠标的高光
   ========================================================= */

(() => {
  'use strict';

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) { /* 隐私模式下忽略 */ }
    }
  };

  /* ---------- 主题切换 ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeColorMeta = document.getElementById('themeColor');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (theme, persist = true) => {
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    }
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#0d0c11' : '#f6f2ea');
    }
    if (persist) store.set('theme', theme);
  };

  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  darkQuery.addEventListener?.('change', (event) => {
    if (!store.get('theme')) applyTheme(event.matches ? 'dark' : 'light', false);
  });

  /* ---------- 顶部导航 & 滚动进度 ---------- */
  const header = document.getElementById('siteHeader');
  const progressBar = document.getElementById('progressBar');

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 24);

    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(y / scrollable, 1) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  const setMenu = (open) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    mobileMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) setMenu(false);
  });

  /* ---------- 元素进入视口时显示 ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 导航高亮 ---------- */
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const linkById = new Map(
      navLinks.map((link) => [link.getAttribute('href')?.replace('#', ''), link])
    );

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => link.classList.remove('is-active'));
          const link = linkById.get(entry.target.id);
          if (link) link.classList.add('is-active');
        });
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    );

    sections.forEach((section) => spyObserver.observe(section));
  }

  /* ---------- 数字滚动 ---------- */
  const counters = document.querySelectorAll('[data-count]');

  const runCounter = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';

    if (prefersReducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCounter);
    } else {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => counterObserver.observe(el));
    }
  }

  /* ---------- 角色轮播 ---------- */
  const roles = Array.from(document.querySelectorAll('#roleRotator .role'));

  if (roles.length > 1 && !prefersReducedMotion) {
    let index = 0;
    window.setInterval(() => {
      roles[index].classList.remove('is-active');
      index = (index + 1) % roles.length;
      roles[index].classList.add('is-active');
    }, 2600);
  }

  /* ---------- 贡献热力图（装饰性示例数据） ---------- */
  const contribGrid = document.getElementById('contribGrid');

  if (contribGrid) {
    const COLS = 26;
    const ROWS = 7;
    let seed = 20260426;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < COLS * ROWS; i += 1) {
      const cell = document.createElement('span');
      cell.className = 'contrib-cell';
      const day = i % ROWS;
      const value = random();
      let level = 0;

      if (day !== 0 && day !== 6) {
        if (value > 0.86) level = 4;
        else if (value > 0.66) level = 3;
        else if (value > 0.4) level = 2;
        else if (value > 0.16) level = 1;
      } else if (value > 0.82) {
        level = 1;
      }

      cell.dataset.level = String(level);
      fragment.appendChild(cell);
    }

    contribGrid.appendChild(fragment);
  }

  /* ---------- 复制邮箱 ---------- */
  const toast = document.getElementById('toast');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      let timer = null;
      try {
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((resolve, reject) => {
            timer = window.setTimeout(() => reject(new Error('clipboard timeout')), 1200);
          })
        ]);
        return true;
      } catch (e) {
        /* 无权限或超时，继续使用降级方案 */
      } finally {
        window.clearTimeout(timer);
      }
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    textarea.remove();
    return ok;
  };

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        const copied = await copyText(button.dataset.copy || '');
        showToast(copied ? '邮箱已复制，期待你的来信' : '复制失败，请手动选择邮箱');
      } catch (e) {
        showToast('复制失败，请手动选择邮箱');
      }
    });
  });

  /* ---------- 作品卡片跟随鼠标的高光 ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    });
  }

  /* ---------- 页脚年份 & 本地时间 ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const localTime = document.getElementById('localTime');
  if (localTime) {
    const formatter = new Intl.DateTimeFormat('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const updateClock = () => {
      localTime.textContent = `北京 ${formatter.format(new Date())}`;
    };

    updateClock();
    window.setInterval(updateClock, 30000);
  }
})();
