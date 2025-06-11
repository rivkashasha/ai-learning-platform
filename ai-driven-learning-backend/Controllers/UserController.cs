using Microsoft.AspNetCore.Mvc;
using Bl.Interfaces;
using Models.Classes;
using System.Text.Json.Serialization;

namespace AIDrivenLearningService.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserBl _userBl;

        public UserController(IUserBl userBl)
        {
            _userBl = userBl;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
        {
            var user = await _userBl.RegisterUserAsync(dto.CustomId, dto.Name, dto.Phone);
            if (user == null)
                return BadRequest("User already exists or invalid data.");
            return Ok(ToDto(user));
        }

        [HttpGet("{customId}")]
        public async Task<IActionResult> GetById(string customId)
        {
            var user = await _userBl.GetUserByIdAsync(customId); // customId, not _id
            if (user == null)
                return NotFound();
            return Ok(ToDto(user));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userBl.GetAllUsersAsync();
            return Ok(users.Select(ToDto));
        }
        private static UserRegisterDto ToDto(User user) => new UserRegisterDto
        {
            
            CustomId = user.CustomId,
            Name = user.Name,
            Phone = user.Phone
        };

    }

    // DTO for registration

    public class UserRegisterDto
    {
        public string? CustomId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
    }

}
