import { useState } from 'react';

export default function AdminForm({ onAddDish }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    category: 'Appetizers',
    description: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Drinks'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.price || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    // Create new dish object
    const newDish = {
      ...formData,
      id: Date.now(),
      price: parseFloat(formData.price).toFixed(2)
    };

    // Call parent handler
    onAddDish(newDish);

    // Reset form and show success
    setFormData({
      name: '',
      image: '',
      price: '',
      category: 'Appetizers',
      description: ''
    });
    setSuccess('Dish added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>
      
      {error && <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="p-2 bg-green-100 text-green-700 rounded">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Dish Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price*</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category*</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border rounded"
        />
      </div>

      {formData.image && (
        <div className="mt-2">
          <p className="mb-1 font-medium">Image Preview:</p>
          <img 
            src={formData.image} 
            alt="Preview" 
            className="h-32 object-cover rounded border"
          />
        </div>
      )}

      <button 
        type="submit" 
        className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 mt-4"
      >
        Add Dish
      </button>
    </form>
  );
}