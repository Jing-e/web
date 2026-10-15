/* ============================================================
   蓉城印象 · 成都文旅探索网站 —— 核心交互脚本 (ES6+)
   功能：① 轮播图 ② 景点分类筛选 ③ 模态弹窗 ④ 留言板/心愿单(localStorage)
   说明：景点数据集中在 ATTRACTIONS 数组，替换 img 为本地 images/ 路径即可。
   ============================================================ */
(function () {
  'use strict';

  // 标记 JS 可用：滚动淡入等增强效果仅在 .js 下启用，避免无脚本时内容被隐藏
  document.documentElement.classList.add('js');

  /* ---------------- 图片兜底（外链失效时替换为品牌占位图） ---------------- */
  const FALLBACK_IMG =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">' +
      '<rect width="100%" height="100%" fill="#2e3b34"/>' +
      '<text x="50%" y="46%" fill="#e0a63b" font-size="40" font-family="serif" text-anchor="middle">蓉城印象</text>' +
      '<text x="50%" y="58%" fill="#d8cfc3" font-size="18" font-family="sans-serif" text-anchor="middle">图片加载中 / 待替换本地资源</text>' +
      '</svg>'
    );

  /* ---------------- 景点数据 ---------------- */
  const ATTRACTIONS = [
    {
      id: 'panda-base',
      name: '成都大熊猫繁育研究基地',
      category: 'nature', categoryLabel: '自然风光',
      img: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=800&q=80',
      rating: 4.9, tags: ['国宝', '亲子游', '生态'],
      desc: '全球最大的大熊猫人工繁育研究机构，近距离观察憨态可掬的国宝日常。清晨是熊猫最活跃的觅食时刻，竹林掩映间，看它们打滚、爬树、啃竹子。'
    },
    {
      id: 'qingcheng-mountain',
      name: '青城山',
      category: 'nature', categoryLabel: '自然风光',
      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      rating: 4.8, tags: ['道教', '徒步', '避暑'],
      desc: '道教发源地之一，「青城天下幽」名不虚传。林木葱郁、曲径通幽，拾级而上，道观隐于苍翠之间，是夏日避暑与轻徒步的绝佳去处。'
    },
    {
      id: 'dujiangyan',
      name: '都江堰水利工程',
      category: 'history', categoryLabel: '历史文化',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      rating: 4.9, tags: ['世界遗产', '水利', '古蜀'],
      desc: '两千余年的无坝引水水利工程，「功在当代、利在千秋」。鱼嘴分江、飞沙堰泄洪、宝瓶口引水，见证古蜀先民天人合一的智慧。'
    },
    {
      id: 'kuanzhai-alley',
      name: '宽窄巷子',
      category: 'history', categoryLabel: '历史文化',
      img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
      rating: 4.7, tags: ['古街', '茶馆', '文创'],
      desc: '由宽巷子、窄巷子、井巷子组成的清代古街区。青砖黛瓦之间，藏着老茶馆、盖碗茶、小吃摊与文创小店，是最成都的市井缩影。'
    },
    {
      id: 'wuhouci',
      name: '武侯祠 · 锦里',
      category: 'history', categoryLabel: '历史文化',
      img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80',
      rating: 4.8, tags: ['三国', '历史', '民俗'],
      desc: '纪念三国蜀汉丞相诸葛亮的祠堂，红墙竹影、古柏森森。与锦里古街相连，日可逛祠怀古，夜可看灯火、品小吃，感受三国文化与川西民俗的交融。'
    },
    {
      id: 'chunxi-road',
      name: '春熙路 · 太古里',
      category: 'landmark', categoryLabel: '城市地标',
      img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80',
      rating: 4.7, tags: ['购物', '网红', '都市'],
      desc: '成都最繁华的商圈，IFS「爬墙大熊猫」是必打卡的网红地标。川西风格的院落式街区与现代时尚品牌交相辉映，好吃好玩又好逛。'
    },
    {
      id: 'tianfu-square',
      name: '天府广场',
      category: 'landmark', categoryLabel: '城市地标',
      img: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=800&q=80',
      rating: 4.5, tags: ['地标', '文化', '城市'],
      desc: '成都的城市中心，四川科技馆、省图书馆、省美术馆等环绕四周。广场中央的太极图案，是了解蜀地文化的最佳起点。'
    },
    {
      id: 'hotpot',
      name: '成都火锅',
      category: 'food', categoryLabel: '美食打卡',
      img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
      rating: 5.0, tags: ['麻辣', '必吃', '夜宵'],
      desc: '红油翻滚、麻辣鲜香，毛肚、黄喉、鸭肠涮入九宫格，再配一碗冰粉。深夜的火锅店里人声鼎沸，这是成都最不可错过的味觉记忆。'
    },
    {
      id: 'sichuan-cuisine',
      name: '川菜百味',
      category: 'food', categoryLabel: '美食打卡',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      rating: 4.8, tags: ['川菜', '经典', '下饭'],
      desc: '「一菜一格，百菜百味」，麻婆豆腐、回锅肉、宫保鸡丁、水煮牛肉…… 用舌尖读懂成都，一顿地道的家常川菜足矣。'
    }
  ];

  const STORAGE_KEYS = { messages: 'cd_messages', wishlist: 'cd_wishlist' };

  /* ---------------- 工具函数 ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const load = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };
  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));

  const formatTime = (ts) => {
    const d = new Date(ts);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const getWishlist = () => load(STORAGE_KEYS.wishlist, []);

  /* ============================================================
     ① 渲染景点卡片 + ② 分类筛选
     ============================================================ */
  function renderCards(filter = 'all') {
    const grid = $('#cardsGrid');
    const list = filter === 'all' ? ATTRACTIONS : ATTRACTIONS.filter((a) => a.category === filter);
    const wishlist = getWishlist();

    grid.innerHTML = list.map((item, i) => {
      const favorited = wishlist.includes(item.id);
      return `
        <article class="card reveal" data-category="${item.category}" data-id="${item.id}" style="transition-delay:${(i % 3) * 80}ms">
          <div class="card-media">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <span class="card-category">${item.categoryLabel}</span>
            <button class="card-wish ${favorited ? 'favorited' : ''}" data-wish="${item.id}" aria-label="收藏 ${item.name}">${favorited ? '♥' : '♡'}</button>
          </div>
          <div class="card-body">
            <h3 class="card-title">${item.name}</h3>
            <p class="card-rating">★★★★★ ${item.rating}<span> · ${item.tags[0]}</span></p>
            <p class="card-desc">${item.desc}</p>
            <button class="card-more" data-view="${item.id}">查看详情</button>
          </div>
        </article>`;
    }).join('');

    // 为动态图片绑定兜底
    $$('.card-media img', grid).forEach((img) => bindImgFallback(img));
    // 新渲染的卡片重新纳入滚动淡入观察
    observeReveal(grid);
  }

  function initFilter() {
    $('#filterBar').addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      $$('.filter-btn').forEach((b) => b.classList.toggle('active', b === btn));
      renderCards(btn.dataset.filter);
    });
  }

  /* ============================================================
     ① 轮播图（自动播放 / 手动切换 / 圆点 / 悬停暂停 / 触摸滑动）
     ============================================================ */
  function initCarousel() {
    const track = $('#carouselTrack');
    const slides = $$('.carousel-slide', track);
    const dotsWrap = $('#carouselDots');
    const prev = $('#carouselPrev');
    const next = $('#carouselNext');
    const carousel = $('#carousel');

    let current = 0;
    let timer = null;
    const INTERVAL = 5000;

    // 生成圆点
    dotsWrap.innerHTML = slides.map((_, i) =>
      `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="第 ${i + 1} 张"></button>`
    ).join('');
    const dots = $$('.carousel-dot', dotsWrap);

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function play() { timer = setInterval(() => goTo(current + 1), INTERVAL); }
    function stop() { clearInterval(timer); }

    prev.addEventListener('click', () => { stop(); goTo(current - 1); play(); });
    next.addEventListener('click', () => { stop(); goTo(current + 1); play(); });

    dotsWrap.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (!dot) return;
      stop(); goTo(Number(dot.dataset.index)); play();
    });

    // 悬停暂停，移出恢复
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', play);

    // 触摸滑动
    let startX = 0;
    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stop(); }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
      play();
    }, { passive: true });

    play();
  }

  /* ============================================================
     ③ 模态弹窗（查看详情）
     ============================================================ */
  function initModal() {
    const modal = $('#modal');
    const backdrop = $('#modalBackdrop');
    const closeBtn = $('#modalClose');
    const wishBtn = $('#modalWish');

    const els = {
      img: $('#modalImg'), category: $('#modalCategory'), title: $('#modalTitle'),
      rating: $('#modalRating'), desc: $('#modalDesc'), tags: $('#modalTags')
    };

    let currentId = null;

    function open(item) {
      currentId = item.id;
      els.img.src = item.img;
      els.img.alt = item.name;
      bindImgFallback(els.img);
      els.category.textContent = item.categoryLabel;
      els.title.textContent = item.name;
      els.rating.textContent = `★★★★★ ${item.rating} 分`;
      els.desc.textContent = item.desc;
      els.tags.innerHTML = item.tags.map((t) => `<span class="modal-tag">${t}</span>`).join('');

      const favorited = getWishlist().includes(item.id);
      wishBtn.innerHTML = favorited ? '♥ 已加入心愿单' : '♡ 加入心愿单';
      wishBtn.classList.toggle('favorited', favorited);

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // 卡片「查看详情」按钮（事件委托）
    $('#cardsGrid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-view]');
      if (!btn) return;
      const item = ATTRACTIONS.find((a) => a.id === btn.dataset.view);
      if (item) open(item);
    });

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    // 弹窗内「加入心愿单」
    wishBtn.addEventListener('click', () => {
      if (!currentId) return;
      toggleWish(currentId);
      const favorited = getWishlist().includes(currentId);
      wishBtn.innerHTML = favorited ? '♥ 已加入心愿单' : '♡ 加入心愿单';
      wishBtn.classList.toggle('favorited', favorited);
      syncCardHeart(currentId); // 同步卡片 ♥ 状态
    });
  }

  /* ============================================================
     ④ 留言板（localStorage 持久化）
     ============================================================ */
  function initMessages() {
    const form = $('#messageForm');
    const list = $('#messageList');
    const nameInput = $('#msgName');
    const contentInput = $('#msgContent');

    let messages = load(STORAGE_KEYS.messages, []);

    function render() {
      if (!messages.length) {
        list.innerHTML = '<li class="wish-empty" style="padding:16px 0">还没有留言，来抢沙发吧～</li>';
        return;
      }
      list.innerHTML = messages.map((m) => `
        <li class="message-item" data-id="${m.id}">
          <span class="message-avatar">${escapeHTML(m.name.charAt(0))}</span>
          <div class="message-content">
            <div class="message-head">
              <span class="message-name">${escapeHTML(m.name)}</span>
              <span class="message-time">${formatTime(m.time)}</span>
            </div>
            <p class="message-text">${escapeHTML(m.content)}</p>
          </div>
          <button class="message-del" data-del="${m.id}" aria-label="删除留言">删除</button>
        </li>`).join('');
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const content = contentInput.value.trim();
      if (!name || !content) { alert('请填写昵称和留言内容～'); return; }

      messages.unshift({ id: Date.now(), name, content, time: Date.now() });
      save(STORAGE_KEYS.messages, messages);
      render();
      form.reset();
    });

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-del]');
      if (!btn) return;
      messages = messages.filter((m) => m.id !== Number(btn.dataset.del));
      save(STORAGE_KEYS.messages, messages);
      render();
    });

    render();
  }

  /* ============================================================
     ④ 心愿单（收藏 / 取消 / 渲染）
     ============================================================ */
  function toggleWish(id) {
    let wishlist = getWishlist();
    wishlist = wishlist.includes(id)
      ? wishlist.filter((x) => x !== id)
      : [...wishlist, id];
    save(STORAGE_KEYS.wishlist, wishlist);
    renderWishlist();
  }

  // 同步单张卡片的 ♥ 状态（原地更新，避免整页重绘打断心跳动画）
  function syncCardHeart(id, btn) {
    const favorited = getWishlist().includes(id);
    const target = btn || $(`[data-wish="${id}"]`);
    if (!target) return;
    target.classList.toggle('favorited', favorited);
    target.textContent = favorited ? '♥' : '♡';
    const name = (ATTRACTIONS.find((a) => a.id === id) || {}).name || '';
    target.setAttribute('aria-label', (favorited ? '取消收藏 ' : '收藏 ') + name);
    // 触发心跳动画
    target.classList.remove('heart-pop');
    void target.offsetWidth; // 强制回流以重放动画
    target.classList.add('heart-pop');
  }

  function renderWishlist() {
    const list = $('#wishlistList');
    const count = $('#wishCount');
    const empty = $('#wishEmpty');
    const wishlist = getWishlist();
    const items = wishlist.map((id) => ATTRACTIONS.find((a) => a.id === id)).filter(Boolean);

    count.textContent = items.length;
    empty.style.display = items.length ? 'none' : 'block';
    list.innerHTML = items.map((item) => `
      <li class="wish-item">
        <img class="wish-thumb" src="${item.img}" alt="${item.name}">
        <div class="wish-info">
          <p class="wish-name">${item.name}</p>
          <p class="wish-cat">${item.categoryLabel}</p>
        </div>
        <button class="wish-remove" data-remove="${item.id}" aria-label="移除 ${item.name}">移除</button>
      </li>`).join('');

    $$('.wish-thumb', list).forEach((img) => bindImgFallback(img));
  }

  function initWishlist() {
    renderWishlist();

    // 卡片右上角 ♥ 收藏（原地切换 + 心跳动画 + 同步心愿单）
    $('#cardsGrid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-wish]');
      if (!btn) return;
      e.stopPropagation();
      toggleWish(btn.dataset.wish);
      syncCardHeart(btn.dataset.wish, btn);
    });

    // 心愿单列表「移除」
    $('#wishlistList').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove]');
      if (!btn) return;
      toggleWish(btn.dataset.remove);
    });
  }

  /* ============================================================
     导航汉堡菜单 / 滚动高亮 / 回到顶部 / 图片兜底
     ============================================================ */
  function bindImgFallback(img) {
    img.onerror = () => { img.onerror = null; if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; };
  }

  /* ============================================================
     滚动淡入动效（IntersectionObserver）
     ============================================================ */
  let revealObserver = null;

  function observeReveal(container = document) {
    const targets = $$('.reveal:not(.visible)', container);

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('visible')); // 兼容降级：直接显示
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // 显示一次后停止观察
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    }

    targets.forEach((el) => revealObserver.observe(el));
  }

  function initNav() {
    const toggle = $('#navToggle');
    const nav = $('#siteNav');
    const header = $('.site-header');

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      // 菜单展开时给页头补实色底，保证文字可读
      if (open) header.classList.add('scrolled');
      else header.classList.toggle('scrolled', window.scrollY > 10);
    });

    // 点击导航项后收起（移动端）
    $$('.nav-link').forEach((link) =>
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        header.classList.toggle('scrolled', window.scrollY > 10);
      })
    );

    // 滚动：高亮当前区块导航 + 回到顶部按钮 + 页头实色切换
    const sections = ['home', 'attractions', 'culture', 'guestbook']
      .map((id) => document.getElementById(id)).filter(Boolean);

    const backTop = $('#backToTop');
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const spy = () => {
      const y = window.scrollY + 120;
      let activeId = 'home';
      sections.forEach((sec) => { if (sec.offsetTop <= y) activeId = sec.id; });
      $$('.nav-link').forEach((a) =>
        a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`));
      backTop.classList.toggle('show', window.scrollY > 600);
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* ---------------- 启动 ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    initFilter();
    initCarousel();
    initModal();
    initMessages();
    initWishlist();
    initNav();
    observeReveal(); // 静态板块（标题/筛选栏/风物卡/留言板容器）滚动淡入
    // 为 HTML 中写死的图片（轮播、风物）统一绑定兜底
    $$('img').forEach(bindImgFallback);
  });
})();
