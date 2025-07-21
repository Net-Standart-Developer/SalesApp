using Back.Models;
using Back.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDBContext db;

        public ProductsController(ApplicationDBContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(this.db.Products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return BadRequest("Нет продукта с таким id");
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductViewModel vm)
        {
            var category = this.db.Categories.FirstOrDefault(c => c.Id == vm.CategoryId);
            if (category == null) 
            {
                return BadRequest("Нет такой категории");    
            }

            Product newProduct = new Product()
            {
                Name = vm.Name,
                Description = vm.Description,
                Category = category,
                DateOfCreation = DateTime.UtcNow,
                DateOfModification = DateTime.UtcNow
            };

            this.db.Products.Add(newProduct);
            await this.db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> EditProduct(EditProductViewModel vm)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == vm.ProductId);
            if(product == null)
            {
                return BadRequest("Нет такого продукта");
            }

            var category = this.db.Categories.FirstOrDefault(c => c.Id == vm.CategoryId);
            if (category == null)
            {
                return BadRequest("Нет такой категории");
            }

            product.Name = vm.Name;
            product.Description = vm.Description;
            product.Category = category;
            product.DateOfModification = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == id);
            if(product == null)
            {
                return BadRequest("Нет такого продукта");
            }

            this.db.Products.Remove(product);
            await this.db.SaveChangesAsync();

            return Ok();
        }
    }
}
