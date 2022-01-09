using System;
using System.Collections.Generic;
using recipeApp.Models;
using recipeApp.Repositories;

namespace recipeApp.Services
{
    public class IngredientsService
    {
        private readonly IngredientsRepository _repo;
        private readonly RecipesService _rs;

        public IngredientsService(IngredientsRepository repo, RecipesService rs)
        {
            _repo = repo;
            _rs = rs;
        }

        internal List<Ingredient> GetIngredientsByRecipeId(int id)
        {
            return _repo.GetIngredientsByRecipeId(id);
        }

        internal Ingredient CreateIngredient(Ingredient newIngredient)
        {
            Recipe recipe = _rs.GetRecipeById(newIngredient.RecipeId);
            if (recipe.CreatorId != newIngredient.CreatorId)
            {
                throw new Exception("You Cannot Add Ingredients To a Recipe You Do Not Own");
            }
            return _repo.CreateIngredient(newIngredient);
        }

        internal Ingredient EditIngredient(Ingredient update)
        {
            Ingredient ingredient = IsIngredientOwner(update.CreatorId, update.Id);
            ingredient.Amount = update.Amount ?? ingredient.Amount;
            ingredient.Name = update.Name ?? ingredient.Name;
            return _repo.EditIngredient(ingredient);
        }

        internal string RemoveIngredient(string userId, int ingredientId)
        {
            Ingredient ingredient = IsIngredientOwner(userId, ingredientId);
            _repo.RemoveIngredient(ingredientId);
            return "Ingredient Removed";
        }
        internal Ingredient GetIngredientById(int id)
        {
            Ingredient ingredient = _repo.GetIngredientById(id);
            if (ingredient == null)
            {
                throw new Exception("Bad Ingredient Id");
            }
            return ingredient;
        }

        internal Ingredient IsIngredientOwner(string userId, int ingredientId)
        {
            Ingredient ingredient = GetIngredientById(ingredientId);
            if (ingredient.CreatorId != userId)
            {
                throw new Exception("This is not your Ingredient");
            }
            return ingredient;
        }
    }
}