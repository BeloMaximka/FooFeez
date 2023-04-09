using com.spoonacular;
using webapi.Model;

namespace webapi.API
{
    public interface ICustomRecipesApi : IRecipesApi
    {
        MealResult? SearchRandomRecipeByNutrients(string type, double calories, double? carbs, double? fat, double? protein);
    }
}
