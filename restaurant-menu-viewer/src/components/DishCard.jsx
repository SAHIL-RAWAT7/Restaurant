import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DishCard({ dish }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.image || '/images/default-dish.jpg'}
          alt={dish.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {dish.isPopular && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
            Popular
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg truncate">{dish.name}</h3>
          <span className="text-amber-600 font-bold ml-2 whitespace-nowrap">
            ${parseFloat(dish.price).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center mt-1 mb-2">
          {dish.category && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2">
              {dish.category}
            </span>
          )}
          {dish.isVegetarian && (
            <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
              Vegetarian
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {dish.description || 'Delicious dish with premium ingredients'}
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={`/dish/${dish.id}`}
            className="text-amber-600 hover:text-amber-800 font-medium text-sm"
          >
            View Details →
          </Link>
          
          {dish.spiceLevel && (
            <div className="flex items-center">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={`inline-block w-2 h-2 rounded-full mx-px ${
                    i < dish.spiceLevel ? 'bg-red-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}