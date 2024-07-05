import React, { useState } from 'react';
import './Additem.css';

const AddItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('new');
  const [addDate, setAddDate] = useState('');
  const [image, setImage] = useState(null);
//  const [user, setUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('addDate', addDate);
    formData.append('image', image);
    formData.append('user', JSON.parse(localStorage.getItem("userDetails"))._id);

    try {
      const response = await fetch('http://localhost:5555/instruments', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        // Item created successfully
        alert('Item created successfully');
        // Refresh the page
        window.location.reload();
      } else {
        const data = await response.json();
        console.error('Error:', data.message);
        alert('Item creation failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Item creation failed');
    }
  };

  return (
    <div style={{ backgroundImage: 'url(/Back.png)', width:'100%', height:'2200px'  }}>
    <div className="container" >
     
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Upload an Instrument</h1>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            className="form-control"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Guitar">Guitar</option>
            <option value="Drums">Drums</option>
            <option value="Electronic Instrument">Electronic Instrument</option>
            <option value="Brass Instrument">Brass Instrument</option>
            <option value="Audio Equipment">Audio Equipment</option>
            <option value="String Instruments">String Instruments</option>
            <option value="Accessories">Accessories</option>
            <option value="KeyBoard">KeyBoard</option>
          </select>
        </div>
        <div className="form-group">
          <label>Condition:</label>
          <select
            className="form-control"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>
        <div className="form-group">
          <label>Add Date:</label>
          <input
            className="form-control"
            type="date"
            value={addDate}
            onChange={(e) => setAddDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      
      </form>
    </div>
    </div>
  );
};

export default AddItem;
