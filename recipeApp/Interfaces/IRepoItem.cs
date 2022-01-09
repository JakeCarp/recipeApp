using System;

namespace recipeApp.Interfaces
{
    //Putting all the commmon properties of my repo items, minus accounts because
    //their Ids are in string format
    public interface IRepoItem
    {
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
        int Id { get; set; }
    }
}