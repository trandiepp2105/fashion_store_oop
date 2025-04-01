import "./App.scss";
import "./styles/styles.scss";
import { Route, Routes } from "react-router-dom";

import { useLocation } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import BannerTop from "./components/BannerTop/BannerTop";
import { useRef, useEffect, useState, createContext } from "react";
import Footer from "./components/Footer/Footer";
import BackToTopButton from "./components/BackToTopButton/BackToTopButton";
import HomePage from "./pages/HomePage/HomePage";
// import ProductDetailPage from "./pages/User/ProductDetailPage/ProductDetailPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage/RecoverPasswordPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import "./styles/_variables.css";
import CatalogSearchPage from "./pages/CatalogSearchPage/CatalogSearchPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import isLogin from "./utils/checkLoginStatus";
import cartSurvice from "./services/cartSurvice";
import WaitingOverlay from "./components/WaitingOverlay/WaitingOverlay";
import WarningPopup from "./components/WarningPopup/WarningPopup";
export const AppContext = createContext();

function App() {
  const headerRef = useRef(null);
  const appRef = useRef(null);
  const footerRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const location = useLocation(); // Hook để lấy thông tin đường dẫn hiện tại
  const [isHideHeaderFooter, setIsHideHeaderFooter] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [onLoading, setOnLoading] = useState(false);
  const getShoppingCart = async () => {
    try {
      const response = await cartSurvice.getShoppingCart();

      setShoppingCart(response || []);
    } catch (error) {
      console.error("Error while fetching shopping cart", error);
    }
  };

  useEffect(() => {
    console.log("shoppingCart", shoppingCart);
  }, [shoppingCart]);

  useEffect(() => {
    const loginStatus = isLogin();
    setIsUserLogin(loginStatus);
    getShoppingCart();
    console.log("isUserLogin", loginStatus);
    if (headerRef.current) {
      const headerElement = headerRef.current;
      const height = headerElement.offsetHeight;
      // const rect = headerRef.current.getBoundingClientRect();

      setHeaderHeight(height);
    }
    if (footerRef.current) {
      const footerElement = footerRef.current;
      const height = footerElement.offsetHeight;
      setFooterHeight(height);
    }
    const handleScroll = () => {
      if (appRef.current) {
        const rect = appRef.current.getBoundingClientRect();
        setPosition({ top: rect.top, left: rect.left });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isUserLogin) {
      getShoppingCart();
      return;
    }

    setShoppingCart([]);
  }, [isUserLogin]);

  const listHideHeaderFooter = ["/signup", "/login", "/recover-password"];
  useEffect(() => {
    if (listHideHeaderFooter.includes(location.pathname)) {
      setIsHideHeaderFooter(true);
    } else {
      setIsHideHeaderFooter(false);
    }
  }, [location]);

  const [isShowWarningPopup, setIsShowWarningPopup] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isUserLogin,
        setIsUserLogin,
        shoppingCart,
        setShoppingCart,
        onLoading,
        setOnLoading,
        setIsShowWarningPopup,
      }}
    >
      <div className="App" ref={appRef}>
        {onLoading && <WaitingOverlay />}
        {isShowWarningPopup && (
          <WarningPopup handleClose={() => setIsShowWarningPopup(false)} />
        )}
        <div
          className="heaeder-layout"
          style={{ marginTop: `${headerHeight}px` }}
        >
          <header id="header" className="header" ref={headerRef}>
            <BannerTop />
            <NavBar />
          </header>
        </div>
        <div
          className="main-content"
          // style={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
          // style={
          //   location.pathname === "/"
          //     ? {
          //         background: `url("/assets/images/noel-background.png") left top / 100% no-repeat fixed`,
          //       }
          //     : {}
          // }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/product" element={<ProductDetailPage />} /> */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recover-password" element={<RecoverPasswordPage />} />
            <Route
              path="/productdetail/:slug"
              element={<ProductDetailPage />}
            />
            <Route path="/catalogsearch/" element={<CatalogSearchPage />} />
            {/* <Route path="/cate/" element={<CatalogSearchPage />} /> */}

            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </div>
        {!isHideHeaderFooter && (
          <div className="footer" ref={footerRef}>
            <Footer />
          </div>
        )}

        <BackToTopButton
          handleClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          show={-position.top > headerHeight}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
