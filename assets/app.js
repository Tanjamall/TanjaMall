(function () {
  const STORAGE_KEYS = {
    cart: "tanjamall_preview_cart",
    favorites: "tanjamall_preview_favorites",
    orders: "tanjamall_preview_orders"
  };

  const money = (value) => `${value} درهم`;

  const icons = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.8 4.6c-1.8-1.7-4.6-1.6-6.3.2L12 7.4 9.5 4.8C7.8 3 5 2.9 3.2 4.6 1.1 6.6 1 10 3 12.1l9 8.9 9-8.9c2-2.1 1.9-5.5-.2-7.5Z"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 6h15l-2 8H8L6 3H3"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h12v10H3zM15 10h4l2 3v3h-6z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>',
    quality: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 2 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 16.2l-5.6 3 1.1-6.2L3 8.6l6.2-.9Z"/></svg>',
    chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M4 10h3M4 14h3M17 10h3M17 14h3M10 4v3M14 4v3M10 17v3M14 17v3"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
    toy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>',
    beauty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 3h8v6H8zM9 9h6v12H9zM5 15h4M15 15h4"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 16h14l-1.5-5h-11Z"/><path d="M7 11l1.5-4h7L17 11"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/></svg>',
    lamp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 2h6l2 8H7zM12 10v8M8 22h8M9 18h6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"/></svg>'
  };

  const categories = [
    { id: "electronics", name: "الإلكترونيات", icon: "chip", color: "#dfe9df" },
    { id: "home-garden", name: "المنزل والحديقة", icon: "home", color: "#fff2d7" },
    { id: "toys", name: "الألعاب", icon: "toy", color: "#edf3ef" },
    { id: "beauty", name: "الجمال", icon: "beauty", color: "#ffedc7" },
    { id: "car-accessories", name: "اكسسوارات السيارات", icon: "car", color: "#f4f2ed" },
    { id: "lights-lamps", name: "أضواء ومصابيح", icon: "lamp", color: "#ffe3a4" },
    { id: "kids", name: "أطفال", icon: "toy", color: "#e8f0e8" },
    { id: "clothes", name: "ملابس", icon: "home", color: "#fff6e5" },
    { id: "tools", name: "أدوات البريكولاج", icon: "chip", color: "#eef2ef" }
  ];

  const products = [
    {
      slug: "camp-shower-bag",
      category: "home-garden",
      title: "حقيبة استحمام محمولة للتخييم لتسخين الماء بالطاقة الشمسية مع رشاشة قابلة للتبديل",
      stock: "تخفيض 42%",
      price: 349,
      oldPrice: 599,
      discount: 42,
      rating: 4.8,
      reviews: 698,
      image: "https://aga-shoppex.com/media/9329/h5KaxF2bZrxfy1uko2eHoNXQtm0aB3kfrWNI4oaR.jpg",
      gallery: [
        "https://aga-shoppex.com/media/9329/h5KaxF2bZrxfy1uko2eHoNXQtm0aB3kfrWNI4oaR.jpg",
        "https://aga-shoppex.com/media/9330/wXV11MnbdBbUIBuduhKAz1Vqm1OQyJ1wIApOnZ3k.jpg",
        "https://aga-shoppex.com/media/9321/conversions/39U79Odyg01EbgA5cEXEtbBIVWiSq7PI8HpUKrk3-media-compressed.webp"
      ],
      detailImages: [
        "https://aga-shoppex.com/media/9329/h5KaxF2bZrxfy1uko2eHoNXQtm0aB3kfrWNI4oaR.jpg",
        "https://aga-shoppex.com/media/9330/wXV11MnbdBbUIBuduhKAz1Vqm1OQyJ1wIApOnZ3k.jpg",
        "https://aga-shoppex.com/media/9321/conversions/39U79Odyg01EbgA5cEXEtbBIVWiSq7PI8HpUKrk3-media-compressed.webp",
        "https://aga-shoppex.com/media/9322/conversions/nocWZJcdeMJmxZLSMp3GTljF7W3jx6zBOdW0ithG-media-compressed.webp",
        "https://aga-shoppex.com/media/9323/conversions/2XupQ1GmjKj2V9B1UeMUmtUzg6OfvExfyfteJ2E7-media-compressed.webp",
        "https://aga-shoppex.com/media/9324/conversions/7ta9oY9t0s1p8oHjcdza8YNxa3fT7D4IGeqhGSpP-media-compressed.webp"
      ],
      offers: [
        { id: "single", name: "قطعة واحدة", note: "الدفع عند الاستلام", qty: 1, price: 349, oldPrice: 599, discount: 42 },
        { id: "two", name: "قطعتان", note: "عرض التخييم", qty: 2, price: 649, oldPrice: 1198, discount: 46 }
      ],
      description: "حقيبة استحمام محمولة للتخييم والسفر تسخن الماء بالطاقة الشمسية.",
      badge: "منتج تجريبي"
    },
    {
      slug: "solar-projector-120w",
      category: "lights-lamps",
      title: "بروجيكتور 120 واط يعمل بالطاقة الشمسية",
      stock: "تخفيض 45%",
      price: 249,
      oldPrice: 449,
      discount: 45,
      rating: 4.8,
      reviews: 128,
      image: "https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp",
      gallery: [
        "https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp",
        "https://aga-shoppex.com/media/6579/conversions/TAeiVgzHJIKIpJ5eu9eaFZuh6LjOEgzKzM19YVsW-media-compressed.webp",
        "https://aga-shoppex.com/media/6580/conversions/U6dOUpCIvx0ixJq8tEC5kElclbFkMI8sCuj2lCjD-media-compressed.webp"
      ],
      description: "إضاءة خارجية قوية مع شحن شمسي وتحكم عن بعد، مناسبة للحدائق والمداخل والمرائب.",
      badge: "الأكثر طلبا"
    },
    {
      slug: "solar-lamp-500w",
      category: "lights-lamps",
      title: "مصباح الطاقة الشمسية لجميع المساحات الخارجية 500 واط",
      stock: "تخفيض 61%",
      price: 549,
      oldPrice: 1399,
      discount: 61,
      rating: 4.7,
      reviews: 91,
      image: "https://aga-shoppex.com/media/8893/conversions/FQinn06FpPpjl7h9ARxmzp7oll8tyB2sd5oFdjSw-media-compressed.webp",
      gallery: [
        "https://aga-shoppex.com/media/8893/conversions/FQinn06FpPpjl7h9ARxmzp7oll8tyB2sd5oFdjSw-media-compressed.webp",
        "https://aga-shoppex.com/media/8894/conversions/BJ7sxz7aJxOG0Qf2ti1weQ5loVEU7DFAreJSb7MF-media-compressed.webp"
      ],
      description: "مصباح شمسي كبير للمساحات الواسعة مع حساس حركة وبطارية مدمجة.",
      badge: "عرض محدود"
    },
    {
      slug: "car-cup-holder",
      category: "car-accessories",
      title: "حامل الأكواب ومستلزمات السيارة 4 في 1",
      stock: "تخفيض 53%",
      price: 94,
      oldPrice: 199,
      discount: 53,
      rating: 4.5,
      reviews: 52,
      image: "https://aga-shoppex.com/media/6960/conversions/A730p6nzLcj0SvR3Z9vTWHwpyFCRgQUa6iG8Q3B5-media-compressed.webp",
      gallery: [
        "https://aga-shoppex.com/media/6960/conversions/A730p6nzLcj0SvR3Z9vTWHwpyFCRgQUa6iG8Q3B5-media-compressed.webp"
      ],
      description: "منظم عملي داخل السيارة للأكواب والهاتف والمفاتيح.",
      badge: "عملي"
    },
    {
      slug: "jump-starter",
      category: "car-accessories",
      title: "جهاز الطوارئ لتشغيل السيارة ونفخ العجلات وشحن الهاتف",
      stock: "تخفيض 20%",
      price: 799,
      oldPrice: 999,
      discount: 20,
      rating: 4.9,
      reviews: 67,
      image: "https://aga-shoppex.com/media/7280/conversions/X06D6pO77MLwZK1tdKiIXXmQicJVNDXeqzSjXce2-media-compressed.webp",
      gallery: [
        "https://aga-shoppex.com/media/7280/conversions/X06D6pO77MLwZK1tdKiIXXmQicJVNDXeqzSjXce2-media-compressed.webp"
      ],
      description: "جهاز متعدد الوظائف لحالات الطوارئ في الطريق.",
      badge: "جديد"
    },
    {
      slug: "portable-fan",
      category: "electronics",
      title: "مروحة لاسلكية قابلة لاعادة الشحن للاستعمال الخارجي",
      stock: "تخفيض 30%",
      price: 349,
      oldPrice: 499,
      discount: 30,
      rating: 4.4,
      reviews: 38,
      image: "https://aga-shoppex.com/media/7312/conversions/O2xQolEzM9fNFiHnFL8d5TEU1dZnoRDTnqN0EGKk-media-compressed.webp",
      gallery: [
        "https://aga-shoppex.com/media/7312/conversions/O2xQolEzM9fNFiHnFL8d5TEU1dZnoRDTnqN0EGKk-media-compressed.webp"
      ],
      description: "مروحة محمولة للرحلات والمنزل مع بطارية قابلة للشحن.",
      badge: "صيفي"
    },
    {
      slug: "door-lock",
      category: "home-garden",
      title: "قفل ميكانيكي برمز سري للأبواب والخزانات",
      stock: "تخفيض 37%",
      price: 189,
      oldPrice: 299,
      discount: 37,
      rating: 4.6,
      reviews: 44,
      image: "https://aga-shoppex.com/media/7039/conversions/SKwTLtYVn8tHvfhSRAspBCjNeH1PvkgaJ5AMb07P-media-compressed.webp",
      gallery: [
        "https://aga-shoppex.com/media/7039/conversions/SKwTLtYVn8tHvfhSRAspBCjNeH1PvkgaJ5AMb07P-media-compressed.webp"
      ],
      description: "قفل بدون مفاتيح مناسب للأبواب والخزانات والمستودعات.",
      badge: "آمن"
    },
    {
      slug: "beauty-organizer",
      category: "beauty",
      title: "منظم أدوات التجميل متعدد الخانات",
      stock: "تخفيض 35%",
      price: 129,
      oldPrice: 199,
      discount: 35,
      rating: 4.3,
      reviews: 29,
      image: "https://aga-shoppex.com/media/7304/conversions/jSZRufp73t44ezFlfhy0o3SUYREXd1WnWC6OKDIm-media-compressed.webp",
      gallery: [
        "https://aga-shoppex.com/media/7304/conversions/jSZRufp73t44ezFlfhy0o3SUYREXd1WnWC6OKDIm-media-compressed.webp"
      ],
      description: "منظم صغير يحافظ على ترتيب أدوات التجميل اليومية.",
      badge: "مفضل"
    },
    {
      slug: "kitchen-slicer",
      category: "home-garden",
      title: "قطاعة خضر عملية للمطبخ مع عدة شفرات",
      stock: "تخفيض 42%",
      price: 149,
      oldPrice: 259,
      discount: 42,
      rating: 4.5,
      reviews: 76,
      image: "https://aga-shoppex.com/media/7190/conversions/ahIqllndilPzA6dVmsnWU2C4CyosFB0VFdBxy85X-media-compressed.webp",
      gallery: [
        "https://aga-shoppex.com/media/7190/conversions/ahIqllndilPzA6dVmsnWU2C4CyosFB0VFdBxy85X-media-compressed.webp"
      ],
      description: "قطاعة تساعدك في تحضير الخضر بسرعة وبأحجام مختلفة.",
      badge: "للمطبخ"
    }
  ];

  const offers = [
    { id: "single", name: "قطعة واحدة", note: "الدفع عند الاستلام", qty: 1, price: 249, oldPrice: 449, discount: 45 },
    { id: "two", name: "قطعتان", note: "الأكثر اختيارا", qty: 2, price: 399, oldPrice: 898, discount: 56 },
    { id: "three", name: "ثلاث قطع", note: "توفير أكبر", qty: 3, price: 649, oldPrice: 1347, discount: 52 },
    { id: "four", name: "أربع قطع", note: "عرض العائلة", qty: 4, price: 799, oldPrice: 1796, discount: 56 }
  ];

  const SEEDED_CATALOG = createSeedCatalog();

  const state = {
    route: parseRoute(),
    heroIndex: 0,
    galleryIndex: 0,
    selectedOffer: "single",
    quantity: 1,
    categorySort: "popular",
    visibleProducts: 6,
    filterOpen: false,
    menuOpen: false,
    cartOpen: false,
    onlyDiscounts: false,
    toastTimer: null,
    cart: readJson(STORAGE_KEYS.cart, []),
    favorites: new Set(readJson(STORAGE_KEYS.favorites, [])),
    orders: readJson(STORAGE_KEYS.orders, [])
  };

  const app = document.getElementById("app");

  window.addEventListener("hashchange", () => {
    state.route = parseRoute();
    state.galleryIndex = 0;
    state.visibleProducts = 6;
    state.filterOpen = false;
    state.menuOpen = false;
    state.cartOpen = false;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  setInterval(() => {
    if (state.route.page === "home") {
      state.heroIndex = (state.heroIndex + 1) % 3;
      renderHomeHero();
    }
  }, 5200);

  function readJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function createSeedCatalog() {
    return {
      categories: categories.map((category, index) => ({ ...category, order: index + 1, visible: true })),
      products: products.map((product, index) => ({
        ...deepClone(product),
        status: "published",
        visible: true,
        order: index + 1,
        offers: deepClone(product.offers || offers),
        gallery: deepClone(product.gallery || [product.image]),
        detailImages: deepClone(product.detailImages || product.gallery || [product.image])
      })),
      homepage: {
        heroSlides: [
          { productSlug: products[0].slug, kicker: "عرض اليوم", title: "إنارة خارجية بالطاقة الشمسية", copy: "تصميم قريب من Shoppex مع ألوان TanjaMall فقط." },
          { productSlug: products[1].slug, kicker: "تخفيض كبير", title: "مصابيح قوية للمساحات الكبيرة", copy: "اختبر السحب، السلة، والانتقال بين الصفحات." },
          { productSlug: products[3].slug, kicker: "للرحلات", title: "حلول عملية للسيارة والمنزل", copy: "كل البيانات هنا تجريبية ومذكورة في ملف التتبع." }
        ],
        sections: [
          { id: "featured", title: "أقوى العروض", productSlugs: products.slice(0, 5).map((product) => product.slug) },
          { id: "lights", title: "أضواء ومصابيح", productSlugs: products.filter((product) => product.category === "lights-lamps").map((product) => product.slug) },
          { id: "homecar", title: "مختارات المنزل والسيارة", productSlugs: products.filter((product) => product.category === "home-garden" || product.category === "car-accessories").map((product) => product.slug) }
        ]
      },
      settings: {
        storeName: "TanjaMall",
        servicePhone: "0672975000",
        whatsappNumber: "212672975000"
      }
    };
  }

  function normalizeCatalog(catalog) {
    const next = deepClone(catalog || SEEDED_CATALOG);
    next.categories = (next.categories || []).map((category, index) => ({ order: index + 1, visible: true, ...category }));
    next.products = (next.products || []).map((product, index) => ({
      ...product,
      status: product.status || "published",
      visible: product.visible !== false,
      order: product.order || index + 1,
      gallery: product.gallery?.length ? product.gallery : [product.image].filter(Boolean),
      detailImages: product.detailImages?.length ? product.detailImages : (product.gallery?.length ? product.gallery : [product.image].filter(Boolean)),
      offers: product.offers?.length ? product.offers : deepClone(offers)
    }));
    next.homepage = next.homepage || {};
    next.homepage.heroSlides = next.homepage.heroSlides?.length ? next.homepage.heroSlides : deepClone(SEEDED_CATALOG.homepage.heroSlides);
    next.homepage.sections = next.homepage.sections?.length ? next.homepage.sections : deepClone(SEEDED_CATALOG.homepage.sections);
    next.settings = { ...SEEDED_CATALOG.settings, ...(next.settings || {}) };
    return next;
  }

  function getStoreCatalog() {
    return normalizeCatalog(SEEDED_CATALOG);
  }

  function visibleCategories(catalog = getStoreCatalog()) {
    return catalog.categories.filter((category) => category.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function visibleProducts(catalog = getStoreCatalog()) {
    return catalog.products.filter((product) => product.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function parseRoute() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    const cleanHash = hash.split("?")[0];
    const params = new URLSearchParams(hash.split("?")[1] || "");
    const parts = cleanHash.split("/").filter(Boolean);
    if (!parts.length) return { page: "home", params };
    if (parts[0] === "category") return { page: "category", id: parts[1] || "lights-lamps", params };
    if (parts[0] === "product") return { page: "product", slug: parts[1] || products[0].slug, params };
    return { page: "home", params };
  }

  function setRoute(path) {
    window.location.hash = path;
  }

  function categoryById(id) {
    const catalog = getStoreCatalog();
    return catalog.categories.find((category) => category.id === id) || catalog.categories[0] || SEEDED_CATALOG.categories[0];
  }

  function productBySlug(slug) {
    const catalog = getStoreCatalog();
    return catalog.products.find((product) => product.slug === slug) || catalog.products[0] || SEEDED_CATALOG.products[0];
  }

  function cartCount() {
    return state.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function cartTotal() {
    return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function imageError(event) {
    const holder = document.createElement("div");
    holder.className = "skeleton-image";
    holder.textContent = "صورة تجريبية";
    event.target.replaceWith(holder);
  }

  window.tanjaMallImageFallback = imageError;

  function render() {
    const content = routeContent();
    app.innerHTML = `
      <main class="page-frame">
        ${header()}
        ${content}
        ${drawers()}
      </main>
      <div id="toast" class="toast"></div>
    `;
    document.body.classList.toggle("drawer-open", state.menuOpen || state.cartOpen || state.filterOpen);
    attachEvents();
  }

  function header() {
    const settings = getStoreCatalog().settings;
    return `
      <div class="service-line">
        ${icons.phone}
        <span>خدمة الزبائن: <span class="phone-ltr">${settings.servicePhone}</span></span>
      </div>
      <header>
        <div class="topbar">
          <button class="icon-button" data-action="open-menu" aria-label="فتح القائمة">${icons.menu}</button>
          <a class="brand" href="#/" aria-label="TanjaMall"><span>Tanja</span>Mall</a>
          <button class="icon-button" data-action="open-cart" aria-label="فتح السلة">
            ${icons.cart}
            ${cartCount() ? `<span class="badge">${cartCount()}</span>` : ""}
          </button>
        </div>
        <form class="search-row" data-action="search">
          <label class="search-box">
            ${icons.search}
            <input name="q" type="search" placeholder="شنو كتقلب عليه؟" autocomplete="off" />
          </label>
          <button class="icon-button light" type="submit" aria-label="بحث">${icons.search}</button>
        </form>
      </header>
      <div class="notice-strip" aria-label="مميزات المتجر">
        <div class="notice-item">${icons.phone}<span>خدمة الزبائن</span></div>
        <div class="notice-item">${icons.card}<span>الدفع عند الاستلام</span></div>
        <div class="notice-item">${icons.quality}<span>الجودة الأفضل</span></div>
        <div class="notice-item">${icons.shield}<span>ضمان الإسترجاع</span></div>
      </div>
    `;
  }

  function routeContent() {
    if (state.route.page === "category") return categoryPage(state.route.id);
    if (state.route.page === "product") return productPage(state.route.slug);
    return homePage();
  }

  function homePage() {
    const catalog = getStoreCatalog();
    const activeCategories = visibleCategories(catalog);
    const sections = catalog.homepage.sections;

    return `
      <section class="content">
        <div id="heroMount">${heroMarkup()}</div>
        <div class="section-head">
          <h2 class="section-title">التصنيفات</h2>
          <a class="view-all" href="#/category/lights-lamps">مشاهدة الكل</a>
        </div>
        <div class="h-scroll category-strip" aria-label="تصنيفات قابلة للسحب">
          ${activeCategories.map(categoryTile).join("")}
        </div>
        ${sections.map((section) => productSection(section.title, productsForSection(section, catalog), section.id)).join("")}
      </section>
    `;
  }

  function heroMarkup() {
    const catalog = getStoreCatalog();
    const slides = catalog.homepage.heroSlides
      .map((slide) => ({ ...slide, product: catalog.products.find((product) => product.slug === slide.productSlug) }))
      .filter((slide) => slide.product);
    const slide = slides[state.heroIndex % slides.length];
    if (!slide) return "";
    return `
      <div class="hero">
        <div class="hero-slide">
          <div>
            <span class="hero-kicker">${slide.kicker}</span>
            <h1 class="hero-title">${slide.title}</h1>
            <p class="hero-copy">${slide.copy}</p>
            <a class="view-all" href="#/product/${slide.product.slug}">اكتشف العرض</a>
          </div>
          <img class="hero-img" src="${slide.product.image}" alt="${escapeHtml(slide.product.title)}" onerror="tanjaMallImageFallback(event)" />
        </div>
        <div class="hero-controls">
          ${slides.map((_, index) => `<button class="dot ${index === state.heroIndex ? "active" : ""}" data-action="hero" data-index="${index}" aria-label="الشريحة ${index + 1}"></button>`).join("")}
        </div>
      </div>
    `;
  }

  function renderHomeHero() {
    const mount = document.getElementById("heroMount");
    if (mount) {
      mount.innerHTML = heroMarkup();
      attachEvents(mount);
    }
  }

  function categoryTile(category) {
    return `
      <a class="category-tile" href="#/category/${category.id}" style="background:${category.color}">
        <span class="category-name">${category.name}</span>
        <span class="category-icon">${icons[category.icon] || icons.chip}</span>
      </a>
    `;
  }

  function productSection(title, list, id) {
    if (!list.length) return "";
    return `
      <div class="section-head">
        <h2 class="section-title">${title}</h2>
        <a class="view-all" href="#/category/${list[0]?.category || "lights-lamps"}">مشاهدة الكل</a>
      </div>
      <div class="product-row" id="row-${id}">
        ${list.map(productCard).join("")}
      </div>
    `;
  }

  function productCard(product) {
    const active = state.favorites.has(product.slug) ? "active" : "";
    return `
      <article class="product-card">
        <a class="product-media" href="#/product/${product.slug}">
          <span class="discount">-${product.discount}%</span>
          <img src="${product.image}" alt="${escapeHtml(product.title)}" onerror="tanjaMallImageFallback(event)" />
        </a>
        <button class="fav ${active}" data-action="toggle-favorite" data-slug="${product.slug}" aria-label="حفظ المنتج">${icons.heart}</button>
        <div class="product-info">
          <div class="stock-line">${product.stock}</div>
          <a href="#/product/${product.slug}"><h3 class="product-title">${product.title}</h3></a>
          <div class="price-row">
            <span class="price">${money(product.price)}</span>
            <span class="old-price">${money(product.oldPrice)}</span>
          </div>
          <a class="buy-btn" href="#/product/${product.slug}">اطلب الآن</a>
        </div>
      </article>
    `;
  }

  function categoryPage(categoryId) {
    const catalog = getStoreCatalog();
    const activeCategories = visibleCategories(catalog);
    const activeProducts = visibleProducts(catalog);
    const category = categoryById(categoryId);
    const query = new URLSearchParams(window.location.hash.split("?")[1] || "").get("q") || "";
    let list = activeProducts.filter((product) => categoryId === "all" || product.category === category.id);
    if (query) list = activeProducts.filter((product) => product.title.includes(query));
    if (state.onlyDiscounts) list = list.filter((product) => product.discount >= 40);
    list = sortProducts(list, state.categorySort);
    const shown = list.slice(0, state.visibleProducts);

    return `
      <section class="content">
        <div class="chips">
          ${activeCategories.map((item) => `<a class="chip ${item.id === category.id ? "active" : ""}" href="#/category/${item.id}">${item.name}</a>`).join("")}
        </div>
        <div class="category-hero">
          <h1>${query ? "نتائج البحث" : category.name}</h1>
          <p>${list.length} منتج تجريبي متوفر في هذه الصفحة</p>
        </div>
        <div class="toolbar">
          <button class="filter-btn" data-action="toggle-filter">${icons.filter}<span>تصفية</span></button>
          <select class="sort-select" data-action="sort-products" aria-label="ترتيب المنتجات">
            <option value="popular" ${state.categorySort === "popular" ? "selected" : ""}>الأكثر شعبية</option>
            <option value="price-low" ${state.categorySort === "price-low" ? "selected" : ""}>السعر الأقل</option>
            <option value="price-high" ${state.categorySort === "price-high" ? "selected" : ""}>السعر الأعلى</option>
            <option value="discount" ${state.categorySort === "discount" ? "selected" : ""}>أكبر تخفيض</option>
          </select>
        </div>
        ${shown.length ? `<div class="product-grid">${shown.map(productCard).join("")}</div>` : `<div class="empty-state">لا توجد منتجات مطابقة حاليا.</div>`}
        ${shown.length < list.length ? `<button class="primary-btn load-more" data-action="load-more">عرض المزيد</button>` : ""}
      </section>
    `;
  }

  function sortProducts(list, sort) {
    const next = [...list];
    if (sort === "price-low") next.sort((a, b) => a.price - b.price);
    if (sort === "price-high") next.sort((a, b) => b.price - a.price);
    if (sort === "discount") next.sort((a, b) => b.discount - a.discount);
    if (sort === "popular") next.sort((a, b) => b.reviews - a.reviews);
    return next;
  }

  function productPage(slug) {
    const catalog = getStoreCatalog();
    const product = productBySlug(slug);
    const activeOffers = product.offers?.length ? product.offers : offers;
    const selected = activeOffers.find((offer) => offer.id === state.selectedOffer) || activeOffers[0];
    const gallery = product.gallery?.length ? product.gallery : [product.image];
    const related = visibleProducts(catalog).filter((item) => item.slug !== product.slug).slice(0, 5);
    const whatsappUrl = productWhatsappUrl(product);

    return `
      <section class="content">
        <div class="product-page-media">
          <div class="main-gallery">
            <img src="${gallery[state.galleryIndex % gallery.length]}" alt="${escapeHtml(product.title)}" onerror="tanjaMallImageFallback(event)" />
            <div class="gallery-actions">
              <button class="icon-button light" data-action="toggle-favorite" data-slug="${product.slug}" aria-label="حفظ المنتج">${icons.heart}</button>
              <span class="discount">-${selected.discount}%</span>
            </div>
          </div>
          <div class="thumb-row">
            ${gallery.map((image, index) => `
              <button class="thumb ${index === state.galleryIndex ? "active" : ""}" data-action="gallery" data-index="${index}">
                <img src="${image}" alt="صورة المنتج ${index + 1}" onerror="tanjaMallImageFallback(event)" />
              </button>
            `).join("")}
          </div>
        </div>
        <div class="product-detail">
          <h1>${product.title}</h1>
          <div class="rating-row">
            <span class="stars">★★★★★</span>
            <span>${product.rating} من 5 - ${product.reviews} تقييم</span>
          </div>
          <div class="detail-price">
            <span class="price">${money(selected.price)}</span>
            <span class="old-price">${money(selected.oldPrice)}</span>
          </div>
        </div>
        <div class="panel">
          <h2>اختر العرض</h2>
          <div class="offer-list">
            ${activeOffers.map((offer) => offerOption(offer, selected.id)).join("")}
          </div>
          <div class="qty-row">
            <strong>الكمية</strong>
            <div class="qty-control">
              <button data-action="qty-minus" aria-label="إنقاص">${icons.minus}</button>
              <span>${state.quantity}</span>
              <button data-action="qty-plus" aria-label="زيادة">${icons.plus}</button>
            </div>
          </div>
        </div>
        <form class="panel form-grid" data-action="fake-order">
          <h2>معلومات التوصيل</h2>
          <div class="field">
            <label for="name">الإسم الكامل</label>
            <input id="name" name="name" required placeholder="مثال: سعيد العلوي" />
          </div>
          <div class="field">
            <label for="phone">رقم الهاتف</label>
            <input id="phone" name="phone" required inputmode="tel" placeholder="06XXXXXXXX" />
          </div>
          <div class="field">
            <label for="city">المدينة</label>
            <input id="city" name="city" required placeholder="طنجة" />
          </div>
          <div class="field">
            <label for="address">العنوان</label>
            <textarea id="address" name="address" required placeholder="الحي، الشارع، رقم المنزل"></textarea>
          </div>
          <div class="cart-total">
            <span>المجموع التجريبي</span>
            <span>${money(selected.price * state.quantity)}</span>
          </div>
          <button class="primary-btn" type="submit">تأكيد الطلب التجريبي</button>
          <div class="form-message" id="orderMessage"></div>
        </form>
        ${productDetailsSection(product)}
        ${productSection("منتجات مقترحة", related, "related")}
        <div class="floating-product-actions">
          <a class="whatsapp-action" href="${whatsappUrl}" target="_blank" rel="noopener">واتساب</a>
          <button class="primary-btn floating-order-btn" data-action="scroll-order">اطلب الآن</button>
        </div>
      </section>
    `;
  }

  function productWhatsappUrl(product) {
    const settings = getStoreCatalog().settings;
    const host = window.location.hostname === "127.0.0.1" ? "localhost:5174" : window.location.host;
    const baseUrl = `${window.location.protocol}//${host}${window.location.pathname}#/product/${product.slug}`;
    const message = `I want more info on "${product.title}" / ${baseUrl}`;
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function productsForSection(section, catalog = getStoreCatalog()) {
    const activeProducts = visibleProducts(catalog);
    if (section.productSlugs?.length) {
      return section.productSlugs.map((slug) => activeProducts.find((product) => product.slug === slug)).filter(Boolean);
    }
    return activeProducts.slice(0, 5);
  }

  function productDetailsSection(product) {
    const images = product.detailImages?.length ? product.detailImages : product.gallery;

    return `
      <section class="product-details-panel">
        <h2>تفاصيل المنتج</h2>
        <div class="details-image-stack">
          ${images.map((image, index) => `
            <article class="details-image-block">
              <img src="${image}" alt="${escapeHtml(product.title)} - تفاصيل ${index + 1}" loading="lazy" onerror="tanjaMallImageFallback(event)" />
              ${index < images.length - 1 ? `<button class="primary-btn details-order-btn" data-action="scroll-order">اطلب الآن</button>` : ""}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function offerOption(offer, selectedId) {
    return `
      <button class="offer-option ${offer.id === selectedId ? "active" : ""}" data-action="select-offer" data-offer="${offer.id}" type="button">
        <span class="radio-dot"></span>
        <span>
          <span class="offer-name">${offer.name}</span>
          <span class="offer-note">${offer.note}</span>
        </span>
        <span class="offer-price">${money(offer.price)}</span>
      </button>
    `;
  }

  function drawers() {
    const activeCategories = visibleCategories();
    const drawerActive = state.menuOpen || state.cartOpen || state.filterOpen;
    return `
      <div class="drawer-backdrop ${drawerActive ? "active" : ""}" data-action="close-drawers"></div>
      <aside class="drawer ${state.menuOpen ? "active" : ""}" aria-label="القائمة">
        <div class="drawer-head">
          <h2>TanjaMall</h2>
          <button class="icon-button ghost" data-action="close-drawers" aria-label="إغلاق">${icons.close}</button>
        </div>
        <div class="drawer-body">
          <div class="menu-links">
            <a href="#/">الصفحة الرئيسية <span>›</span></a>
            ${activeCategories.map((category) => `<a href="#/category/${category.id}">${category.name}<span>›</span></a>`).join("")}
          </div>
        </div>
      </aside>
      <aside class="drawer ${state.cartOpen ? "active" : ""}" aria-label="السلة">
        <div class="drawer-head">
          <h2>السلة</h2>
          <button class="icon-button ghost" data-action="close-drawers" aria-label="إغلاق">${icons.close}</button>
        </div>
        <div class="drawer-body">
          ${cartMarkup()}
        </div>
      </aside>
      <aside class="drawer ${state.filterOpen ? "active" : ""}" aria-label="التصفية">
        <div class="drawer-head">
          <h2>تصفية المنتجات</h2>
          <button class="icon-button ghost" data-action="close-drawers" aria-label="إغلاق">${icons.close}</button>
        </div>
        <div class="drawer-body">
          <div class="menu-links">
            <button data-action="toggle-discounts">العروض فوق 40% <span>${state.onlyDiscounts ? "مفعلة" : "غير مفعلة"}</span></button>
            <button data-action="clear-filters">إزالة التصفية <span>×</span></button>
          </div>
        </div>
      </aside>
    `;
  }

  function cartMarkup() {
    if (!state.cart.length) {
      return `
        <div class="empty-state">السلة فارغة حاليا.</div>
        <a class="primary-btn load-more" href="#/category/lights-lamps">تصفح المنتجات</a>
      `;
    }

    return `
      ${state.cart.map((item) => {
        const product = productBySlug(item.slug);
        return `
          <div class="cart-item">
            <img src="${product.image}" alt="${escapeHtml(product.title)}" onerror="tanjaMallImageFallback(event)" />
            <div>
              <p class="cart-title">${product.title}</p>
              <div class="cart-meta">${item.qty} × ${money(item.price)}</div>
              <button class="view-all" data-action="remove-cart" data-slug="${product.slug}">حذف</button>
            </div>
          </div>
        `;
      }).join("")}
      <div class="cart-total">
        <span>المجموع</span>
        <span>${money(cartTotal())}</span>
      </div>
      <button class="primary-btn" data-action="cart-order">تأكيد طلب تجريبي</button>
    `;
  }

  function attachEvents(root = document) {
    root.querySelectorAll("[data-action]").forEach((element) => {
      element.addEventListener("click", handleClick);
    });
    root.querySelectorAll("form[data-action]").forEach((form) => {
      form.addEventListener("submit", handleSubmit);
    });
    root.querySelectorAll("select[data-action='sort-products']").forEach((select) => {
      select.addEventListener("change", (event) => {
        state.categorySort = event.target.value;
        render();
      });
    });
  }

  function handleClick(event) {
    const target = event.currentTarget;
    const action = target.dataset.action;

    if (action === "open-menu") {
      state.menuOpen = true;
      state.cartOpen = false;
      state.filterOpen = false;
      render();
    }

    if (action === "open-cart") {
      state.cartOpen = true;
      state.menuOpen = false;
      state.filterOpen = false;
      render();
    }

    if (action === "close-drawers") {
      state.cartOpen = false;
      state.menuOpen = false;
      state.filterOpen = false;
      render();
    }

    if (action === "hero") {
      state.heroIndex = Number(target.dataset.index);
      renderHomeHero();
    }

    if (action === "toggle-favorite") {
      event.preventDefault();
      toggleFavorite(target.dataset.slug);
    }

    if (action === "add-cart") {
      event.preventDefault();
      addToCart(target.dataset.slug);
    }

    if (action === "remove-cart") {
      removeFromCart(target.dataset.slug);
    }

    if (action === "gallery") {
      state.galleryIndex = Number(target.dataset.index);
      render();
    }

    if (action === "select-offer") {
      state.selectedOffer = target.dataset.offer;
      render();
    }

    if (action === "qty-minus") {
      event.preventDefault();
      state.quantity = Math.max(1, state.quantity - 1);
      render();
    }

    if (action === "qty-plus") {
      event.preventDefault();
      state.quantity += 1;
      render();
    }

    if (action === "scroll-order") {
      const field = document.getElementById("name");
      if (field) field.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (action === "toggle-filter") {
      state.filterOpen = true;
      state.menuOpen = false;
      state.cartOpen = false;
      render();
    }

    if (action === "toggle-discounts") {
      state.onlyDiscounts = !state.onlyDiscounts;
      state.filterOpen = false;
      render();
    }

    if (action === "clear-filters") {
      state.onlyDiscounts = false;
      state.filterOpen = false;
      render();
    }

    if (action === "load-more") {
      state.visibleProducts += 4;
      render();
    }

    if (action === "cart-order") {
      placeCartOrder();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const action = form.dataset.action;

    if (action === "search") {
      const q = new FormData(form).get("q").trim();
      if (q) setRoute(`/category/all?q=${encodeURIComponent(q)}`);
      return;
    }

    if (action === "fake-order") {
      placeProductOrder(form);
    }
  }

  function toggleFavorite(slug) {
    let message = "";
    if (state.favorites.has(slug)) {
      state.favorites.delete(slug);
      message = "تم حذف المنتج من المفضلة";
    } else {
      state.favorites.add(slug);
      message = "تم حفظ المنتج في المفضلة";
    }
    writeJson(STORAGE_KEYS.favorites, [...state.favorites]);
    render();
    showToast(message);
  }

  function addToCart(slug) {
    const product = productBySlug(slug);
    const activeOffers = product.offers?.length ? product.offers : offers;
    const selected = state.route.page === "product" ? activeOffers.find((offer) => offer.id === state.selectedOffer) : null;
    const qty = state.route.page === "product" ? state.quantity : 1;
    const price = selected ? selected.price : product.price;
    const existing = state.cart.find((item) => item.slug === slug && item.price === price);

    if (existing) existing.qty += qty;
    else state.cart.push({ slug, qty, price });

    writeJson(STORAGE_KEYS.cart, state.cart);
    render();
    showToast("تمت إضافة المنتج إلى السلة");
  }

  function removeFromCart(slug) {
    state.cart = state.cart.filter((item) => item.slug !== slug);
    writeJson(STORAGE_KEYS.cart, state.cart);
    render();
  }

  function placeProductOrder(form) {
    const data = Object.fromEntries(new FormData(form).entries());
    const phoneIsValid = /^0[5-7][0-9]{8}$/.test(String(data.phone).replace(/\s/g, ""));
    const message = document.getElementById("orderMessage");

    if (!phoneIsValid) {
      if (message) message.textContent = "المرجو إدخال رقم هاتف مغربي صحيح.";
      return;
    }

    const product = productBySlug(state.route.slug);
    const activeOffers = product.offers?.length ? product.offers : offers;
    const selected = activeOffers.find((offer) => offer.id === state.selectedOffer) || activeOffers[0];
    const order = {
      id: `PREVIEW-${Date.now()}`,
      source: "product-page",
      product: product.slug,
      offer: selected.id,
      qty: state.quantity,
      total: selected.price * state.quantity,
      customer: data
    };
    state.orders.push(order);
    writeJson(STORAGE_KEYS.orders, state.orders);
    form.reset();
    if (message) message.textContent = `تم تسجيل الطلب التجريبي ${order.id}.`;
    showToast("تم إرسال الطلب التجريبي بنجاح");
  }

  function placeCartOrder() {
    if (!state.cart.length) return;
    const order = {
      id: `PREVIEW-${Date.now()}`,
      source: "cart-drawer",
      items: state.cart,
      total: cartTotal()
    };
    state.orders.push(order);
    state.cart = [];
    writeJson(STORAGE_KEYS.orders, state.orders);
    writeJson(STORAGE_KEYS.cart, state.cart);
    state.cartOpen = false;
    render();
    showToast(`تم تسجيل طلب السلة ${order.id}`);
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    clearTimeout(state.toastTimer);
    if (toast) {
      toast.textContent = message;
      toast.classList.add("active");
      state.toastTimer = setTimeout(() => toast.classList.remove("active"), 2400);
    }
  }

  render();
})();
