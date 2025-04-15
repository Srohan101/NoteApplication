using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using NoteApplicationAPI.Param;
using NoteApplicationAPI.RequestModel;
using NoteApplicationAPI.ResponseModel;
using NoteApplicationAPI.Services.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NoteApplicationAPI.Services.Implementation
{
    public class AuthService : IAuthService
    {
        public IDapperRepository _dapperRepo;
        private readonly IMapper _mapper;
        private string storedProcedure = "spAuth";
        public AuthService(IDapperRepository dapperRepo, IMapper mapper)
        {
            _dapperRepo = dapperRepo;
            _mapper = mapper;
        }

        public async Task<MasterResponse> userRegistration(UserRegistrationRequestModel registrationRequestModel)
        {
            try
            {
                UserRegistrationParam param = new();
                param = _mapper.Map<UserRegistrationParam>(registrationRequestModel);
                param.Flag = 'I';
                var response = await _dapperRepo.GetQueryFirstOrDefaultResultAsync<MasterResponse>(storedProcedure, param);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TokenResponseModel> getToken(AuthRequestModel requestModel)
        {
            try
            {
                UserRegistrationParam param = new();
                param = _mapper.Map<UserRegistrationParam>(requestModel);
                param.Flag = 'T';
                var response = await _dapperRepo.GetQueryFirstOrDefaultResultAsync<TokenResponseModel>(storedProcedure, param);
                var tokenExpiryTimeStamp = DateTime.Now.AddMinutes(180);
                var claims = new List<Claim>
                {
                    new("UserId", response.userId.ToString()),
                    new(ClaimTypes.Name, response.Name?? string.Empty),
                    new("Country", response.Country?? string.Empty),
                    new(ClaimTypes.Email, response.Email?? string.Empty),
                    new("DOB", response.DOB.ToString())

                }; 
                var signingCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTg0NzA3NSwiaWF0IjoxNzAxODQ3MDc1fQ.hHDSrwak3IWYc8Ds1SY1L_QnZ0zlkpUmheZ2CAAiU4g")),
                    SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: tokenExpiryTimeStamp,
                    signingCredentials: signingCredentials
                    );
                var tokenHandler = new JwtSecurityTokenHandler();
                var encryptedToken = tokenHandler.WriteToken(token);
                response.Token = encryptedToken;
                return response;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<List<DropDownResponse>> getDropDown(string? DDType)
        {
            DropDownParam param = new()
            {
                DDType = DDType,
            };
            var response = await _dapperRepo.GetQueryResultAsync<DropDownResponse>("spDropDown", param);
            return response;
        }
    }
}
