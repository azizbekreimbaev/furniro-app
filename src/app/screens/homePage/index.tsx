import HeroSection from "./HeroSection";

import "../../css/homepage.css";
import TrendingProducts from "./TrendingProducts";
import NewProducts from "./NewProducts";
import GetInTouch from "./GetInTouch";
import VideoSection from "./VideoSection";
import PopularProductsSlider from "./PopularProductSlider";

const HomePage = () => {
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