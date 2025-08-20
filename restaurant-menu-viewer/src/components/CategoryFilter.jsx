import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CategoryFilter({ dishes }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();
  const navigate = useNavigate();

  // Extract all unique categories from dishes
  const categories = ['All', ...new Set(dishes.map(dish => dish.category))];

  // Sync category with URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [location.search, categories]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Update URL without page reload
    const searchParams = new URLSearchParams(location.search);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto py-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            activeCategory === category
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}