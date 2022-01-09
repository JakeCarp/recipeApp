using System;
using recipeApp.Interfaces;

namespace recipeApp.Models
{
    public class Step : IRepoItem
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Id { get; set; }

        public string CreatorId { get; set; }

        public int StepOrder { get; set; }

        public string Description { get; set; }

        public int RecipeId { get; set; }

    }
}