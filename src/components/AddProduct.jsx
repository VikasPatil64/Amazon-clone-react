import { useState } from 'react'

function AddProduct() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && price && description) {
            console.log(name, price, description);
            fetch("http://localhost:3000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, price, description})
            }).then(() => {
                alert("Product added successfully");
                setName("");
                setPrice("");
                setDescription("");
            }).catch((err) => {
                console.error(err);
                alert("An error occurred. Please try again later.");
            });
        } else {
            alert("Please fill all the fields");
        }
    }

    const handlePriceChange = (e) => {
        console.log(e.target.value);
        setPrice(e.target.value);
    }

  return (
    <div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" value={price} onChange={handlePriceChange} required />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div>
                <input type="submit" value="Add Product" />
            </div>
        </form>
    </div>
  )
}

export default AddProduct