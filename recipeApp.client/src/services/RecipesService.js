import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import {api} from './AxiosService'
class RecipesService {
    
    async GetAllRecipes() {
        const res = await api.get('api/recipes')
        logger.log(res.data)
        AppState.recipes = res.data
    }
    async getStepsForRecipe(recipeId) {
        const res = await api.get('api/recipes/' + recipeId + '/steps')
        logger.log(res.data)
        AppState.steps = res.data
    }
    async getIngredientsForRecipe(recipeId) {
        const res = await api.get('api/recipes/' + recipeId + '/ingredients')
        logger.log(res.data)
        AppState.ingredients = res.data
    }

    async editRecipe(recipe) {
        const res = await api.put('api/recipes/' + recipe.id, recipe)
        logger.log(res.data)
        AppState.activeRecipe = res.data
    }

    async createRecipe(recipe) {
        const res = await api.post('api/recipes', recipe)
        logger.log(res.data)
        AppState.recipes.push(res.data)
    }

    async deleteRecipe(id) {
        const res = await api.delete('api/recipes/' + id)
        logger.log(res.data)
        AppState.recipes = AppState.recipes.filter(f => f.id != id)
    }
}
export const recipesService = new RecipesService();