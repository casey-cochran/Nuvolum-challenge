import { useEffect, useState } from "react";
import Product from "./componenets/Product/Product";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products?limit=5");
      const data = await response.json();
      setProducts([...products, ...data]);
    };
    getProducts();

  }, []);

  const openProduct = (product) => {
    if(currentProduct && product.id === currentProduct.id){
      setCurrentProduct(null);
    }else{
      setCurrentProduct(product);
    }
  }
  // useEffect(() => {
  //   setCurrentProduct(products[0]);
  // }, [products]);

  console.log(products);
  console.log(currentProduct)

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
      <div className="item-cont">
        <div className="flex-products">
          {products?.map((product, idx) => {
            return (
              <div
                className="product-cont"
                key={product.id}
                onClick={() => openProduct(product)}
              >
                <Product product={product} key={product.id} currentProduct={currentProduct?.id === product.id && currentProduct} />
              </div>
            );
          })}
        </div>
        {currentProduct &&
        <div className="product-desc">
          <div className="desc-cont">
            <div className="description-cont">
              <div>${currentProduct?.price}</div>
              <div>{currentProduct?.description}</div>
              <div>
                {currentProduct?.rating.rate} ({currentProduct?.rating.count})
              </div>
            </div>
            <div className="add-cart">
            <button>add to cart</button>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
