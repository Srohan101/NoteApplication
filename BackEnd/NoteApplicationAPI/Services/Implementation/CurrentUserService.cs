using NoteApplicationAPI.Services.Interface;
using System.Security.Claims;

namespace NoteApplicationAPI.Services.Implementation
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            Name = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Name);
            Email = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Email);
            UserId = (string.IsNullOrEmpty(httpContextAccessor.HttpContext?.User?.FindFirstValue("UserId")))
                               ? (int?)null
                               : Convert.ToInt32(httpContextAccessor.HttpContext?.User?.FindFirstValue("UserId"));
            Country = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Country);
            DOB = DateTime.Parse(httpContextAccessor.HttpContext?.User?.FindFirstValue("DOB"));
          
        }
        public string? Name { get; }
        public string? Email { get; }
        public  int? UserId { get; }
        public string? Country { get; }
        public DateTime? DOB { get; }
    }
}
