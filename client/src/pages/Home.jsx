import { useEffect, useState } from "react";
import axios from "axios";
// import { useGetUserID } from "../hook/useGetUserID";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  // const [savedRecipes, setSavedRecipes] = useState([]);

  // const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    // const fetchSavedRecipes = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:3000/recipes/savedRecipes/ids/${userID}`
    //     );
    //     setSavedRecipes(response.data.savedRecipes);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    fetchRecipes();
    // fetchSavedRecipes();
  }, []);

  // const saveRecipe = async (recipeID) => {
  //   try {
  //     const response = await axios.put("http://localhost:3000/recipes", {
  //       recipeID,
  //       userID,
  //     });
  //     setSavedRecipes(response.data.savedRecipes);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
<div className="container mx-auto px-4 w-auto">
  
  <h1 className="text-3xl font-bold mt-8 mb-4">Recipes</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {recipes.map((recipe) => (
      <div key={recipe._id} className="bg-white rounded-lg shadow-md p-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
        </div>
        {/* <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button> */}
        <div>
          <p className="text-gray-700 mb-2">{recipe.instructions}</p>
        </div>
        <div className="relative overflow-hidden rounded-md" style={{ height: "200px" }}>
          <img src={recipe.imageUrl} alt={recipe.name} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <p className="text-gray-700">Cooking Time: {recipe.cookingTime} (minutes)</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default Home;