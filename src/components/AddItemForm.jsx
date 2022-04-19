import axios from 'axios';
import React, { useState } from 'react';

export default function AddItemform({ form, setForm }) {
  return (
    // Tabithan's impleplmentation below:
    <div>
      <input
        className="mb-2"
        placeholder="Product Name"
        onChange={(e) => {
          const currentForm = { ...form };
          currentForm.name = e.target.value;
          setForm(currentForm);
        }}
      />
      <br />
      <input
        className="mb-2"
        placeholder="Product Description"
        onChange={(e) => {
          const currentForm = { ...form };
          currentForm.description = e.target.value;
          setForm(currentForm);
        }}
      />
      <br />
      <input
        className="mb-2"
        placeholder="Product Price"
        onChange={(e) => {
          const currentForm = { ...form };
          currentForm.price = e.target.value;
          setForm(currentForm);
        }}
      />
      <br />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          axios.post('/create', form).then((response) => {
            console.log('added Item= ', response);
          });
        }}
      >
        Submit
      </button>
    </div>
  );
}

// Implementation from RA Raivat + Jiachen above of Tabithan's work.
// default function to be exported
function AddItemForm2({ setItems }) {
  const initialValues = {
    itemName: '',
    itemDescription: '',
    itemPrice: '',
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const newItem = {
      name: formValues.itemName,
      description: formValues.itemDescription,
      price: formValues.itemPrice,
    };
    axios.post('/items', newItem).then((result) => {
      console.log(result);
      setItems((items) => [...items, result.data.item]);
    });
  };

  return (
    <div className="col-sm">
      <div className="admin">
        <h2>Add an item</h2>
        <label>
          Item Name
          <input
            name="itemName"
            value={formValues.itemName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Item Description
          <input
            name="itemDescription"
            value={formValues.itemDescription}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Item Price
          <input
            name="itemPrice"
            value={formValues.itemPrice}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
