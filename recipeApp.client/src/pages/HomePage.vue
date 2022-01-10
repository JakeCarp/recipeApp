<template>
  <div class="container-fluid m-4">
    <div class="row">
      <Recipe v-for="r in recipes" :key="r.id" :recipe="r" />
    </div>
    <RecipeModal />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { recipesService } from '../services/RecipesService'
import { AppState } from '../AppState'
import RecipeModal from '../components/RecipeModal.vue'

export default {
  components: { RecipeModal },
  name: 'Home',
  setup() {
    onMounted(async () => {
      await recipesService.GetAllRecipes()
    })
    return {
      recipes: computed(() => AppState.recipes)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
