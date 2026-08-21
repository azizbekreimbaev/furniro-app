export interface HeroSlide {
    id: number;
    image: string;
    eyebrow: string;
    title: string;
    highlightedText: string;
    description: string;
}

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        image: "/images/banner.png",
        eyebrow: "FURNITURE FOR MODERN LIVING",
        title: "CREATE A HOME",
        highlightedText: "THAT FEELS LIKE YOU",
        description:
            "Discover thoughtfully selected furniture designed to bring comfort, warmth and timeless character into your home.",
    },

    {
        id: 2,
        image: "/images/banner2.jpg",
        eyebrow: "TIMELESS INTERIORS",
        title: "DESIGNED FOR",
        highlightedText: "EVERYDAY LIVING",
        description:
            "Modern furniture with natural materials, soft textures and balanced forms created for spaces you will love living in.",
    },

    {
        id: 3,
        image: "/images/banner3.jpg",
        eyebrow: "COMFORT MEETS DESIGN",
        title: "MAKE EVERY SPACE",
        highlightedText: "FEEL LIKE HOME",
        description:
            "Explore furniture that combines understated elegance, everyday comfort and lasting quality.",
    },

    {
        id: 4,
        image: "/images/banner4.jpg",
        eyebrow: "NEW INTERIOR COLLECTION",
        title: "FURNITURE WITH",
        highlightedText: "A QUIET CHARACTER",
        description:
            "A curated collection inspired by warm interiors, natural tones and modern minimalist living.",
    },
    {
        id: 5,
        image: "/images/banner5.jpg",
        eyebrow: "TOP INTERIOR COLLECTION",
        title: "FURNITURE WITH",
        highlightedText: "A QUIET CHARACTER",
        description:
            "A curated collection inspired by warm interiors, natural tones and modern minimalist living.",
    },
    {
        id: 6,
        image: "/images/banner6.jpg",
        eyebrow: "INTERIOR COLLECTION",
        title: "FURNITURE WITH",
        highlightedText: "A QUIET CHARACTER",
        description:
            "A curated collection inspired by warm interiors, natural tones and modern minimalist living.",
    },
];


export interface HomeProduct {
    _id: string;
    productName: string;
    productPrice: number;
    productViews: number;
    category: string;
    image: string;
    isNew?: boolean;
}

export const trendingProductsData: HomeProduct[] = [
    {
        _id: "1",
        productName: "Luna Lounge Chair",
        productPrice: 1280,
        productViews: 6840,
        category: "Armchairs",
        image: "/images/products/chair-1.jpg",
    },
    {
        _id: "2",
        productName: "Oakline Coffee Table",
        productPrice: 890,
        productViews: 5910,
        category: "Tables",
        image: "/images/products/table-1.jpg",
    },
    {
        _id: "3",
        productName: "Sienna Modular Sofa",
        productPrice: 3290,
        productViews: 5280,
        category: "Sofas",
        image: "/images/products/sofa-1.jpg",
    },
    {
        _id: "4",
        productName: "Arco Pendant Light",
        productPrice: 640,
        productViews: 4730,
        category: "Lighting",
        image: "/images/products/light-1.jpg",
    },
    {
        _id: "5",
        productName: "Noma Accent Chair",
        productPrice: 1180,
        productViews: 4210,
        category: "Chairs",
        image: "/images/products/chair-2.jpg",
    },
    {
        _id: "6",
        productName: "Forma Side Table",
        productPrice: 720,
        productViews: 3940,
        category: "Tables",
        image: "/images/products/table-2.jpg",
    },
];





export const newProductsData: HomeProduct[] = [
    {
        _id: "7",
        productName: "Sienna Comfort Sofa",
        productPrice: 3480,
        productViews: 1260,
        category: "Sofas",
        isNew: true,
        image:
            "https://images.unsplash.com/photo-1771577067936-680c2f795e5f?auto=format&fit=crop&w=1600&q=85",
    },

    {
        _id: "8",
        productName: "Arden Oak Coffee Table",
        productPrice: 1240,
        productViews: 980,
        category: "Tables",
        isNew: true,
        image:
            "https://images.unsplash.com/photo-1758565811033-84d1365000c6?auto=format&fit=crop&w=1200&q=85",
    },

    {
        _id: "9",
        productName: "Lumi Glass Pendant",
        productPrice: 790,
        productViews: 740,
        category: "Lighting",
        isNew: true,
        image:
            "https://images.unsplash.com/photo-1766802033683-77fc32c2b6a5?auto=format&fit=crop&w=1200&q=85",
    },

    {
        _id: "10",
        productName: "Nordic Living Set",
        productPrice: 2890,
        productViews: 690,
        category: "Living Room",
        isNew: true,
        image:
            "https://images.unsplash.com/photo-1609766857120-0183863c7971?auto=format&fit=crop&w=1200&q=85",
    },
];




export const popularProductsData: HomeProduct[] = [
    {
        _id: "11",
        productName: "Nordic Cloud Sofa",
        productPrice: 3490,
        productViews: 12850,
        category: "Sofas",
        image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    },

    {
        _id: "12",
        productName: "Luna Lounge Chair",
        productPrice: 1480,
        productViews: 10720,
        category: "Armchairs",
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    },

    {
        _id: "13",
        productName: "Oslo Oak Dining Table",
        productPrice: 2280,
        productViews: 9360,
        category: "Tables",
        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
    },

    {
        _id: "14",
        productName: "Forma Living Collection",
        productPrice: 4150,
        productViews: 8210,
        category: "Living Room",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    },

    {
        _id: "15",
        productName: "Arden Comfort Sofa",
        productPrice: 3180,
        productViews: 7650,
        category: "Sofas",
        image:
            "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1600&q=85",
    },
];