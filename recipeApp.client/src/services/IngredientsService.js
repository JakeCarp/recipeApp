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

    async createIngredient(ingredientData, id) {
        const res = await api.post('api/recipes/' + id + '/ingredients', ingredientData)
        logger.log(res.data)
        AppState.ingredients.push(res.data)
    }
    async deleteIngredient(id) {
        const res = await api.delete('api/ingredients/' + id)
        logger.log(res.data)
        AppState.ingredients = AppState.ingredients.filter(i => i.id != id)
    }
}
export const ingredientsService = new IngredientsService()