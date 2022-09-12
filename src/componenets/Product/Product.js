import "./Product.css";
import { FaChevronCircleLeft } from "react-icons/fa";

const Product = ({ product, currentProduct }) => {
  return (
      <div className="single-product">
        <div>
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-title">
          <h3>{product.title}</h3>
        </div>
        <div>
          <FaChevronCircleLeft
            className={currentProduct ? "chevron down" : "chevron"}
          />
        </div>
      </div>
  );
};

export default Product;
