namespace NoteApplicationAPI.RequestModel
{
    public class NoteRequestModel
    {
        public int Id { get; set; }
        public List<int> CategoryIds { get; set; } = new List<int>();
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
