import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiStar, FiClock, FiHeart } from 'react-icons/fi'
import { IoMdFlame } from 'react-icons/io'
import { toast } from 'react-toastify'

// Import the dummy data directly (or you can move this to a shared file)
const dummyDishes = [
  {
    id: 1,
    name: "Truffle Mushroom Risotto",
    price: 18.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1633945274309-2c16c9682a8c",
    description: "Creamy arborio rice with wild mushrooms, white truffle oil, and parmesan",
    ingredients: ["Arborio Rice", "Wild Mushrooms", "White Truffle Oil", "Parmesan", "Vegetable Stock"],
    isVegetarian: true,
    isChefSpecial: true,
    calories: 620,
    spicyLevel: 0,
    prepTime: 25
  },
  {
    id: 2,
    name: "Lobster Thermidor",
    price: 32.50,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d",
    description: "Lobster cooked in a rich brandy and cheese sauce, served with gratin",
    ingredients: ["Lobster", "Brandy", "Gruyère Cheese", "Cream", "Butter", "Shallots"],
    isPopular: true,
    calories: 850,
    spicyLevel: 1,
    prepTime: 35
  },
  {
    id: 3,
    name: "Burrata Salad",
    price: 14.99,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a",
    description: "Fresh burrata cheese with heirloom tomatoes, basil, and balsamic glaze",
    ingredients: ["Burrata Cheese", "Heirloom Tomatoes", "Fresh Basil", "Balsamic Glaze", "Olive Oil"],
    isVegetarian: true,
    calories: 320,
    spicyLevel: 0,
    prepTime: 10
  },
  {
    id: 4,
    name: "Chocolate Soufflé",
    price: 12.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    description: "Light and airy chocolate soufflé with a molten center, served with vanilla bean ice cream",
    ingredients: ["Dark Chocolate", "Eggs", "Sugar", "Butter", "Vanilla Ice Cream"],
    isVegetarian: true,
    isChefSpecial: true,
    calories: 480,
    spicyLevel: 0,
    prepTime: 20
  },
  {
    id: 5,
    name: "Korean Fried Chicken",
    price: 16.99,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1612480166399-477bcd281f5e",
    description: "Double-fried chicken wings with spicy gochujang glaze and sesame seeds",
    ingredients: ["Chicken Wings", "Gochujang", "Sesame Seeds", "Garlic", "Ginger", "Soy Sauce"],
    isPopular: true,
    calories: 720,
    spicyLevel: 3,
    prepTime: 30
  },
  {
    id: 6,
    name: "Beef Wellington",
    price: 36.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143",
    description: "Prime beef tenderloin wrapped in mushroom duxelles and puff pastry",
    ingredients: ["Beef Tenderloin", "Mushrooms", "Puff Pastry", "Prosciutto", "Dijon Mustard"],
    isChefSpecial: true,
    calories: 920,
    spicyLevel: 1,
    prepTime: 45
  },
  {
    id: 7,
    name: "Avocado Toast",
    price: 10.50,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
    description: "Sourdough bread with smashed avocado, cherry tomatoes, and microgreens",
    ingredients: ["Sourdough Bread", "Avocado", "Cherry Tomatoes", "Microgreens", "Lemon Juice"],
    isVegetarian: true,
    isPopular: true,
    calories: 380,
    spicyLevel: 0,
    prepTime: 8
  },
  {
    id: 8,
    name: "Matcha Tiramisu",
    price: 11.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1562440499-64c9a111f713",
    description: "Japanese twist on classic tiramisu with matcha green tea and white chocolate",
    ingredients: ["Matcha Powder", "Mascarpone", "Ladyfingers", "White Chocolate", "Eggs"],
    isVegetarian: true,
    calories: 420,
    spicyLevel: 0,
    prepTime: 15
  },
  {
    id: 9,
    name: "Tuna Tartare",
    price: 19.99,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
    description: "Fresh ahi tuna with avocado, sesame oil, and crispy wonton chips",
    ingredients: ["Ahi Tuna", "Avocado", "Sesame Oil", "Wonton Chips", "Soy Sauce", "Lime"],
    calories: 310,
    spicyLevel: 2,
    prepTime: 12
  },
  {
    id: 10,
    name: "Eggs Benedict",
    price: 13.99,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae",
    description: "Poached eggs on English muffins with Canadian bacon and hollandaise",
    ingredients: ["Eggs", "English Muffins", "Canadian Bacon", "Hollandaise Sauce", "Butter"],
    calories: 550,
    spicyLevel: 0,
    prepTime: 18
  },
  {
    id: 11,
    name: "Lamb Chops",
    price: 28.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1602253057119-44d745d9b860",
    description: "Grilled New Zealand lamb chops with mint pesto and roasted vegetables",
    ingredients: ["Lamb Chops", "Mint", "Garlic", "Olive Oil", "Rosemary", "Seasonal Vegetables"],
    isPopular: true,
    calories: 780,
    spicyLevel: 1,
    prepTime: 25
  },
  {
    id: 12,
    name: "Mango Sticky Rice",
    price: 9.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1560243563-062bfc001d68",
    description: "Traditional Thai dessert with sweet coconut rice and fresh mango",
    ingredients: ["Sticky Rice", "Mango", "Coconut Milk", "Sugar", "Sesame Seeds"],
    isVegetarian: true,
    calories: 360,
    spicyLevel: 0,
    prepTime: 10
  },
  {
    id: 13,
    name: "French Onion Soup",
    price: 8.99,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    description: "Caramelized onion soup with beef broth and melted gruyère cheese",
    ingredients: ["Onions", "Beef Broth", "Gruyère Cheese", "Thyme", "Butter", "Baguette"],
    calories: 420,
    spicyLevel: 0,
    prepTime: 40
  },
  {
    id: 14,
    name: "Pancake Stack",
    price: 11.50,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1529567914305-8456b4a86a83",
    description: "Fluffy buttermilk pancakes with maple syrup and seasonal berries",
    ingredients: ["Buttermilk", "Flour", "Eggs", "Maple Syrup", "Seasonal Berries", "Butter"],
    isVegetarian: true,
    isPopular: true,
    calories: 580,
    spicyLevel: 0,
    prepTime: 15
  },
  {
    id: 15,
    name: "Duck Confit",
    price: 24.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1604908176997-125a810b7ba1",
    description: "Slow-cooked duck leg with crispy skin, served with potato gratin",
    ingredients: ["Duck Leg", "Potatoes", "Garlic", "Thyme", "Duck Fat", "White Wine"],
    isChefSpecial: true,
    calories: 670,
    spicyLevel: 1,
    prepTime: 50
  }
];

