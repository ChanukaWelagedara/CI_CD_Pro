import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './editItem.css'; // Import the same CSS file used in AddItem

const EditInstrument = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [addDate, setDate] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (itemId) {
      axios
        .get(`http://localhost:5555/instruments/${itemId}`)
        .then((response) => {
          const instrumentData = response.data;
          setName(instrumentData.name);
          setPrice(instrumentData.price);
          setCategory(instrumentData.category);
          setCondition(instrumentData.condition);
          setDate(instrumentData.addDate);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('An error happened. Please check the console', error);
        });
    }
  }, [itemId]);

  const handleEditInstrument = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('addDate', addDate);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    setLoading(true);
    axios
      .put(`http://localhost:5555/instruments/${itemId}`, formData)
      .then((response) => {
        setLoading(false);
        console.log('Edit successful:', response.data);
        window.alert('Edit successful!');
        navigate('/account');
      })
      .catch((error) => {
        setLoading (false);
        console.error('Error:', error);
        window.alert('Edit failed. Please check the console for details.');
      });
  };

  return (
    <div style={{ backgroundImage: 'url(/Back.png)', width:'100%', height:'2200px'  }}>
      <div className="container"> 
        <h1>Edit Instrument</h1>
        {loading ? <p>Loading...</p> : ''}
        <div className="label-input"> 
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="label-input"> 
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="label-input">
          <label>Category:</label>
          <select
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
        <div className="label-input"> 
          <label>Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>
        <div className="label-input">
          <label>Date</label>
          <input
            type="date"
            value={addDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedImage(file);
              setImagePreview(URL.createObjectURL(file));
            }}
            required
          />
        </div>
        {imagePreview && <img src={imagePreview} alt="Preview" width="100" />}
        <button onClick={handleEditInstrument}>Save</button>
      </div>
    </div>
  );
};

export default EditInstrument;
