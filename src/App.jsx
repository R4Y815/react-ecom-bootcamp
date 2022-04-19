import React, { useState } from 'react';
import axios from 'axios';

import Cart from './components/Cart.jsx';
import Items from './components/Items.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import AddItemForm from './components/AddItemForm.jsx';

export default function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState();

  // form to add custom new item to the table.
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const addToCart = (item, quantity) => {
    const cartItem = { quantity, ...item };
    const currentCart = [...cart];
    let duplicate = false;

    currentCart.forEach((x) => {
      if (x.name === cartItem.name) {
        x.quantity = Number(x.quantity) + Number(cartItem.quantity);
        x.price = Number(x.price) + (Number(cartItem.price) * Number(cartItem.quantity));
        duplicate = true;
      }
    });
    if (duplicate) {
      setCart(currentCart);
    } else {
      setCart([...cart, cartItem]);
    }
  };

  const setItemDetail = (itemIndex) => {
    setSelectedItemIndex(itemIndex);
  };

  const getItems = () => {
    axios.get('/items').then((result) => {
      console.log(result);
      setItems(result.data.items);
    });
  };

  const selectedItem = items[selectedItemIndex];

  return (
    <div className="container">
      <div className="row">
        <h1 className="page-title">Wow Shopping!</h1>
        <Items items={items} setItemDetail={setItemDetail} />
        {items.length === 0 && (
          <button type="button" onClick={getItems}>
            Get Items
          </button>
        )}
        <ItemDetail item={selectedItem} addToCart={addToCart} />
        <Cart items={cart} />
      </div>
      <div className="row">
        <AddItemForm form={form} setForm={setForm} />
      </div>
    </div>
  );
}
