import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDishes, deleteDish, addDish, updateDish } from '../services/menuservice';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiChevronLeft, FiUpload, FiSearch } from 'react-icons/fi';
import { FaSpinner, FaUtensils } from 'react-icons/fa';
import ProtectedRoute from '../components/ProtectedRoute';

const InputField = ({ label, textarea = false, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {textarea ? (
      <textarea
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        {...props}
      />
    ) : (
      <input
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        {...props}
      />
    )}
  </div>
);

const SpiceIndicator = ({ level }) => (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < level ? 'text-red-500' : 'text-gray-300'}>
        {i < level ? '🌶️' : '○'}
      </span>
    ))}
  </div>
);

export default function AdminPanel() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    ingredients: '',
    spicyLevel: 0,
    image: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const data = await getDishes();
      setDishes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const dishData = {
        ...formData,
        price: parseFloat(formData.price),
        spicyLevel: parseInt(formData.spicyLevel),
        ingredients: formData.ingredients.split(',').map(item => item.trim())
      };

      if (editingId) {
        await updateDish(editingId, dishData);
      } else {
        await addDish(dishData);
      }

      resetForm();
      await fetchDishes();
    } catch (err) {
      setError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      ingredients: '',
      spicyLevel: 0,
      image: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (dish) => {
    setFormData({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      category: dish.category,
      ingredients: dish.ingredients.join(', '),
      spicyLevel: dish.spicyLevel,
      image: dish.image
    });
    setEditingId(dish.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      try {
        await deleteDish(id);
        await fetchDishes();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const categories = [...new Set(dishes.map(dish => dish.category))];

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading menu items...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiX className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Dishes</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchDishes}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center text-gray-600 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
                  <p className="text-gray-600">Manage your restaurant's menu items</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={() => setShowForm(!showForm)}
                  className={`flex items-center justify-center px-6 py-2.5 rounded-xl transition-all font-medium ${
                    showForm 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
                  }`}
                >
                  <FiPlus className="mr-2 h-4 w-4" />
                  {showForm ? 'Cancel' : 'Add Dish'}
                </button>
              </div>
            </div>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingId ? 'Edit Dish' : 'Create New Dish'}
                </h2>
                <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InputField
                    label="Dish Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter dish name"
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <InputField
                    label="Price ($)"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Spice Level</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        name="spicyLevel"
                        min="0"
                        max="5"
                        value={formData.spicyLevel}
                        onChange={handleInputChange}
                        className="w-full accent-spice-600"
                      />
                      <SpiceIndicator level={formData.spicyLevel} />
                    </div>
                  </div>
                </div>

                <InputField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed description"
                  required
                  textarea
                  rows={3}
                />

                <InputField
                  label="Ingredients (comma separated)"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  placeholder="e.g., Tomato, Cheese, Basil"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <div className="flex gap-3">
                    <InputField
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center whitespace-nowrap"
                    >
                      <FiUpload className="mr-2" />
                      Upload
                    </button>
                  </div>
                  {formData.image && (
                    <div className="mt-3">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="h-32 w-32 object-cover rounded-xl border shadow-sm"
                        onError={(e) => {
                          e.target.src = '/placeholder-food.jpg';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-70 font-medium flex items-center"
                  >
                    {formSubmitting && <FaSpinner className="animate-spin mr-2" />}
                    {editingId ? 'Update Dish' : 'Add Dish'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Dishes Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Menu Items</h3>
              <p className="text-gray-600">{filteredDishes.length} dishes found</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Dish</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Spice</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDishes.length > 0 ? (
                    filteredDishes.map(dish => (
                      <tr key={dish.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img 
                              className="h-14 w-14 rounded-xl object-cover shadow-sm" 
                              src={dish.image || '/placeholder-food.jpg'} 
                              alt={dish.name}
                            />
                            <div>
                              <div className="font-medium text-gray-800">{dish.name}</div>
                              <div className="text-sm text-gray-600 line-clamp-1">{dish.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                            {dish.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          ${dish.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <SpiceIndicator level={dish.spicyLevel} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(dish)}
                              className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(dish.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <FaUtensils className="h-12 w-12 mb-4" />
                          <p className="text-lg font-medium text-gray-500">No dishes found</p>
                          <p className="text-gray-400 mb-4">Try adjusting your search criteria</p>
                          {searchTerm && (
                            <button
                              onClick={() => setSearchTerm('')}
                              className="text-amber-600 hover:text-amber-700 font-medium"
                            >
                              Clear search
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}