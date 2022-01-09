using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using recipeApp.Models;

namespace recipeApp.Repositories
{
    public class StepsRepository
    {
        private readonly IDbConnection _db;

        public StepsRepository(IDbConnection db)
        {
            _db = db;
        }

        internal List<Step> GetStepsByRecipeId(int id)
        {
            var sql = @"
            SELECT
                *
            FROM steps
            WHERE recipeId = @id;";
            return _db.Query<Step>(sql, new { id }).ToList();
        }

        internal Step GetStepById(int id)
        {
            var sql = @"
            SELECT
             *
            FROM steps 
            WHERE id = @id;";
            return _db.QueryFirstOrDefault<Step>(sql, new { id });
        }

        internal Step CreateStep(Step newStep)
        {
            var sql = @"
            INSERT INTO steps(description, stepOrder, recipeId, creatorId)
            VALUES(@Description, @stepOrder, @recipeId, @creatorId);
            SELECT LAST_INSERT_ID();";
            var id = _db.ExecuteScalar<int>(sql, newStep);
            newStep.Id = id;
            return newStep;
        }

        internal Step EditStep(Step step)
        {
            var sql = @"
            UPDATE steps
                SET
                description = @Description,
                stepOrder = @StepOrder
            WHERE id = @id LIMIT 1;";
            var rowsAffected = _db.Execute(sql, step);
            if (rowsAffected > 1)
            {
                //alert sysadmin
                throw new Exception("THIS IS REALLY BAD");
            }
            if (rowsAffected < 1)
            {
                throw new Exception("Updated Failed, Likely Bad Id");
            }
            return step;
        }
        internal void RemoveStep(int stepId)
        {
            var sql = @"
            DELETE FROM steps WHERE id = @stepId
            ;";
            _db.Execute(sql, new { stepId });
        }
    }

}
