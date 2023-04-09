using com.spoonacular;
using Microsoft.AspNetCore.Mvc;
using webapi.Model;
using webapi.API;
using System.Net;
using Microsoft.AspNetCore.Http;
using Org.OpenAPITools.Model;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/recipe")]
    public class RecipeController : ControllerBase
    {
        private readonly ICustomRecipesApi api;

        public RecipeController(ICustomRecipesApi api)
        {
            this.api = api;
        }

        [HttpGet(Name = "GetRecipe")]
        public GetRecipeInformation200Response GetRecipe([FromQuery] int id)
        {
            return this.api.GetRecipeInformation(id, true);
        }
    }
}
