
export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    subcategories: [
      { id: "audio", name: "Audio & Music Systems" },
      { id: "cables", name: "Cables, Chargers, Adapters & Connectors" },
      { id: "camera", name: "Camera & Accessories" },
      { id: "computer", name: "Computer, Hardware & Accessories" },
      { id: "content-creating", name: "Content Creating Gadgets" },
      { id: "earphones", name: "Earphones & Headphones" },
      { id: "networking", name: "Networking Products" },
      { id: "phone-covers", name: "Phone Covers" },
      { id: "phones", name: "Phones & Tablets" },
      { id: "phone-parts", name: "Phone Spare Parts" },
      { id: "security", name: "Security & Surveillance" },
      { id: "smartwatches", name: "Smartwatches" },
      { id: "tv", name: "TV & Radio" }
    ]
  },
  {
    id: "home",
    name: "Home",
    subcategories: [
      { id: "appliances", name: "Appliances" },
      { id: "accessories", name: "Home Accessories" },
      { id: "containers", name: "Containers & Decor" },
      { id: "kitchenware", name: "Kitchenware & Cookware" },
      { id: "toys", name: "Toys" },
      { id: "pet", name: "Pet Products" }
    ]
  },
  {
    id: "fashion",
    name: "Fashion",
    subcategories: [
      { id: "baby", name: "Baby Shop" },
      { id: "bags", name: "Bags" },
      { id: "beddings", name: "Beddings" },
      { id: "belts", name: "Belts & Suspenders" },
      { id: "carpet", name: "Carpet & Rags" },
      { id: "curtains", name: "Curtains & Accessories" },
      { id: "dummies", name: "Dummies & Displays" },
      { id: "eyewear", name: "Eyewear" },
      { id: "head", name: "Head Coverings" },
      { id: "jewelry", name: "Jewelry" },
      { id: "men-clothes", name: "Men Clothes" },
      { id: "men-shoes", name: "Men Shoes" },
      { id: "mtumba", name: "Mtumba Bales" },
      { id: "sportswear", name: "Sportswear" },
      { id: "watches", name: "Watches" },
      { id: "women-clothes", name: "Women Clothes" },
      { id: "women-shoes", name: "Women Shoes" },
      { id: "other-apparel", name: "Other Apparel" }
    ]
  },
  {
    id: "beauty",
    name: "Beauty",
    subcategories: [
      { id: "bath", name: "Bath & Body" },
      { id: "fragrance", name: "Fragrance" },
      { id: "hair", name: "Hair" },
      { id: "makeup", name: "Make-up" },
      { id: "salon", name: "Salon Equipment" },
      { id: "sexual", name: "Sexual Wellness" },
      { id: "skincare", name: "Skincare" },
      { id: "tools", name: "Tools & Accessories" },
      { id: "vitamins", name: "Vitamins & Supplements" }
    ]
  },
  {
    id: "textile",
    name: "Textile, Fabrics & Yarns",
    subcategories: [
      { id: "cloth", name: "Cloth Fabrics, Garments & Accessories" },
      { id: "sofa", name: "Sofa materials & Accessories" },
      { id: "yarns", name: "Yarns & Tools" },
      { id: "machines", name: "Sewing Machines" }
    ]
  },
  {
    id: "motor",
    name: "Motor & Bicycle Spare Parts",
    subcategories: [
      { id: "vehicle-parts", name: "Motorvehicle Spare Parts" },
      { id: "engine-oil", name: "Engine Oil, Coolants & Lubricants" },
      { id: "pimping-parts", name: "Pimping Parts & Accessories" },
      { id: "tires", name: "Tires" },
      { id: "motorcycle-parts", name: "Motorcycle Spare Parts" },
      { id: "motorcycle-oil", name: "Engine Oil, Coolants & Lubricants" },
      { id: "motorcycle-accessories", name: "Pimping Parts & Accessories" },
      { id: "motorcycle-tires", name: "Tires" },
      { id: "bicycles", name: "Bicycles" },
      { id: "bicycle-parts", name: "Bicycles Spare Parts" }
    ]
  },
  {
    id: "construction",
    name: "Construction",
    subcategories: [
      { id: "blocks", name: "Building Blocks, Sand & Ballast" },
      { id: "boards", name: "Boards" },
      { id: "ceiling", name: "Ceiling" },
      { id: "doors", name: "Doors & Locks" },
      { id: "glazing", name: "Glazing" },
      { id: "paint", name: "Paint & Tools" },
      { id: "plumbing", name: "Plumbing" },
      { id: "sanitary", name: "Sanitary" },
      { id: "fittings", name: "Fittings & Accessories" }
    ]
  },
  {
    id: "electricals",
    name: "Electricals",
    subcategories: [
      { id: "automatics", name: "Automatics & Control" },
      { id: "cables", name: "Cables & Wires" },
      { id: "heating", name: "Heating & Ventilation" },
      { id: "industrial", name: "Industrial Products" },
      { id: "installation", name: "Installation" },
      { id: "insulating", name: "Insulating Materials" },
      { id: "lighting", name: "Lighting" },
      { id: "lightning", name: "Lightning Protection" },
      { id: "renewable", name: "Renewable Energy" },
      { id: "smart", name: "Smart Products" },
      { id: "tools", name: "Tools" },
      { id: "workwear", name: "Work Wear & Accessories" }
    ]
  },
  {
    id: "juakali",
    name: "Juakali",
    subcategories: [
      { id: "carts", name: "Carts, Trolleys & Wheelbarrows" },
      { id: "kitchen", name: "Kitchen Equipment" },
      { id: "boxes", name: "Metal Boxes" },
      { id: "poultry", name: "Poultry" },
      { id: "tents", name: "Tents" },
      { id: "other-tools", name: "Other Tools & Equipment" }
    ]
  },
  {
    id: "office",
    name: "Office & School Supplies",
    subcategories: [
      { id: "branding", name: "Branding" },
      { id: "furniture", name: "Furniture & Equipment" },
      { id: "stationeries", name: "Stationeries" },
      { id: "uniforms", name: "Uniforms" },
      { id: "printing", name: "Printing" }
    ]
  },
  {
    id: "packaging",
    name: "Packaging",
    subcategories: [
      { id: "bottles", name: "Bottles & Jars" },
      { id: "boxes", name: "Boxes" },
      { id: "films", name: "Films, Foils & Bubble Wraps" },
      { id: "gift-bags", name: "Gift Bags" },
      { id: "gunny", name: "Gunny Bags" },
      { id: "khaki", name: "Khaki Bags" },
      { id: "kiondo", name: "Kiondo" },
      { id: "moulds", name: "Moulds" },
      { id: "net-rolls", name: "Net Rolls" },
      { id: "nonwoven", name: "Non-woven Bags" },
      { id: "punnets", name: "Punnets & Disposable Utensils" },
      { id: "tapes", name: "Tapes, Twines & Bands" },
      { id: "trays", name: "Trays" }
    ]
  },
  {
    id: "farm",
    name: "Farm Produce",
    subcategories: [
      { id: "cereals", name: "Cereals" },
      { id: "legumes", name: "Legumes" },
      { id: "nuts", name: "Nuts & Starch" },
      { id: "fruits", name: "Fruits" },
      { id: "spices", name: "Spices" }
    ]
  },
  {
    id: "beverage",
    name: "Beverage",
    subcategories: [
      { id: "beer", name: "Beer, Wines & Spirits" },
      { id: "juice", name: "Juice" },
      { id: "soda", name: "Soda" },
      { id: "water", name: "Water" }
    ]
  },
  {
    id: "machinery",
    name: "Machinery & Tools",
    subcategories: []
  },
  {
    id: "shop",
    name: "Shop Supplies",
    subcategories: []
  },
  {
    id: "pharma",
    name: "Pharmaceuticals",
    subcategories: []
  },
  {
    id: "agrovet",
    name: "Agro-vet",
    subcategories: []
  }
];

export const getAllCategories = (): Category[] => {
  return categories;
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getAllSubcategories = (): SubCategory[] => {
  return categories.flatMap(category => category.subcategories);
};

export const getSubcategoriesByCategoryId = (categoryId: string): SubCategory[] => {
  const category = getCategoryById(categoryId);
  return category ? category.subcategories : [];
};
