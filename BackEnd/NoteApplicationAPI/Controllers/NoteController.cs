using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteApplicationAPI.RequestModel;
using NoteApplicationAPI.ResponseModel;
using NoteApplicationAPI.Services.Interface;

namespace NoteApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    public class NoteController : ControllerBase
    {
        private readonly INotesService _notesService;


        public NoteController(INotesService notesService)
        {
            _notesService = notesService;
        }

        [HttpPost("AddNote")]
        public async Task<SystemResponse> AddNote(NoteRequestModel noteRequestModel)
        {

            var response = await _notesService.AddNote(noteRequestModel);
            return response;
        }

        [HttpGet("getNoteDetails")]
        public async Task<List<NoteResponseModel>> getNoteDetails()
        {
            var response = await _notesService.getNoteDetails();
            return response;
        }  

        [HttpGet("getNoteDetailsById")]
        public async Task<NoteRequestModel> getNoteDetailsById(int Id)
        {
            var response = await _notesService.getNoteDetailsById(Id);
            return response;
        }

        [HttpDelete("DeleteNote")]
        public async Task<SystemResponse> DeleteNote(int Id)
        {
            var response = await _notesService.DeleteNote(Id);
            return response;
        }

    }
}
