import { useEffect, useRef, useState } from "react";
import Product from "./componenets/Product/Product";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [errors, setErrors] = useState([]);
  const scrollRef = useRef(null);
  const executeScroll = () => scrollRef.current.scrollIntoView();

  useEffect(() => {
    //Fetch products on page load
    const getProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=5"
        );
        const data = await response.json();
        setProducts([...products, ...data]);
      } catch (err) {
        //Can set errors returned here in useState and display formatted error to users
      }
    };
    getProducts();
  }, []);

  const openProduct = (product) => {
    //This function sets a current product so that it is viewable
    //If there is already a current product, remove that product so that the container collapses/closes
    if (currentProduct && product.id === currentProduct.id) {
      setCurrentProduct(null);
    } else {
      //scroll function for when an item is opened, you scroll into view of its details
      executeScroll();
      setCurrentProduct(product);
    }
  };

  return (
    <div className="home-cont">
      <div className="heading-cont">
        <h1>Heading here</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          architecto neque illum eius error, totam mollitia reiciendis officiis
          quis magnam?
        </p>
      </div>
      {/* Could render errors here if there is no data returned from fetch call */}
      <div className="item-cont">
        {products.length > 0 ? (
          <div className="flex-products">
            {products?.map((product) => {
              return (
                <div
                  className="product-cont"
                  key={product.id}
                  onClick={() => openProduct(product)}
                >
                  <Product
                    product={product}
                    key={product.id}
                    currentProduct={currentProduct?.id === product.id}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loading">Please wait while your products load...</div>
        )}
        <div className={currentProduct ? "product-desc" : "product-desc hide"}>
          <div ref={scrollRef} className="desc-cont">
            <div className="product-info">
              <div className="price-rating">${currentProduct?.price}</div>
              <p>{currentProduct?.description}</p>
              <div className="price-rating">
                {currentProduct?.rating.rate} ({currentProduct?.rating.count})
              </div>
            </div>
            <div className="add-cart">
              <button
                onClick={() => alert("Not yet implemented")}
                className="submit-btn"
                type="submit"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
