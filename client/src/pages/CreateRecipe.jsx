import { useState } from "react";
import axios from 'axios';
import { useGetUserID } from "../hook/useGetUserID";
import {useNavigate} from 'react-router-dom'


const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instrcutions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (e, idx) => {
    const {value} = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({...recipe, ingredients});
  }

  const onSubmit= async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/recipes",recipe);
      console.log(response);
      alert("Recipe Created!!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-100">
      <h2 className="text-center font-extrabold text-2xl mb-10 mt-5 text-orange-600">Create Recipe!!</h2>
      <form onSubmit={onSubmit} className="border w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md">
  
        <label className="font-bold text-left w-full md:w-1/4 my-2" htmlFor="name">Name</label>
        <input className="border border-gray-300 rounded-md w-full md:w-3/4 px-3 py-2" type="text" id="name" name="name" onChange={handleChange} />
  
        <label className="font-bold w-full md:w-1/4 my-2" htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input className="border border-gray-300 rounded-md w-full md:w-3/4 px-3 py-2 my-1" key={idx} type="text" name="ingredients" value={ingredient} onChange={(e) => handleIngredientChange(e, idx)} />
        ))}
        <button className="font-bold bg-orange-600 text-white px-6 py-2 rounded-md my-2" onClick={addIngredient} type="button">Add Ingredient</button>
  
        <label className="font-bold w-full md:w-1/4 my-2" htmlFor="instructions">Instructions</label>
        <textarea 
          className="border border-gray-300 rounded-md w-full md:w-3/4 px-3 py-2 my-1"
          id="instructions"
          name="instructions"
          onChange={handleChange}
        />
  
        <label className="font-bold w-full md:w-1/4 my-2" htmlFor="imageUrl">Image URL</label>
        <input
          className="border border-gray-300 rounded-md w-full md:w-3/4 px-3 py-2"
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
  
        <label className="font-bold w-full md:w-1/4 my-2" htmlFor="cookingTime">Cooking Time</label>
        <input
          className="border border-gray-300 rounded-md w-full md:w-3/4 px-3 py-2"
          type="number"
          id="cookingTime"
          name="CookingTime"
          onChange={handleChange}
        />
        <button className="font-bold bg-orange-600 text-white px-6 py-2 rounded-md mt-6" type="submit">Create Recipe</button>
      </form>
    </div>
  );
}  

export default CreateRecipe;
