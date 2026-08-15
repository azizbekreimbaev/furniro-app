import { Route, Routes } from "react-router";
import Footer from "./app/components/footer";
import Header from "./app/components/header";
import HomePage from "./app/screens/homePage";
import AboutUsPage from "./app/screens/aboutUsPage";
import CartPage from "./app/screens/cartPage";
import MyPage from "./app/screens/myPage";
import ProductsPage from "./app/screens/productsPage";
import ProductDetail from "./app/screens/productsPage/productDetail";
function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* SHOP */}
        <Route path="/shop" element={<ProductsPage />} />

        {/* SINGLE PRODUCT - hozircha ProductsPage */}
        <Route
          path="/product/:productId"
          element={<ProductDetail />}
        />

        {/* CART */}
        <Route path="/cart" element={<CartPage />} />

        {/* MY PAGE */}
        <Route path="/mypage" element={<MyPage />} />

        {/* ABOUT */}
        <Route path="/about" element={<AboutUsPage />} />






      </Routes>

      <Footer />
    </>
  );
}

export default App;