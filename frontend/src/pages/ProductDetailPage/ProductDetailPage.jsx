import React, { useEffect, useState, useRef, useContext } from "react";
import "./ProductDetailPage.scss";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import ProductContainer from "../../components/ProductContainer/ProductContainer";
import HorizontalScrollBar from "../../components/HorizontalScrollBar/HorizontalScrollBar";
import productService from "../../services/productService";
import BoxGallery from "../../components/BoxGallery/BoxGallery";
import formatCurrencyVN from "../../utils/formatCurrencyVN";
import AddToCartModal from "../../components/AddToCartModal/AddToCartModal";
import ModalLogin from "../../components/ModalLogin/ModalLogin";
import { AppContext } from "../../App";
import cartSurvice from "../../services/cartSurvice";
import addTemporaryComponent from "../../utils/renderAlertPopup";

import { Link } from "react-router-dom";
import AcceptancePopup from "../../components/AcceptancePopup/AcceptancePopup";
import { toast } from "react-toastify"; // Import toast for notifications
const HOST = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setOnLoading, isUserLogin } = useContext(AppContext);
  const [product, setProduct] = useState({});
  const [productSales, setProductSales] = useState([]);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
  const [productVariantGroup, setProductVariantGroup] = useState({
    colors: [],
    sizes: {},
    images: {},
  });
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const fetchNewArrivalProducts = async () => {
    try {
      const response = await productService.getNewArrivalProducts();
      setNewArrivalProducts(response);
    } catch (error) {
      console.error("Error while fetching new arrival products", error);
      // toast.error("Error while fetching new arrival products");
    }
  };
  const handleToggleModalLogin = () => {
    setIsOpenModalLogin(!isOpenModalLogin);
  };
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size before adding to cart."); // Show error if not selected
      return;
    }

    const selectedVariant = product.variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );

    if (!selectedVariant) {
      toast.error("Selected variant is not available."); // Handle case where variant is not found
      return;
    }

    const variantId = selectedVariant.variant_id; // Get variant_id
    console.log("Product ID:", product.id); // Log product id
    console.log("Variant ID:", variantId); // Log variant id
    console.log("Quantity:", quantity); // Log quantity

    if (!isUserLogin) {
      handleToggleModalLogin();
      return;
    }

    setOnLoading(true);
    try {
      const response = await cartSurvice.addProductToCart(
        product.id,
        quantity,
        variantId
      );
      console.log("Add to cart response:", response);
      if (response) {
        // Toastify notification
        toast.success("Product added to cart successfully!");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error while adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setOnLoading(false);
    }
    // Add logic to add the variant to the cart using variantId
  };

  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const fetchProductDetails = async (id) => {
    try {
      const productData = await productService.getProductById(id);
      setProduct(productData);

      const updatedVariantGroup = { colors: [], sizes: {}, images: {} };
      productData.variants.forEach((variant) => {
        const { color, size, image_url } = variant;

        if (!updatedVariantGroup.colors.includes(color)) {
          updatedVariantGroup.colors.push(color);
          updatedVariantGroup.sizes[color] = [];
          updatedVariantGroup.images[color] = image_url;
        }

        if (!updatedVariantGroup.sizes[color].includes(size)) {
          updatedVariantGroup.sizes[color].push(size);
        }
      });

      setProductVariantGroup(updatedVariantGroup); // Update state
      console.log("productVariantGroup", updatedVariantGroup);
      console.log("product", productData);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const fetchProductSales = async (id) => {
    try {
      const salesData = await productService.getProductSales(id);
      setProductSales(salesData);
      console.log("productSales", salesData);
    } catch (error) {
      console.error("Failed to fetch product sales:", error);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchNewArrivalProducts();
    if (id) {
      fetchProductDetails(id);
      fetchProductSales(id);
    }
  }, [id]);

  return (
    <div className="page product-detail-page">
      {showAddToCartModal && <AddToCartModal />}
      {isOpenModalLogin && <ModalLogin handleClose={handleToggleModalLogin} />}
      <div className="navigator">
        <Link className="navigator-item" to="/">
          Trang chủ
        </Link>
        <Link
          className="navigator-item"
          to={`/catalogsearch/?cate=${product?.category?.id}`}
        >
          {product?.category?.name}
        </Link>
        <Link
          className="navigator-item"
          to={`/catalogsearch/?cate=${product?.category?.subcategory[0]?.id}`}
        >
          {product?.category?.subcategory[0]?.name}
        </Link>
        <Link className="navigator-item" to={`/productdetail/${product?.id}`}>
          {product?.name}
        </Link>
      </div>
      <div className="product-detail">
        <div className="images-side">
          {
            <div className="image-container">
              <img src={`${HOST}${product.image_url}`} alt="" />
            </div>
          }
          {productVariantGroup.colors.map((color, index) => (
            <div className="image-container" key={index}>
              <img
                src={`${HOST}${productVariantGroup.images[color]}`}
                alt={color}
              />
            </div>
          ))}
          {/* <div className="image-container">
            <img src="/assets/images/product-image-1.png" alt="" />
          </div>
          <div className="image-container">
            <img src="/assets/images/product-image-2.png" alt="" />
          </div>
          <div className="image-container">
            <img src="/assets/images/product-image-3.png" alt="" />
          </div>
          <div className="image-container">
            <img src="/assets/images/product-image-4.png" alt="" />
          </div> */}
        </div>
        <div className="add-to-cart-side">
          <div className="product-title">
            <h1>{product?.name}</h1>
            <span className="sku">SKU: shyteddywhite1</span>
          </div>
          <div className="product-price">
            {productSales.length > 0 &&
              (() => {
                const percentageSales = productSales.filter(
                  (sale) => sale.type === "PERCENTAGE"
                );
                if (percentageSales.length > 0) {
                  const highestPercentageSale = Math.max(
                    ...percentageSales.map((sale) => sale.value)
                  );
                  return (
                    <span className="pro-sale">-{highestPercentageSale}%</span>
                  );
                }
                return null;
              })()}
            <span className="pro-price">
              {formatCurrencyVN(
                product.discount_price || product.selling_price
              )}
            </span>
            {product.selling_price !== product.discount_price && (
              <del>{formatCurrencyVN(product.selling_price)}</del>
            )}
          </div>
          <div className="wrapper-color-variants">
            <p className="title">COLOR:</p>
            <div className="variants">
              {productVariantGroup.colors.map((color, index) => (
                <div
                  className={`variant-color-item ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedColor(color)} // Set selected color
                >
                  <img
                    src={`${HOST}${productVariantGroup.images[color]}`}
                    className="color-image"
                    alt={color}
                  />
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="wrapper-variants">
            <p className="title">SIZE:</p>
            <div className="variants">
              {selectedColor &&
                productVariantGroup.sizes[selectedColor].map((size, index) => (
                  <div
                    className={`variant-item ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedSize(size)} // Set selected size
                  >
                    <input
                      type="radio"
                      name="size"
                      id={size}
                      checked={selectedSize === size}
                      readOnly
                    />
                    <label htmlFor={size}>{size}</label>
                  </div>
                ))}
            </div>
          </div>
          <div className="selector-actions">
            <div className="quantity-area">
              <input
                type="button"
                value="-"
                onClick={handleDecreaseQuantity}
                className="qty-btn btn-left-quantity"
              />
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="quantity-selector"
              />
              <input
                type="button"
                value="+"
                onClick={handleIncreaseQuantity}
                className="qty-btn btn-right-quantity"
              />
            </div>
            <div className="wrap-addcart">
              <button
                type="button"
                id="add-to-cart"
                className="btn-addtocart"
                name="add"
                onClick={handleAddToCart} // Call handleAddToCart
              >
                Thêm vào giỏ
              </button>

              <button
                type="button"
                id="buy-now"
                className="btn-addtocart"
                name="add"
              >
                Mua ngay
              </button>
            </div>
          </div>
          <div className="product-description">
            <div className="product-detail-info">
              <div className="nav-bar">
                <div className="nav-item">
                  <p>Mô Tả</p>
                </div>
                <div className="nav-item">
                  <p>Chính sách đổi trả</p>
                </div>
                <div className="nav-item active">
                  <p>Hướng dẫn mua hàng</p>
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-pane">
                  <strong>Hướng dẫn sử dụng website của cửa hàng:</strong>
                  <p>- Các bước mua hàng tại&nbsp;Web TSUN:</p>
                  <p>
                    + Chọn sản phẩm -&gt; chọn Size sản phẩm -&gt; thêm vào giỏ
                    hàng -&gt; thanh toán
                  </p>
                  <p>
                    (Trong trường hợp các bạn mua nhiều sản phẩm, các bạn thêm
                    từng sản phẩm vào giỏ hàng, sau khi&nbsp;đã&nbsp;đủ sản phẩm
                    và số lượng , các bạn vui lòng kiểm tra thật kỹ giỏ hàng
                    và&nbsp;ấn THANH TOÁN)
                  </p>
                  <p>
                    + Thanh toán -&gt;&nbsp;Điền&nbsp;đầy&nbsp;đủ thông tin
                    -&gt; Tên -&gt; Số&nbsp;Điện Thoại -&gt;&nbsp;Địa chỉ nhận
                    hàng - &gt; Mail.
                  </p>
                  <p>
                    (&nbsp;Đơn hàng thành công là khi các
                    bạn&nbsp;điền&nbsp;đầy&nbsp;đủ thông tin và chính xác, các
                    bạn cần&nbsp;điền&nbsp;đầy&nbsp;đủ thông tin và Mail&nbsp;để
                    TSUN có thể xác nhận&nbsp;đơn hàng qua Mail cho các bạn.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-featured-product">
        <div className="product-list-title">
          <div className="title-link">NEW ARRIVAL</div>
          <p>Some description for this category</p>
        </div>
        <HorizontalScrollBar similarProducts={newArrivalProducts} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
