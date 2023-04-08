using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [ApiController]
    [Route("diet")]
    public class DietController : ControllerBase
    {
        [HttpGet(Name = "menu-calories")]
        public int GetMenuByCalories()
        {
            return 1;
        }
    }
}
