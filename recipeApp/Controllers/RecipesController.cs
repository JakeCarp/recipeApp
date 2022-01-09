using System.Collections.Generic;
using System.Threading.Tasks;
using CodeWorks.Auth0Provider;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using recipeApp.Models;
using recipeApp.Services;

namespace recipeApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly RecipesService _rs;
        private readonly StepsService _ss;

        private readonly IngredientsService _is;


        public RecipesController(RecipesService rs, StepsService ss, IngredientsService ins)
        {
            _rs = rs;
            _ss = ss;
            _is = ins;
        }

        [HttpGet]
        public ActionResult<List<Recipe>> GetAllRecipes()
        {
            try
            {
                List<Recipe> recipes = _rs.GetAllRecipes();
                return Ok(recipes);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Recipe> GetRecipeById(int id)
        {
            try
            {
                Recipe recipe = _rs.GetRecipeById(id);
                return Ok(recipe);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //GET STEPS BY RECIPE ID
        [HttpGet("{id}/steps")]
        public ActionResult<List<Step>> GetStepsByRecpieId(int id)
        {
            try
            {
                List<Step> steps = _ss.GetStepsByRecipeId(id);
                return Ok(steps);

            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //GET Ingredients BY RECIPE ID
        [HttpGet("{id}/ingredients")]

        public ActionResult<List<Ingredient>> GetIngredientsByRecipeId(int id)
        {
            try
            {
                List<Ingredient> ingredients = _is.GetIngredientsByRecipeId(id);
                return Ok(ingredients);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //CREATE STEP ON RECIPE
        [HttpPost("{id}/steps")]
        [Authorize]
        public async Task<ActionResult<Step>> CreateStep([FromBody] Step newStep, int id)
        {
            try
            {

                var userInfo = await HttpContext.GetUserInfoAsync<Account>();
                newStep.RecipeId = id;
                newStep.CreatorId = userInfo.Id;
                Step step = _ss.CreateStep(newStep);
                return Ok(step);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //CREATE Ingredient on Recipe
        [HttpPost("{id}/ingredients")]
        public async Task<ActionResult<Ingredient>> CreateIngredient([FromBody] Ingredient newIngredient, int id)
        {
            try
            {
                var userInfo = await HttpContext.GetUserInfoAsync<Account>();
                newIngredient.CreatorId = userInfo.Id;
                newIngredient.RecipeId = id;
                Ingredient ingredient = _is.CreateIngredient(newIngredient);
                return Ok(ingredient);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Recipe>> CreateRecipe([FromBody] Recipe newRecipe)
        {
            try
            {
                //Get UserInfo to establish creator Id
                var userInfo = await HttpContext.GetUserInfoAsync<Account>();
                newRecipe.CreatorId = userInfo.Id;

                //using the instanced Recipe to put the data into DB
                Recipe recipe = _rs.CreateRecipe(newRecipe);
                return Ok(recipe);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<ActionResult<Recipe>> EditRecipe([FromBody] Recipe update, int id)
        {
            try
            {
                //Assign update object the target recipes Id
                update.Id = id;

                //Get user info to determine elegiblity to edit 
                var userInfo = await HttpContext.GetUserInfoAsync<Account>();


                //Actual determination of access should be done on the service layer
                Recipe recipe = _rs.EditRecipe(userInfo.Id, update);
                return Ok(recipe);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]

        public async Task<ActionResult<string>> RemoveRecipe(int id)
        {
            try
            {
                //Get user info to determine delete access
                var userInfo = await HttpContext.GetUserInfoAsync<Account>();
                //Actual detmination of access is service layer responsibility. 
                string res = _rs.RemoveRecipe(userInfo.Id, id);
                return Ok(res);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}