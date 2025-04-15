namespace NoteApplicationAPI.ResponseModel
{
    public class NoteResponseModel
    {
        public int Id { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
    }
}