export default function DishDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchDish = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundDish = dummyDishes.find(d => d.id === parseInt(id));
        if (foundDish) {
          setDish(foundDish);
        } else {
          setError('Dish not found');
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDish()
  }, [id])

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${dish.name} to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.info(!isFavorite ? 'Added to favorites!' : 'Removed from favorites!', {
      position: "top-right",
      autoClose: 1500,
    });
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-96 w-full max-w-4xl bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        <h3 className="font-bold mb-2">Error loading dish details</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  if (!dish) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dish Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the dish you're looking for.</p>
        <button
          onClick={() => navigate('/menu')}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  )

  // Get recommended dishes (same category, excluding current dish)
  const recommendedDishes = dummyDishes
    .filter(d => d.category === dish.category && d.id !== dish.id)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-amber-600 mb-6 transition-colors"
      >
        <FiArrowLeft className="mr-2" />
        Back to Menu
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 relative">
            <img 
              src={dish.image || '/placeholder.png'} 
              alt={dish.name}
              className="w-full h-full max-h-[500px] object-cover"
            />
            <button
              onClick={handleToggleFavorite}
              className={`absolute top-4 right-4 p-2 rounded-full ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-white text-gray-400'} shadow-md hover:scale-110 transition-all`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FiHeart className={isFavorite ? "fill-current" : ""} />
            </button>
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <FiStar className="text-yellow-500 mr-1" />
              <span>4.8 (120)</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 md:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{dish.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    {dish.category}
                  </span>
                  {dish.spicyLevel > 0 && (
                    <span className="flex items-center text-sm font-medium">
                      <IoMdFlame className="text-red-500 mr-1" />
                      {Array(dish.spicyLevel).fill('').map((_, i) => (
                        <span key={i} className="text-red-500">•</span>
                      ))}
                      {['Mild', 'Medium', 'Hot', 'Extra Hot', 'Extreme'][dish.spicyLevel - 1]}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-2xl font-bold text-amber-600">
                ${dish.price.toFixed(2)}
              </div>
            </div>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{dish.description}</p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ingredient, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              {dish.isVegetarian && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Vegetarian
                </span>
              )}
              
              <div className="flex items-center text-gray-500">
                <FiClock className="mr-1" />
                <span className="text-sm">Prep time: ~{dish.prepTime} minutes</span>
              </div>

              {dish.calories && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {dish.calories} cal
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-700 font-medium">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex-1 max-w-xs ml-4"
              >
                Add to Cart (${(dish.price * quantity).toFixed(2)})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      {recommendedDishes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedDishes.map(recommendedDish => (
              <div key={recommendedDish.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={recommendedDish.image} 
                  alt={recommendedDish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{recommendedDish.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{recommendedDish.description.slice(0, 60)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-600 font-bold">${recommendedDish.price.toFixed(2)}</span>
                    <button 
                      onClick={() => navigate(`/dish/${recommendedDish.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}