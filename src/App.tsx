import { NavLink, Route, Routes } from 'react-router';
import './App.css'
import HomePage from './app/screens/homePage';
import ProductsPage from './app/screens/productsPage';
import AboutUsPage from './app/screens/aboutUsPage';
import { Header } from './app/components/header';

function App() {

  return (
    <>

      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/product" end>
          Products
        </NavLink>
        <NavLink to="/aboutus" end>About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
      </Routes>

    </>
  )
}

export default App
