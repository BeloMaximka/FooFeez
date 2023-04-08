using com.spoonacular;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;
using RestSharp;
using webapi.Model;

namespace webapi.API
{
    public class CustomRecipesApi : RecipesApi, ICustomRecipesApi
    {
        private static Random random = new Random();
        public MealResult? SearchRandomRecipeByNutrients(string type, double calories, double carbs, double fat, double protein)
        {
            var path = "/recipes/findByNutrients";
            path = path.Replace("{format}", "json");

            var queryParams = new Dictionary<string, string>();
            var headerParams = new Dictionary<string, string>();
            var formParams = new Dictionary<string, string>();
            var fileParams = new Dictionary<string, FileParameter>();
            string postBody = null;

            queryParams.Add("maxCalories", ApiClient.ParameterToString(calories));
            queryParams.Add("maxProtein", ApiClient.ParameterToString(protein));
            queryParams.Add("maxCarbs", ApiClient.ParameterToString(carbs));
            queryParams.Add("maxFat", ApiClient.ParameterToString(fat));

            // authentication setting, if any
            string[] authSettings = new string[] { "apiKeyScheme" };

            // make the HTTP request
            IRestResponse response = (IRestResponse)ApiClient.CallApi(path, Method.GET, queryParams, postBody, headerParams, formParams, fileParams, authSettings);

            if (((int)response.StatusCode) >= 400)
                throw new ApiException((int)response.StatusCode, "Error calling SearchRecipesByNutrients: " + response.Content, response.Content);
            else if (((int)response.StatusCode) == 0)
                throw new ApiException((int)response.StatusCode, "Error calling SearchRecipesByNutrients: " + response.ErrorMessage, response.ErrorMessage);

            var recipes = (List<SearchRecipesByNutrients200ResponseInner>)ApiClient.Deserialize(response.Content, typeof(List<SearchRecipesByNutrients200ResponseInner>), response.Headers);
            if (recipes.Count == 0) return null;

            var randomRecipe = recipes[random.Next(recipes.Count)];
            return new MealResult()
            {
                Title = randomRecipe.Title,
                Calories = (double)(randomRecipe.Calories ?? 0),
                Protein = randomRecipe.Protein,
                Carbs = randomRecipe.Carbs,
                Fat = randomRecipe.Fat,
                Image = randomRecipe.Image,
                MealType = type
            };
        }
    }
}
