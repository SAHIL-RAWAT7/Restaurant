// Mock user data
const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user' }
]

// Simulate API call delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const loginUser = async ({ email, password }) => {
  await delay(500)
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid credentials')
  return user
}

export const registerUser = async ({ name, email, password }) => {
  await delay(500)
  const exists = users.some(u => u.email === email)
  if (exists) throw new Error('User already exists')
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: 'user'
  }
  users.push(newUser)
  return newUser
}