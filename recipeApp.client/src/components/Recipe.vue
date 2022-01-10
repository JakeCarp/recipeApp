<template>
  <div class="col-3">
    <div
      class="recipe"
      :title="recipe.title"
      data-bs-toggle="modal"
      data-bs-target="#recipe-modal"
      @click="setActive"
    >
      <div class="card selectable rounded elevation-2">
        <div class="card-header">
          <h5 class="card-title text-center">{{ recipe.title }}</h5>
        </div>
        <div class="card-body">
          <p class="m-0">{{ recipe.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { recipesService } from '../services/RecipesService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
export default {
  props: {
    recipe: { type: Object, required: true }
  },
  setup(props) {
    return {
      steps: computed(() => AppState.steps),
      ingredients: computed(() => AppState.ingredients),
      async setActive() {
        try {
          AppState.activeRecipe = props.recipe
          await recipesService.getStepsForRecipe(props.recipe.id)
          await recipesService.getIngredientsForRecipe(props.recipe.id)
        } catch (error) {
          logger.error(error)
          Modal.getOrCreateInstance(document.getElementById("recipe-modal")).hide()
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>