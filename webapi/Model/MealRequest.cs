using System.Text.Json.Serialization;

namespace webapi.Model
{
    public class MealRequest
    {
        [JsonPropertyName("type")]
        public string Type { get; set; } = null!;

        [JsonPropertyName("calories")]
        public double Calories { get; set; }

        [JsonPropertyName("carbs")]
        public double Carbs { get; set; }

        [JsonPropertyName("fat")]
        public double Fat { get; set; }

        [JsonPropertyName("protein")]
        public double Protein { get; set; }
    }
}
