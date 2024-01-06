import './RecipeCard.css'
import { useState } from 'react'
import axios from 'axios'

const RecipeCard = ({ recipe }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(recipe.likes || 0)

  const handleLike = async () => {
    try {
      const response = await axios.post(`https://recipe-backend-api-o9ke.onrender.com/api/recipe/${recipe._id}/like`)
      if (response.status === 200) {
        setLikesCount(likesCount + 1)
        setIsLiked(true)
      }
    } catch (error) {
      console.error('Error liking recipe', error)
    }
  }

  const currentUser = localStorage.getItem('currentUser')

  return (
    <div className='recipe-card'>
      <div className='recipe-details'>
        <h2>{recipe.recipeName}</h2>
        <div className='ingredients'>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
        <div className='instructions'>
          <h3>Instructions:</h3>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction.text}</li>
            ))}
          </ol>
        </div>
        {currentUser !== null ? (
          <div className='like-button'>
            <button onClick={handleLike} disabled={isLiked} className='like-btn'>
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <span className='likes-count'>{likesCount} Likes</span>
          </div>
        ) : (
          <span className='likes-count'>{likesCount} Likes</span>
        )}
      </div>
    </div>
  )
}

export default RecipeCard