namespace NoteApplicationAPI.ResponseModel
{
    public class TokenResponseModel
    {
        public int userId { get; set; }
        public string? Name { get; set; }
        public string? Country { get; set; }
        public string? Email { get; set; }
        public DateTime DOB { get; set; } = DateTime.Now;
        public string? Token { get; set; }
    }
}
