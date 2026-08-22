import HeroSection from "./HeroSection";

import "../../css/homepage.css";
import TrendingProducts from "./TrendingProducts";
import NewProducts from "./NewProducts";
import GetInTouch from "./GetInTouch";
import VideoSection from "./VideoSection";
import PopularProductsSlider from "./PopularProductSlider";
import ProductService from "../../services/ProductService";
import { useAppDispatch } from "../../hook";
import { setNewProducts, setPopularProducts, setTrendingProducts } from "./homepageSlice";
import { useEffect } from "react";

const HomePage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        // Get data from Backend
        const productService = new ProductService()

        productService.getProducts({
            page: 1,
            limit: 4,
            order: "createdAt",
        })
            .then((data) => {
                console.log("data passed")
                dispatch(setNewProducts(data))

            })
            .catch((err) => console.log("error", err))


        productService.getProducts({
            page: 1,
            limit: 4,
            order: "productViews",
        })
            .then((data) => {
                console.log("data passed")
                dispatch(setTrendingProducts(data))

            })
            .catch((err) => console.log("error", err))


        productService.getProducts({
            page: 1,
            limit: 15,
            order: "productViews",
        })
            .then((data) => {
                console.log("data passed")
                dispatch(setPopularProducts(data))

            })
            .catch((err) => console.log("error", err))


    }, [])


    return (
        <main className="home-page">
            <HeroSection />
            <TrendingProducts />
            <NewProducts />
            <GetInTouch />
            <VideoSection />
            <PopularProductsSlider />
        </main>
    );
};

export default HomePage;