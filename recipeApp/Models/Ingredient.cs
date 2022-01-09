using System;
using recipeApp.Interfaces;

namespace recipeApp.Models
{
    public class Ingredient : IRepoItem
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Id { get; set; }
        public string CreatorId { get; set; }
        public string Name { get; set; }
        public string Amount { get; set; }
        public int RecipeId { get; set; }
    }
}