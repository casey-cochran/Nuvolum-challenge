import { useEffect, useRef, useState } from 'react';

function App() {

  useEffect(() => {
    const getProducts = async() => {
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      const data = await response.json();
      console.log(data)
    }
    getProducts();
  },[])
  return (
    <div>
      hello
    </div>
  );
}

export default App;
