import './PostRecipe.css'
import RecipeForm from './components/RecipeForm'

const PostRecipe = () => {
  return (
    <>
      <div className='post-recipe-header'>Post a Recipe</div>
      <RecipeForm />
    </>
  )
}

export default PostRecipe