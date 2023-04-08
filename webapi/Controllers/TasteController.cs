using Microsoft.AspNetCore.Mvc;
using Org.OpenAPITools.Model;
using webapi.API;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/taste")]
    public class TasteController : ControllerBase
    {
        private readonly ICustomRecipesApi api;

        public TasteController(ICustomRecipesApi api)
        {
            this.api = api;
        }
        [HttpGet(Name = "GetTaste")]
        public GetRecipeTasteByID200Response GetTaste([FromQuery] int id)
        {
            return this.api.GetRecipeTasteByID(id, false);
        }
    }
}
