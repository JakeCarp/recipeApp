<template>
  <Modal id="recipe-modal">
    <template #modal-body>
      <div class="container-fluid p-">
        <!-- Recipe Header and Edit form -->
        <div class="row">
          <div class="text-end">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="col-11 my-2" v-if="!edit">
            <h3>
              {{ recipe.title }}
            </h3>
            <p class="m-0">{{ recipe.description }}</p>
          </div>
          <div class="col-11" v-if="edit">
            <form>
              <label for="recipeTitle">Recipe Title</label>
              <input type="text" class="form-control" v-model="recipe.title" />
              <label for="recipe description">Recipe Description</label>
              <input
                type="text"
                class="form-control"
                v-model="recipe.description"
              />
            </form>
          </div>
          <div class="col-1">
            <div v-if="!edit && recipe.creatorId == account.id">
              <div class="text-end my-2">
                <i
                  class="mdi mdi-pencil selectable"
                  title="edit recipe"
                  @click="edit = !edit"
                ></i>
              </div>
              <div class="text-end">
                <i
                  class="mdi mdi-trash-can text-danger selectable"
                  title="delete recipe"
                  @click="deleteRecipe"
                ></i>
              </div>
            </div>
            <div v-if="edit">
              <button class="btn btn-success my-4" @click="editRecipe(recipe)">
                <i class="mdi mdi-check"></i>
              </button>
              <button class="btn btn-danger" @click="edit = !edit">
                <i class="mdi mdi-close"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Steps Section -->
        <div class="row">
          <!-- TODO add ui support for Steps in the recipes as well as drag anddrop reordering -->
          <!-- <div class="col-12 my-2">
            <h4>
              Steps: <span>{{ steps.length }}</span>
            </h4>
          </div>
          <div class="col-12">
            <div class="row scroll steps">
              <div class="col-6 m-2" v-for="s in steps" :key="s.id">
                <h5 class="m-0">{{ s.stepOrder }}</h5>
                <p class="m-0">{{ s.description }}</p>
              </div>
            </div>
          </div> -->

          <!-- Ingredients Section -->
          <div class="col-12 my-2">
            <h4>
              Ingredients: <span>{{ ingredients.length }}</span>
            </h4>
            <div
              v-if="!editIngredients && recipe.creatorId === account.id"
              class="text-end"
            >
              <i
                class="mdi mdi-pencil selectable"
                title="edit Ingredients"
                @click="editIngredients = !editIngredients"
              ></i>
            </div>
            <div v-if="recipe.creatorId === account.id" class="">
              <form>
                <div class="mb-3 col-4">
                  <label for="ingredientInput" class="form-label"
                    >Ingredient Name</label
                  >
                  <input
                    type="text"
                    v-model="ingredientData.name"
                    class="form-control"
                    id="ingredientInput"
                    placeholder="Name..."
                  />
                </div>
                <div class="mb-3 col-4">
                  <label for="ingredientAm" class="form-label"
                    >Ingredient Amount</label
                  >
                  <input
                    class="form-control"
                    v-model="ingredientData.amount"
                    placeholder="Amount..."
                    id="ingredientAm"
                  />
                </div>
                <button class="btn btn-success" @click="createIngredient">
                  Create Ingredient
                </button>
              </form>
            </div>
            <div v-if="editIngredients" class="text-end">
              <button
                class="btn btn-danger"
                @click="editIngredients = !editIngredients"
              >
                <i class="mdi mdi-close"></i>
              </button>
            </div>
          </div>
          <div class="col-12">
            <div class="row scroll ingredients">
              <div
                class="col-6 m-2"
                v-for="(i, index) in ingredients"
                :key="i.id"
              >
                <div v-if="!editIngredients">
                  <h5 class="m-0">{{ i.name }}</h5>
                  <p class="m-0">{{ i.amount }}</p>
                </div>
                <div v-if="editIngredients" class="border">
                  <label :for="'ingredient' + index">Name Of Ingredient</label>
                  <input
                    v-model="ingredients[index].name"
                    type="text"
                    class="form-control"
                  />
                  <label :for="'ingredientAmount' + index"
                    >Amount of Ingredient</label
                  >
                  <input
                    v-model="ingredients[index].amount"
                    type="text"
                    class="form-control"
                  />
                  <button
                    class="btn btn-success m-1"
                    @click="editIngredient(ingredients[index], i.id)"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-danger m-1"
                    @click="deleteIngredient(i.id)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { recipesService } from '../services/RecipesService'
import { ingredientsService } from '../services/IngredientsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { Modal } from 'bootstrap'
export default {
  setup() {
    let edit = ref(false)
    let editIngredients = ref(false)
    let ingredientData = ref({})

    return {
      //REGISTER REFS
      ingredientData,
      editIngredients,
      edit,

      //COMPUTEDS
      account: computed(() => AppState.account),
      recipe: computed(() => AppState.activeRecipe),
      steps: computed(() => AppState.steps),
      ingredients: computed(() => AppState.ingredients),

      //FUNCTIONS
      async editRecipe(recipe) {
        try {
          await recipesService.editRecipe(recipe)
          Pop.toast('Saved!', 'success')
          edit.value = !edit.value
        } catch (error) {
          logger.error(error)
          Pop.toast(error, 'error')
        }
      },
      async editIngredient(ingredient, id) {
        try {
          await ingredientsService.editIngredient(ingredient, id)
          Pop.toast('saved!', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error, 'error')
        }
      },
      async createIngredient() {
        try {
          await ingredientsService.createIngredient(ingredientData.value, this.recipe.id)
          Pop.toast('Created Ingredient', 'success')
          ingredientData.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error, 'error')
        }
      },
      async deleteRecipe() {
        try {
          if (await Pop.confirm('Hold on!', "Are you sure you want to delete this recipe?")) {
            await recipesService.deleteRecipe(this.recipe.id)
            Modal.getOrCreateInstance(document.getElementById("recipe-modal")).hide()
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteIngredient(id) {
        try {
          await ingredientsService.deleteIngredient(id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
//ALL OF THIS STYLING IS FOR THE OVERFLOW SCROLLING
.steps {
  max-height: 350px;
  overflow-y: scroll;
}
.ingredients {
  max-height: 350px;
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar-track {
  background-color: transparent;
}
.scroll::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: var(--bs-info);
  border-radius: 5px;
}
</style>