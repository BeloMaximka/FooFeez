using com.spoonacular;
using Microsoft.AspNetCore.Mvc;
using webapi.Model;
using webapi.API;
using System.Net;
using Microsoft.AspNetCore.Http;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/meals")]
    public class MealController : ControllerBase
    {
        private readonly ICustomRecipesApi api;

        public MealController(ICustomRecipesApi api)
        {
            this.api = api;
        }

        [HttpPost(Name = "GetMealsByNutrientsAndCalories")]
        public IEnumerable<MealResult> GetMealsByNutrientsAndCalories([FromBody] MealRequest[] meals)
        {

            List<MealResult> results = new();
            for (int i = 0; i < meals.Length; i++)
            {
                var result = this.api.SearchRandomRecipeByNutrients(meals[i].Type, meals[i].Calories, meals[i].Carbs, meals[i].Fat, meals[i].Protein);
                if (result != null)
                {
                    results.Add(result);
                }
            }
            return results;
        }
    }
}
