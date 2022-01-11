<template>
  <div class="container-fluid m-4">
    <div class="row mb-3">
      <form>
        <div class="mb-3 col-4">
          <label for="recipeInput" class="form-label">Recipe Title</label>
          <input
            type="text"
            v-model="recipeData.title"
            class="form-control"
            id="recipeInput"
            placeholder="Title..."
          />
        </div>
        <div class="mb-3 col-4">
          <label for="recipeDesc" class="form-label">Recipe Description</label>
          <textarea
            class="form-control"
            v-model="recipeData.description"
            id="recipeDesc"
            rows="3"
          ></textarea>
        </div>
        <button class="btn btn-success" @click="createRecipe">
          Create Recipe
        </button>
      </form>
    </div>
    <div class="row">
      <Recipe v-for="r in recipes" :key="r.id" :recipe="r" />
    </div>
    <RecipeModal />
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { recipesService } from '../services/RecipesService'
import { AppState } from '../AppState'
import RecipeModal from '../components/RecipeModal.vue'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  name: 'Home',
  setup() {
    let recipeData = ref({})
    onMounted(async () => {
      await recipesService.GetAllRecipes()
    })
    return {
      recipeData,
      recipes: computed(() => AppState.recipes),
      async createRecipe() {
        try {
          await recipesService.createRecipe(recipeData.value)
          Pop.toast('Recipe Created!', 'success')
          recipeData.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
