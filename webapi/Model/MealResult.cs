namespace webapi.Model
{
    public class MealResult
    {
        public int Id { get; set; }
        public double AmountMultiplier { get; set; }
        public string Title { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string MealType { get; set; } = null!;

        public double Calories { get; set; }
        public string Carbs { get; set; } = null!;
        public string Fat { get; set; } = null!;
        public string Protein { get; set; } = null!;
    }
}
