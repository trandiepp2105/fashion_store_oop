import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ProductPage from "./pages/ProductPage/ProductPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import OrderDetailPage from "./pages/OrderDetailPage/OrderDetailPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CategoryDetailPage from "./pages/CategoryDetailPage/CategoryDetailPage";
import UserPage from "./pages/UserPage/UserPage";
import UserInformationPage from "./pages/UserInformationPage/UserInformationPage";
import SaleManagePage from "./pages/SaleManagePage/SaleManagePage";
import CouponManagePage from "./pages/CouponManagePage/CouponManagePage";
import SaleDetailPage from "./pages/SaleDetailPage/SaleDetailPage";
function App() {
  return (
    <div className="App">
      <div className="full-screen-layout">
        <div className="wrapper-nav-bar">
          <NavBar />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/categories/:id" element={<CategoryDetailPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/products/add" element={<AddProductPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/orders/*" element={<OrderDetailPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/:id" element={<UserInformationPage />} />
            <Route path="/sales" element={<SaleManagePage />} />
            <Route path="/sales/:id" element={<SaleDetailPage />} />
            <Route path="/sales/:id/products" element={<SaleManagePage />} />
            <Route path="/coupons" element={<CouponManagePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
