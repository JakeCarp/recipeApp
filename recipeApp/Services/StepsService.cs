using System;
using System.Collections.Generic;
using recipeApp.Models;
using recipeApp.Repositories;

namespace recipeApp.Services
{
    public class StepsService
    {
        private readonly StepsRepository _repo;
        private readonly RecipesService _rs;

        public StepsService(StepsRepository repo, RecipesService rs)
        {
            _repo = repo;
            _rs = rs;
        }

        internal List<Step> GetStepsByRecipeId(int recipeId)
        {
            return _repo.GetStepsByRecipeId(recipeId);
        }


        internal Step GetStepById(int id)
        {
            Step step = _repo.GetStepById(id);
            if (step == null)
            {
                throw new Exception("Bad Step Id");
            }
            return step;
        }
        internal Step CreateStep(string userId, Step newStep)
        {
            Recipe recipe = _rs.GetRecipeById(newStep.RecipeId);
            if (recipe.CreatorId != userId)
            {
                throw new Exception("You cannot add steps to a recipe you do not own!");
            }
            return _repo.CreateStep(newStep);

        }

        internal Step EditStep(string id, Step update)
        {
            Step step = IsStepOwner(id, update.Id);
            step.Description = update.Description ?? step.Description;
            step.StepOrder = update.StepOrder >= 0 ? update.StepOrder : step.StepOrder;
            return _repo.EditStep(step);
        }

        internal string RemoveStep(string userId, int stepId)
        {
            Step step = IsStepOwner(userId, stepId);
            _repo.RemoveStep(stepId);
            return "Step Removed";
        }

        internal Step IsStepOwner(string userId, int stepId)
        {
            Step step = GetStepById(stepId);
            if (step.CreatorId != userId)
            {
                throw new Exception("This is not your step");
            }
            return step;
        }
    }
}