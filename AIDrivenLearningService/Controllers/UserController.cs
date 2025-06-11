using Microsoft.AspNetCore.Mvc;
using Bl.Interfaces;
using Models.Classes;

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
            var user = await _userBl.RegisterUserAsync(dto.Name, dto.Phone);
            if (user == null)
                return BadRequest("User already exists or invalid data.");
            return Ok(ToDto(user));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var user = await _userBl.GetUserByIdAsync(id);
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
            Id = user.Id.ToString(),
            Name = user.Name,
            Phone = user.Phone
        };

    }

    // DTO for registration

    public class UserRegisterDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
    }

}
