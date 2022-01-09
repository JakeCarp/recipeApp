using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using recipeApp.Models;

namespace recipeApp.Repositories
{
    public class RecipesRepository
    {
        private readonly IDbConnection _db;

        public RecipesRepository(IDbConnection db)
        {
            _db = db;
        }
        internal List<Recipe> GetAllRecipes()
        {
            //Establish SQL
            var sql = @"
            SELECT 
             r.*,
             a.* 
            FROM recipes r
            JOIN accounts a ON r.creatorId = a.id
            ;";

            //Execute Query with Dapper
            return _db.Query<Recipe, Account, Recipe>(sql, (r, a) =>
            {
                r.Creator = a;
                return r;
            }).ToList();
        }
        internal Recipe GetRecipeById(int id)
        {
            //Establish SQL
            var sql = @"
            SELECT
                r.*,
                a.*
            FROM recipes r
            JOIN accounts a ON r.creatorId = a.id
            WHERE id = @id;";

            //Use Dapper ORM to execute SQL then populate the creator
            return _db.Query<Recipe, Account, Recipe>(sql, (r, a) =>
            {
                r.Creator = a;
                return r;
            }).FirstOrDefault();
        }


        internal Recipe CreateRecipe(Recipe newRecipe)
        {
            var sql = @"
            INSERT INTO recipes(title, description)
            VALUES(@Title, @Description);
            SELECT LAST_INSERT_ID();";
            var id = _db.ExecuteScalar<int>(sql, newRecipe);
            newRecipe.Id = id;
            return newRecipe;
        }
        internal Recipe EditRecipe(Recipe recipe)
        {
            var sql = @"
            UPDATE recipes
                SET
                title = @Title
                description = @Description
            WHERE id = @Id LIMIT 1;";
            var rowsAffected = _db.Execute(sql, recipe);
            if (rowsAffected > 1)
            {
                //ALERT SYSADMIN NOW!!
                throw new Exception("CRITICAL DATABASE ERROR, ALERT SYSTEM ADMINISTRATION");
            }
            if (rowsAffected < 1)
            {
                throw new Exception("Updated Failed, Likely Bad Id");
            }
            return recipe;
        }
        internal void RemoveRecipe(int recipeId)
        {
            var sql = @"
            DELETE FROM recipes WHERE id = @recipeId
            ;";
            _db.Execute(sql, new { recipeId });
        }

    }
}