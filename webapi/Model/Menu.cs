namespace webapi.Model
{
    public class Menu
    {
        public Dish Breakfast { get; set; }
        public Dish Lunch { get; set; }
        public Dish Dinner { get; set; }
        public List<Dish> Snacks { get; set; }
    }
}
