import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
import "./Product.css";

function Product() {
  const [pID, setPID] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(0);
  const [products, setProducts] = useState([]);
  const [originalID, setOriginalID] = useState('');

  const productCollectionRef = collection(db, "Products");

  const getItems = async () => {
    const items = await getDocs(productCollectionRef);
    setProducts(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleClear = () => {
      setName("");
      setPID("");
      setPrice("");
      setQty("");
  }

  const handleUpdate = () => {
    const newData = {
      Name: name,
      Price: price,
      Qty: qty,
    };
    const specProduct = doc(db, "Products", originalID);
    updateDoc(specProduct, newData)
      .then(alert("done"))
      .catch((e) => console.log(e.message));

      getItems();
  };

  const handleSearch = () => {
    products.map((pro) => {
      if (pro.PID === pID) {
        setName(pro.Name);
        setPrice(pro.Price);
        setQty(pro.Qty);
        setOriginalID(pro.id)
      }
    });
  };

  const handleSave = () => {
    if (pID >= 0 && name !== "" && price !== "" && qty >= 0) {
      const data = {
        Name: name,
        Price: price,
        Qty: qty,
        PID: pID,
      };

      addDoc(productCollectionRef, data, pID);
      alert("Done!");
    } else {
      alert("Please Fill Details!");
    }
  };

  return (
    <div className="productMain">
      <text>Product</text>
      <span>Product ID</span>
      <input
        type={"number"}
        value={pID}
        onChange={(e) => {
          setPID(e.target.value);
        }}
      />
      <span>Product Name</span>
      <input
        type={"text"}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <span>Price</span>
      <input
        type={"text"}
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <span>Qty</span>
      <input
        type={"text"}
        value={qty}
        onChange={(e) => {
          setQty(e.target.value);
        }}
      />
      <div className="buttonSet">
        <button
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </button>
        <button
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            handleUpdate();
          }}
        >
          Update
        </button>
        <button onClick={() => {handleClear()}}>Clear</button>
      </div>
    </div>
  );
}

export default Product;
