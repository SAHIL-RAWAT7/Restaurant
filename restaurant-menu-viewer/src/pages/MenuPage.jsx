import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import DishCard from '../components/DishCard';
import { FiSearch, FiClock, FiStar } from 'react-icons/fi';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState('');

  const dummyDishes = [
    {
      id: 1,
      name: "Truffle Mushroom Risotto",
      price: 18.99,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1633945274309-2c16c9682a8c",
      description: "Creamy arborio rice with wild mushrooms, white truffle oil, and parmesan",
      isVegetarian: true,
      isChefSpecial: true,
      calories: 620
    },
    {
      id: 2,
      name: "Lobster Thermidor",
      price: 32.50,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d",
      description: "Lobster cooked in a rich brandy and cheese sauce, served with gratin",
      isPopular: true,
      calories: 850
    },
    {
      id: 3,
      name: "Burrata Salad",
      price: 14.99,
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a",
      description: "Fresh burrata cheese with heirloom tomatoes, basil, and balsamic glaze",
      isVegetarian: true,
      calories: 320
    },
    {
      id: 4,
      name: "Chocolate Soufflé",
      price: 12.99,
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      description: "Light and airy chocolate soufflé with a molten center, served with vanilla bean ice cream",
      isVegetarian: true,
      isChefSpecial: true,
      calories: 480
    },
    {
      id: 5,
      name: "Korean Fried Chicken",
      price: 16.99,
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1612480166399-477bcd281f5e",
      description: "Double-fried chicken wings with spicy gochujang glaze and sesame seeds",
      isPopular: true,
      spiceLevel: 3,
      calories: 720
    },
    {
      id: 6,
      name: "Beef Wellington",
      price: 36.99,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143",
      description: "Prime beef tenderloin wrapped in mushroom duxelles and puff pastry",
      isChefSpecial: true,
      calories: 920
    },
    {
      id: 7,
      name: "Avocado Toast",
      price: 10.50,
      category: "Breakfast",
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
      description: "Sourdough bread with smashed avocado, cherry tomatoes, and microgreens",
      isVegetarian: true,
      isPopular: true,
      calories: 380
    },
    {
      id: 8,
      name: "Matcha Tiramisu",
      price: 11.99,
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1562440499-64c9a111f713",
      description: "Japanese twist on classic tiramisu with matcha green tea and white chocolate",
      isVegetarian: true,
      calories: 420
    },
    {
      id: 9,
      name: "Tuna Tartare",
      price: 19.99,
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
      description: "Fresh ahi tuna with avocado, sesame oil, and crispy wonton chips",
      calories: 310
    },
    {
      id: 10,
      name: "Eggs Benedict",
      price: 13.99,
      category: "Breakfast",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae",
      description: "Poached eggs on English muffins with Canadian bacon and hollandaise",
      calories: 550
    },
    {
      id: 11,
      name: "Lamb Chops",
      price: 28.99,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1602253057119-44d745d9b860",
      description: "Grilled New Zealand lamb chops with mint pesto and roasted vegetables",
      isPopular: true,
      calories: 780
    },
    {
      id: 12,
      name: "Mango Sticky Rice",
      price: 9.99,
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1560243563-062bfc001d68",
      description: "Traditional Thai dessert with sweet coconut rice and fresh mango",
      isVegetarian: true,
      calories: 360
    },
    {
      id: 13,
      name: "French Onion Soup",
      price: 8.99,
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      description: "Caramelized onion soup with beef broth and melted gruyère cheese",
      calories: 420
    },
    {
      id: 14,
      name: "Pancake Stack",
      price: 11.50,
      category: "Breakfast",
      image: "https://images.unsplash.com/photo-1529567914305-8456b4a86a83",
      description: "Fluffy buttermilk pancakes with maple syrup and seasonal berries",
      isVegetarian: true,
      isPopular: true,
      calories: 580
    },
    {
      id: 15,
      name: "Duck Confit",
      price: 24.99,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1604908176997-125a810b7ba1",
      description: "Slow-cooked duck leg with crispy skin, served with potato gratin",
      isChefSpecial: true,
      calories: 670
    }
  ];

   const filteredDishes = dummyDishes.filter(dish => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dish.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularDishes = dummyDishes.filter(dish => dish.isPopular);
  const chefSpecials = dummyDishes.filter(dish => dish.isChefSpecial);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Savor the Flavor</h1>
          <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Discover our carefully crafted menu featuring the finest ingredients and authentic recipes
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span>Open: 11AM - 10PM</span>
            </div>
            <div className="flex items-center">
              <FiStar className="mr-2" />
              <span>4.8 ★ (256 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search dishes, ingredients, or categories..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Sections */}
        {searchTerm === '' && activeCategory === 'All' && (
          <>
            {/* Chef's Specials */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🍳 Chef's Specials</h2>
                <div className="w-12 h-1 bg-amber-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {chefSpecials.slice(0, 4).map(dish => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </div>

            {/* Popular Items */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🔥 Popular Choices</h2>
                <div className="w-12 h-1 bg-red-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {popularDishes.slice(0, 4).map(dish => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter dishes={dummyDishes} />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeCategory === 'All' ? 'All Menu Items' : activeCategory}
              {searchTerm && (
                <span className="text-amber-600"> for "{searchTerm}"</span>
              )}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredDishes.length} delicious {filteredDishes.length === 1 ? 'option' : 'options'} found
            </p>
          </div>
          
          {filteredDishes.length > 0 && (
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
              {filteredDishes.length} items
            </div>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No dishes found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No results for "${searchTerm}" in ${activeCategory}`
                : `No dishes available in ${activeCategory} category`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                window.location.search = '';
              }}
              className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors font-medium"
            >
              View All Dishes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map(dish => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {filteredDishes.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-600">{filteredDishes.length}</div>
                <div className="text-sm text-gray-600">Total Dishes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  {new Set(filteredDishes.map(d => d.category)).size}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  ${Math.min(...filteredDishes.map(d => d.price)).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">From Price</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  {filteredDishes.filter(d => d.isVegetarian).length}
                </div>
                <div className="text-sm text-gray-600">Vegetarian</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}