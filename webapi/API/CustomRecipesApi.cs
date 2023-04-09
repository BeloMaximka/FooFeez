using com.spoonacular;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;
using RestSharp;
using System.Text.RegularExpressions;
using webapi.Model;

namespace webapi.API
{
    public class CustomRecipesApi : RecipesApi, ICustomRecipesApi
    {
        private static Random random = new Random();
        public MealResult? SearchRandomRecipeByNutrients(string type, double calories, double? carbs, double? fat, double? protein)
        {
            var path = "/recipes/findByNutrients";
            path = path.Replace("{format}", "json");

            var queryParams = new Dictionary<string, string>();
            var headerParams = new Dictionary<string, string>();
            var formParams = new Dictionary<string, string>();
            var fileParams = new Dictionary<string, FileParameter>();
            string postBody = null;

            queryParams.Add("maxCalories", ApiClient.ParameterToString(calories * 1.1));
            queryParams.Add("number", "100");
            if (protein != null)
                queryParams.Add("maxProtein", ApiClient.ParameterToString(protein * 1.1));
            if (carbs != null)
                queryParams.Add("maxCarbs", ApiClient.ParameterToString(carbs * 1.1));
            if (fat != null)
                queryParams.Add("maxFat", ApiClient.ParameterToString(fat * 1.1));

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

            List<MealNutrientInfo> info = new List<MealNutrientInfo>(recipes.Count);
            for (int i = 0; i < recipes.Count; i++)
            {
                info.Add(new() { Index = i });
                if (recipes[i].Calories == null) break;
                if(protein != null)
                {
                    info[i].AddIrrelevance(recipes[i].Protein, (double)recipes[i].Calories.Value, protein.Value, calories);
                }
                if (carbs != null)
                {
                    info[i].AddIrrelevance(recipes[i].Carbs, (double)recipes[i].Calories.Value, carbs.Value, calories);
                }
                if (fat != null)
                {
                    info[i].AddIrrelevance(recipes[i].Fat, (double)recipes[i].Calories.Value, fat.Value, calories);
                }
            }

            var bestRecipe = recipes[info.OrderBy(x => x.IrrelevanceFactor).First().Index];
            return new MealResult()
            {
                Id = bestRecipe.Id ?? -1,
                Title = bestRecipe.Title,
                Image = bestRecipe.Image,
                MealType = type,
                Calories = (double)(bestRecipe.Calories ?? 0),
                Protein = bestRecipe.Protein,
                Carbs = bestRecipe.Carbs,
                Fat = bestRecipe.Fat,
                AmountMultiplier = calories / (double)bestRecipe.Calories
            };
        }
    }
}

class MealNutrientInfo
{
    private static double CalcIrrelevance(double a, double b)
    {
        return Math.Abs(1 / a - 1 / b);
    }
    public void AddIrrelevance(string requestValue, double reguestTotal, double desiredValue, double desiredTotal)
    {
        double requestNumber;
        if (double.TryParse(Regex.Match(requestValue, "\\d+").Value, out requestNumber))
        {
            IrrelevanceFactor += CalcIrrelevance(desiredValue / reguestTotal, requestNumber / desiredTotal);
        }
    }
    public double IrrelevanceFactor { get; set; }
    public int Index { get; set; }
}