using Ecommerce.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public IConfiguration _configuration;
        public AuthenticationController(IConfiguration config)
        {
            _configuration = config;
        }

        [HttpPost]
        public IActionResult Login(LoginDto param) {
            if (param.Username == "admin" && param.Password == "123456")
            {
                string name = "Adminstrator";
                string role = "admin";
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Username", param.Username),
                        new Claim("Role", role),
                };
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var securityToken = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                            issuer,
                            audience,
                            claims,
                            expires: DateTime.UtcNow.AddDays(1),
                            signingCredentials: signIn
                );
                string token = new JwtSecurityTokenHandler().WriteToken(securityToken);
                var user = new
                {
                    Name = name,
                    Role = role,
                };
                //Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                //Response.Cookies.Append("X-Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                //Response.Cookies.Append("X-Refresh-Token", user.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                return Ok(new
                {
                    Token = token,
                    Data = user,
                    Status = true,
                });
            }
            return Unauthorized(new
            {
                Status =  false,
                Message = "Inavlid Username and Password"
            });
        }

        [HttpPost]
        public IActionResult CustomerLogin(LoginDto param)
        {
            if (param.Username == "customer" && param.Password == "123456")
            {

                string role = "customer";
                string name = "Customer Karan";
                
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Username", param.Username),
                        new Claim("Role", role),
                };
                var user = new
                {
                    Name = name,
                    Role = role,
                };
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var securityToken = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                            issuer,
                            audience,
                            claims,
                            expires: DateTime.UtcNow.AddDays(1),
                            signingCredentials: signIn
                );
                string token = new JwtSecurityTokenHandler().WriteToken(securityToken);
                //Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                //Response.Cookies.Append("X-Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                //Response.Cookies.Append("X-Refresh-Token", user.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                return Ok(new
                {
                    Token = token,
                    Data = user,
                    Status = true,
                });
            }
            return Unauthorized(new
            {
                Status = false,
                Message = "Inavlid Username and Password"
            });
        }


    }
}
