using AutoMapper;
using NoteApplicationAPI.Configuration.Extension;
using NoteApplicationAPI.Param;
using NoteApplicationAPI.RequestModel;
using NoteApplicationAPI.ResponseModel;
using NoteApplicationAPI.Services.Interface;
using System.Text.Json;

namespace NoteApplicationAPI.Services.Implementation
{
    public class NotesService : INotesService
    {
        public IDapperRepository _dapperRepo;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private string storedProcedure = "spNoteDetails";
        public NotesService(IDapperRepository dapperRepository,IMapper mapper, ICurrentUserService currentUserService)
        {
            _dapperRepo = dapperRepository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<SystemResponse> AddNote(NoteRequestModel noteRequestModel)
        {
            try
            {
                NoteParam param = new();
                param = _mapper.Map<NoteParam>(noteRequestModel);
                param.CreatedBy = _currentUserService.UserId!.Value;
                param.CategoryIds = JsonSerializer.Serialize(noteRequestModel.CategoryIds);
                param.Flag = 'I';
                var response = await _dapperRepo.ExecuteAsync(storedProcedure, param);
                return response;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<List<NoteResponseModel>> getNoteDetails()
        {
            try
            {
                NoteParam param = new();
                param.Flag = 'G';
                param.CreatedBy = _currentUserService.UserId!.Value;
                var response = await _dapperRepo.GetQueryResultAsync<NoteResponseModel>(storedProcedure, param);
                return response;
                
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }    
        public async Task<NoteByIdResponseModel> getNoteDetailsById(int Id)
        {
            try
            {
                NoteParam param = new();
                param.Flag = 'H';
                param.CreatedBy = _currentUserService.UserId!.Value;
                param.Id =  Id;
                var res = await _dapperRepo.GetFromMultipleQuery<NoteByIdResponseModel, int>(storedProcedure, param);
                var response = ((List<NoteByIdResponseModel>)res[0]).FirstOrDefault();
                response.CategoryIds = (List<int>)res[1];
                return response;
                
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<SystemResponse> DeleteNote(int Id)
        {
            try
            {
                NoteParam param = new();
                param.CreatedBy = _currentUserService.UserId!.Value;
                param.Id = Id;
                param.Flag = 'D';
                var response = await _dapperRepo.ExecuteAsync(storedProcedure, param);
                return response;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
