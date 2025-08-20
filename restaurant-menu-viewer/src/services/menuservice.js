import { dishes } from '../data'

export const getDishes = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300))
  return dishes
}

export const getDishById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return dishes.find(dish => dish.id === parseInt(id))
}

export const addDish = async (dish) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const newDish = {
    ...dish,
    id: dishes.length + 1
  }
  dishes.push(newDish)
  return newDish
}

export const updateDish = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = dishes.findIndex(d => d.id === parseInt(id))
  if (index === -1) throw new Error('Dish not found')
  dishes[index] = { ...dishes[index], ...updates }
  return dishes[index]
}

export const deleteDish = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = dishes.findIndex(d => d.id === parseInt(id))
  if (index === -1) throw new Error('Dish not found')
  return dishes.splice(index, 1)[0]
}