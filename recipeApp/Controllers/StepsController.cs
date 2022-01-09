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
    public class StepsController : ControllerBase
    {
        private readonly StepsService _ss;

        public StepsController(StepsService ss)
        {
            _ss = ss;
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<ActionResult<Step>> EditStep([FromBody] Step update, int id)
        {
            try
            {
                update.Id = id;
                var userInfo = await HttpContext.GetUserInfoAsync<Account>();
                Step step = _ss.EditStep(userInfo.Id, update);
                return Ok(step);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]

        public async Task<ActionResult<string>> RemoveStep(int id)
        {
            try
            {
                var userInfo = await HttpContext.GetUserInfoAsync<Account>();
                string res = _ss.RemoveStep(userInfo.Id, id);
                return Ok(res);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}