// Temporary Task 7 UI data only. Replace with Supabase queries in Tasks 8, 12, and 13.
export const adminProducts = [
  {
    id: "solar-projector-120w",
    name: "بروجيكتور 120 واط بالطاقة الشمسية",
    category: "أضواء ومصابيح",
    price: "249 درهم",
    stock: 24,
    status: "PUBLISHED",
    featured: true,
    bestSeller: true
  },
  {
    id: "camp-shower-bag",
    name: "حقيبة استحمام محمولة للتخييم",
    category: "المنزل والحديقة",
    price: "349 درهم",
    stock: 3,
    status: "DRAFT",
    featured: false,
    bestSeller: false
  },
  {
    id: "car-cup-holder",
    name: "حامل الأكواب ومستلزمات السيارة",
    category: "اكسسوارات السيارات",
    price: "94 درهم",
    stock: 17,
    status: "PUBLISHED",
    featured: false,
    bestSeller: true
  }
];

export const adminCategories = [
  { id: "lights-lamps", name: "أضواء ومصابيح", products: 12, sortOrder: 1, status: "ACTIVE" },
  { id: "home-garden", name: "المنزل والحديقة", products: 9, sortOrder: 2, status: "ACTIVE" },
  { id: "car-accessories", name: "اكسسوارات السيارات", products: 7, sortOrder: 3, status: "ACTIVE" },
  { id: "toys", name: "ألعاب", products: 0, sortOrder: 4, status: "HIDDEN" }
];

export const adminOrders = [
  {
    id: "TM-1048",
    customer: "سعيد العمراني",
    phone: "0612345678",
    area: "طنجة البالية",
    total: "498 درهم",
    status: "NEW",
    createdAt: "اليوم 10:24"
  },
  {
    id: "TM-1047",
    customer: "مريم الإدريسي",
    phone: "0666123456",
    area: "مرشان",
    total: "549 درهم",
    status: "CONTACTED",
    createdAt: "اليوم 09:12"
  },
  {
    id: "TM-1046",
    customer: "يوسف العلوي",
    phone: "0677001122",
    area: "وسط المدينة",
    total: "898 درهم",
    status: "CONFIRMED",
    createdAt: "أمس 18:42"
  }
];

export const adminSettingsPreview = {
  storeName: "TanjaMall",
  phone: "0672975000",
  whatsapp: "212672975000",
  defaultCity: "Tanger",
  deliveryFee: "0 درهم",
  freeDeliveryThreshold: "500 درهم",
  metaPixelId: "123456789012345",
  tiktokPixelId: "C123ABC456DEF789",
  googleTagManagerId: "GTM-TANJAMALL"
};
