namespace NoteApplicationAPI.ResponseModel
{
    public class NoteByIdResponseModel
    {
        public int Id { get; set; }
        public string Category { get; set; } = string.Empty;
        public List<int> CategoryIds { get; set; } = new List<int>();
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
