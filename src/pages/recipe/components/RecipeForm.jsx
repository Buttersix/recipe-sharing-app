import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';

const RecipeForm = () => {
  const { register, handleSubmit, control } = useForm();
  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: 'instructions',
  });

  const onSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic (e.g., send data to server)

    // Display success message
    toast.success('Recipe uploaded successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Recipe Name:
        <input {...register('recipeName', { required: true })} />
      </label>

      <div>
        <label>Ingredients:</label>
        {ingredientFields.map((ingredient, index) => (
          <div key={ingredient.id}>
            <input
              {...register(`ingredients.${index}.name`, { required: true })}
              placeholder="Ingredient"
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              -
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendIngredient({ name: '' })}>
          +
        </button>
      </div>

      <div>
        <label>Instructions:</label>
        {instructionFields.map((instruction, index) => (
          <div key={instruction.id}>
            <textarea
              {...register(`instructions.${index}.text`, { required: true })}
              placeholder="Instruction"
            />
            <button type="button" onClick={() => removeInstruction(index)}>
              -
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendInstruction({ text: '' })}>
          +
        </button>
      </div>

      <label>
        Upload Image:
        <input type="file" {...register('image', { required: true })} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;
