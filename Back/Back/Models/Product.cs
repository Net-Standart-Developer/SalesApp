namespace Back.Models
{
    public class Product : DBObject
    {
        public string Name { get; set; }
        public Category Category { get; set; }
        public string Description { get; set; }
    }
}
