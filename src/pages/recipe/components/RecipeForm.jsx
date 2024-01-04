import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import './RecipeForm.css'
import axios from 'axios'

const RecipeForm = () => {
  const { register, handleSubmit, control, reset, formState } = useForm({
    defaultValues: {
      ingredients: [{ name: '' }],
      instructions: [{ text: '' }]
    }
  })
  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: 'instructions',
  });

  const { errors } = formState;

  const [serverErrors, setServerErrors] = useState({})

  const onSubmit = async (data) => {
    try {
      const formData = {
        recipeName: data.recipeName,
        ingredients: data.ingredients,
        instructions: data.instructions
      }

      const response = await axios.post('https://recipe-backend-api-o9ke.onrender.com/api/recipe/upload-recipe', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 201) {
        toast.success('Recipe uploaded successfully')
        reset()
        setServerErrors({})
      } else {
        toast.error('Failed to upload recipe')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Server-side validation error
        setServerErrors(error.response.data)
      } else {
        console.error('Error uploading recipe', error)
        toast.error('Internal Server Error')
      }
    }
  };

  return (
    <form className='recipe-form' onSubmit={handleSubmit(onSubmit)}>
      <label className='recipe-form-label'>
        Recipe Name:
        <input className='recipe-form-input' {...register('recipeName', { required: true })} />
      </label>

      <div className='recipe-form-section'>
        <label className='recipe-form-label'>Ingredients:</label>
        {ingredientFields.map((ingredient, index) => (
          <div className='recipe-form-array-item' key={ingredient.id}>
            <input
              {...register(`ingredients.${index}.name`, { required: true })}
              className='recipe-form-input'
              placeholder="Ingredient"
            />
            <button type="button" onClick={() => removeIngredient(index)} className='recipe-minus-button'>
              -
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendIngredient({ name: '' })} className='recipe-plus-button'>
          +
        </button>
      </div>

      <div className='recipe-form-section'>
        <label className='recipe-form-label'>Instructions:</label>
        {instructionFields.map((instruction, index) => (
          <div className='recipe-form-array-item' key={instruction.id}>
            <textarea
              {...register(`instructions.${index}.text`, { required: true })}
              className='recipe-form-input'
              placeholder="Instruction"
            />
            <button type="button" onClick={() => removeInstruction(index)} className='recipe-minus-button'>
              -
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendInstruction({ text: '' })} className='recipe-plus-button'>
          +
        </button>
      </div>

      {serverErrors.message && <p>{serverErrors.message}</p>}

      <button type="submit" className='recipe-form-button'>Submit</button>
    </form>
  );
};

export default RecipeForm;
