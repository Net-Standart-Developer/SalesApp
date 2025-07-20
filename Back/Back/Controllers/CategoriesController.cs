using Back.Models;
using Back.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDBContext db;
        public CategoriesController(ApplicationDBContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(this.db.Categories);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryViewModel vm)
        {
            Category newCategory = new Category()
            {
                Id = Guid.NewGuid(),
                Name = vm.Name,
                Description = vm.Description,
                DateOfCreation = DateTime.UtcNow,
                DateOfModifiction = DateTime.UtcNow
            };

            this.db.Categories.Add(newCategory);
            await this.db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> EditCategory(EditCategoryViewModel vm)
        {
            var category = this.db.Categories.FirstOrDefault(c => c.Id == vm.Id);
            if (category == null)
            {
                return BadRequest("Нет такой категории");
            }

            category.Name = vm.Name;
            category.Description = vm.Description;
            category.DateOfModifiction = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var category = this.db.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                return BadRequest("Нет такой категории");
            }

            this.db.Categories.Remove(category);
            await this.db.SaveChangesAsync();

            return Ok();
        }
    }
}
