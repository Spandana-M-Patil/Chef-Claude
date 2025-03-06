import {useState} from "react"
import { getRecipeFromMistral } from "./ai"
import ReactMarkdown from "react-markdown";

export default function Main(){

    // "Tomatoes","Chilli", "Brinjal", "Capsicum"
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState(" ")
    
    const allIngredients = ingredients.map(ingredient => (
        <p key={ingredient}> { ingredient } </p>
    ))

    function handleSubmit(formData){
        const newIng = formData.get("ingredientInput")
        setIngredients(prevIng => (
            [...prevIng, newIng]
        ))
        
    }

    async function getRecipe(){
        const ans = await getRecipeFromMistral(ingredients)
        setRecipe(ans)

    }

    return(
        <section>

            <form action={handleSubmit}>
                <input type="text" placeholder="e.g Onion" name="ingredientInput"/>
                <button>+ Add ingredient</button>
            </form>

            { ingredients.length > 0 && <h1>Ingredient List</h1> }
            
            <div id="indredientList">{allIngredients}</div>

            {ingredients.length > 3 &&
                <div id="getARecipe">
                    <div>
                        <p>Ready for a recipe?</p>
                        <p>Generate a recipe from your list of Ingredients</p>
                    </div>
                    <button onClick={getRecipe}>Get a Recipe</button>
                </div>
            }
            <ReactMarkdown>{recipe ?? "**No recipe available.**"}</ReactMarkdown>
        </section>
    )
}