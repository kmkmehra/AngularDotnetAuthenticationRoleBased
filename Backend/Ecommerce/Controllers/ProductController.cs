using Ecommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
   

    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetProducts()
        {
            var listProducts = new List<Product> {
                new Product{
                    Name="MG Hector",
                    Sku="MG001",
                    Price=2500000
                },
                new Product{
                    Name="Macbook M2 Pro",
                    Sku="MAC001",
                    Price=250000
                }
            };
            return Ok(listProducts);
        }


    }
}
