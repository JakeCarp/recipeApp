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
    public class IngredientsController : ControllerBase
    {
        private readonly IngredientsService _is;

        public IngredientsController(IngredientsService @is)
        {
            _is = @is;
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<IngredientsController>> EditIngredient([FromBody] Ingredient update, int id)
        {
            try
            {
                var userInfo = await HttpContext.GetUserInfoAsync<Account>();
                update.Id = id;
                update.CreatorId = userInfo.Id;
                Ingredient ingredient = _is.EditIngredient(update);
                return Ok(ingredient);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]

        public async Task<ActionResult<string>> RemoveIngredient(int id)
        {
            try
            {
                var userInfo = await HttpContext.GetUserInfoAsync<Account>();
                string res = _is.RemoveIngredient(userInfo.Id, id);
                return Ok(res);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}