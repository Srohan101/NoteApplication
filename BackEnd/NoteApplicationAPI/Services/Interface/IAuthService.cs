using NoteApplicationAPI.RequestModel;
using NoteApplicationAPI.ResponseModel;

namespace NoteApplicationAPI.Services.Interface
{
    public interface IAuthService
    {
        Task<MasterResponse> userRegistration(UserRegistrationRequestModel registrationRequestModel);
        Task<TokenResponseModel> getToken(AuthRequestModel requestModel);
        Task<List<DropDownResponse>> getDropDown(string res);


    }
}
