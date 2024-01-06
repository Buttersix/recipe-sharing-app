import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeCard from './components/RecipeCard'

const Home = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://recipe-backend-api-o9ke.onrender.com/api/recipe/get-recipes')
        setRecipes(response.data)
      } catch (error) {
        console.error('Error fetching recipes', error)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div className='display-flex'>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  )
}

export default Home