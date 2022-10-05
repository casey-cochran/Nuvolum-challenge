import { useEffect, useRef, useState } from "react";
import Product from "./componenets/Product/Product";
import axios from "axios";
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
        const response = await axios.get(
          "https://fakestoreapi.com/products?limit=5"
        );
        setProducts([...products, ...response.data]);
      } catch (err) {
        //Can set errors returned here in useState and display formatted error to users
        const newErrors = [
          "Unable to retreive data at this time, please check your request",
        ];
        setErrors([...errors, ...newErrors]);
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

  //need a button to sort from low to high based upon price, two other options with rating
  //a select dropdown button
  const [selectSort, setSelectSort] = useState('');

  const sortProducts = (sortValue) => {
    if(sortValue === 'price-low'){
      const sorted = products.sort((a,b) => a.price - b.price)
      return setProducts([...sorted])
    }else if(sortValue === 'price-high'){
      const sorted = products.sort((a,b) => b.price - a.price)
      return setProducts([...sorted])

    }else if(sortValue === 'rating-low'){
      const sorted = products.sort((a,b) => a.rating.rate - b.rating.rate)
      return setProducts([...sorted])
    }else if (sortValue === 'rating-high'){
      const sorted = products.sort((a,b) => b.rating.rate - a.rating.rate)
      return setProducts([...sorted])
    }
  }


  console.log(products)
  return (
    <div className="home-cont">
      <div className="heading-cont">
        <h1>Heading here</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          architecto neque illum eius error, totam mollitia reiciendis officiis
          quis magnam?
        </p>
        <select onChange={(e) => sortProducts(e.target.value)}>
          <option key={1} value='price-low'>Price low to high</option>
          <option key={2} value='price-high'>Price high to low</option>
          <option key={3} value='rating-low'>Rating low to high</option>
          <option key={4} value='rating-high'>Rating high to low</option>
        </select>
      </div>
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
                    currentProduct={currentProduct?.id === product.id}
                  />
                </div>
              );
            })}
          </div>
        ) : errors.length > 0 ? (
          errors.map((error, i) => (
            <div key={i} className="loading">
              {error}
            </div>
          ))
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
