using AutoMapper;
using NoteApplicationAPI.Param;
using NoteApplicationAPI.RequestModel;

namespace NoteApplicationAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegistrationParam, UserRegistrationRequestModel>().ReverseMap();
            CreateMap<UserRegistrationParam, AuthRequestModel>().ReverseMap();
            CreateMap<NoteParam, NoteRequestModel>().ReverseMap();
        }
    }
}
