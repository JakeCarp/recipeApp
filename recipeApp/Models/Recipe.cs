using System;
using recipeApp.Interfaces;

namespace recipeApp.Models
{
    public class Recipe : IRepoItem
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Id { get; set; }

        public string Title { get; set; }
        public string CreatorId { get; set; }
        public string Description { get; set; }

        public Account Creator { get; set; }
    }
}