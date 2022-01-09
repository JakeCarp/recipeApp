using System;
using System.Collections.Generic;
using recipeApp.Models;
using recipeApp.Repositories;

namespace recipeApp.Services
{
    public class RecipesService
    {
        private readonly RecipesRepository _repo;

        public RecipesService(RecipesRepository repo)
        {
            _repo = repo;
        }

        internal List<Recipe> GetAllRecipes()
        {
            return _repo.GetAllRecipes();
        }

        internal Recipe GetRecipeById(int id)
        {
            Recipe recipe = _repo.GetRecipeById(id);
            if (recipe == null)
            {
                throw new Exception("Could not Retrieve Recipe. Likely a Bad Id was Supplied.");
            }
            return recipe;
        }

        internal Recipe CreateRecipe(Recipe newRecipe)
        {
            return _repo.CreateRecipe(newRecipe);
        }

        internal Recipe EditRecipe(string id, Recipe update)
        {
            Recipe recipe = IsRecipeOwner(id, update.Id);
            recipe.Title = update.Title ?? recipe.Title;
            recipe.Description = update.Description ?? recipe.Description;
            return _repo.EditRecipe(recipe);
        }

        internal string RemoveRecipe(string userId, int recipeId)
        {
            Recipe recipe = IsRecipeOwner(userId, recipeId);
            _repo.RemoveRecipe(recipeId);
            return "Recipe Removed";
        }

        internal Recipe IsRecipeOwner(string userId, int recipeId)
        {
            Recipe recipe = GetRecipeById(recipeId);
            if (recipe.CreatorId != userId)
            {
                throw new Exception("This is not your recipe");
            }
            return recipe;
        }
    }
}