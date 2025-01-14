import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let productUrl = "http://localhost:3000/products";
    const products = await fetch(productUrl);
    const productJson = await products.json();
    setProducts(productJson);
  };

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
