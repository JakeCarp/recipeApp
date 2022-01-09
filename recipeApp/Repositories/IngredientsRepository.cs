using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using recipeApp.Models;

namespace recipeApp.Repositories
{
    public class IngredientsRepository
    {
        private readonly IDbConnection _db;

        public IngredientsRepository(IDbConnection db)
        {
            _db = db;
        }

        internal Ingredient CreateIngredient(Ingredient newIngredient)
        {
            var sql = @"
            INSERT INTO ingredients(name, amount, creatorId, recipeId)
            VALUES(@Name, @Amount, @CreatorId, @RecipeId);
            SELECT LAST_INSERT_ID();";
            var id = _db.ExecuteScalar<int>(sql, newIngredient);
            newIngredient.Id = id;
            return newIngredient;
        }

        internal List<Ingredient> GetIngredientsByRecipeId(int id)
        {
            var sql = @"
            SELECT
                *
            FROM ingredients
            WHERE recipeId = @id;";
            return _db.Query<Ingredient>(sql, new { id }).ToList();
        }

        internal Ingredient GetIngredientById(int id)
        {
            var sql = @"
            SELECT 
                *
            FROM ingredients
            WHERE id = @id;";
            return _db.QueryFirstOrDefault<Ingredient>(sql, new { id });
        }

        internal Ingredient EditIngredient(Ingredient ingredient)
        {
            var sql = @"
            UPDATE ingredients
                SET
                amount = @Amount,
                name = @Name
            WHERE id = @id LIMIT 1;";
            var rowsAffected = _db.Execute(sql, ingredient);
            if (rowsAffected > 1)
            {
                //alert sysadmin
                throw new Exception("THIS IS REALLY BAD");
            }
            if (rowsAffected < 1)
            {
                throw new Exception("Updated Failed, Likely Bad Id");
            }
            return ingredient;
        }

        internal void RemoveIngredient(int ingredientId)
        {
            var sql = @"
            DELETE FROM ingredients WHERE id = @ingredientId;";
            _db.Execute(sql, new { ingredientId });
        }
    }
}