using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteApplicationAPI.RequestModel;
using NoteApplicationAPI.ResponseModel;
using NoteApplicationAPI.Services.Interface;

namespace NoteApplicationAPI.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        public AuthController(IAuthService service)
        {
            _service = service;
        }
        [AllowAnonymous]
        [HttpPost("userRegistration")]
        public async Task<MasterResponse> userRegistration([FromBody]UserRegistrationRequestModel registrationRequestModel)
        {
            var res = await _service.userRegistration(registrationRequestModel);
            return res;
        }
        [AllowAnonymous]
        [HttpPost("getToken")]
        public async Task<TokenResponseModel> getToken([FromBody]AuthRequestModel authRequestModel)
        {
            var res = await _service.getToken(authRequestModel);
            return res;
        }
        [AllowAnonymous]
        [HttpGet("getDropDown")]
        public async Task<List<DropDownResponse>> getDropDown(string? DDType)
        {
            var res = await _service.getDropDown(DDType);
            return res;
        }
    }
}
