export interface ShopProduct {
    _id: string;
    productName: string;
    productPrice: number;
    productViews: number;
    productCategory: string;
    productDescription: string;
    productImage: string;
    isNew?: boolean;
}

export const shopProducts: ShopProduct[] = [
    {
        _id: "1",
        productName: "Sienna Modular Sofa",
        productPrice: 3290,
        productViews: 5280,
        productCategory: "Sofas",
        productDescription:
            "Generous proportions and soft upholstery designed for relaxed modern living.",
        productImage:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
        isNew: true,
    },
    {
        _id: "2",
        productName: "Luna Lounge Chair",
        productPrice: 1280,
        productViews: 6840,
        productCategory: "Chairs",
        productDescription:
            "A sculptural lounge chair combining warm textures with everyday comfort.",
        productImage:
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
    },
    {
        _id: "3",
        productName: "Oakline Coffee Table",
        productPrice: 890,
        productViews: 5910,
        productCategory: "Tables",
        productDescription:
            "Natural oak, clean proportions and a timeless form for modern interiors.",
        productImage:
            "https://images.unsplash.com/photo-1532372320572-cda25653a694?auto=format&fit=crop&w=1200&q=85",
    },
    {
        _id: "4",
        productName: "Arco Pendant Light",
        productPrice: 640,
        productViews: 4730,
        productCategory: "Lighting",
        productDescription:
            "A warm statement pendant bringing subtle character and ambient light.",
        productImage:
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85",
        isNew: true,
    },
    {
        _id: "5",
        productName: "Noma Accent Chair",
        productPrice: 1180,
        productViews: 4210,
        productCategory: "Chairs",
        productDescription:
            "Refined lines and inviting upholstery made for quiet corners and reading spaces.",
        productImage:
            "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=1200&q=85",
    },
    {
        _id: "6",
        productName: "Forma Side Table",
        productPrice: 720,
        productViews: 3940,
        productCategory: "Tables",
        productDescription:
            "A compact side table with understated proportions and natural character.",
        productImage:
            "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=85",
    },
    {
        _id: "7",
        productName: "Nordic Cloud Sofa",
        productPrice: 3490,
        productViews: 12850,
        productCategory: "Sofas",
        productDescription:
            "Deep comfort, generous cushions and a calm silhouette for contemporary living.",
        productImage:
            "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85",
        isNew: true,
    },
    {
        _id: "8",
        productName: "Aster Dining Chair",
        productPrice: 760,
        productViews: 3220,
        productCategory: "Chairs",
        productDescription:
            "A balanced dining chair designed around natural materials and everyday use.",
        productImage:
            "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85",
    },
];