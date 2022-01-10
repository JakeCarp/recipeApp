import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { recipesService } from "./RecipesService"

class IngredientsService {
    async editIngredient(ingredientData, id) {
        const res = await api.put('api/ingredients/' + id, ingredientData)
        logger.log(res.data)

        //TODO this isn't a great way to get reactivity, refactor later
        recipesService.getIngredientsForRecipe(ingredientData.recipeId)
    }
}
export const ingredientsService = new IngredientsService()