namespace NoteApplicationAPI.Param
{
    public class NoteParam
    {
        public char Flag { get; set; }
        public int Id { get; set; }
        public string CategoryIds { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
