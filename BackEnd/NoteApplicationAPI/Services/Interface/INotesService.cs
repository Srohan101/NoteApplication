using NoteApplicationAPI.RequestModel;
using NoteApplicationAPI.ResponseModel;
using System.Threading.Tasks;

namespace NoteApplicationAPI.Services.Interface
{
    public interface INotesService
    {
        Task<SystemResponse> AddNote(NoteRequestModel noteRequestModel);
        Task<List<NoteResponseModel>> getNoteDetails();
        Task<SystemResponse> DeleteNote(int Id);
        Task<NoteRequestModel> getNoteDetailsById(int Id);
    }
}
