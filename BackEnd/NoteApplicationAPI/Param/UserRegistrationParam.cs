namespace NoteApplicationAPI.Param
{
    public class UserRegistrationParam
    {
        public char Flag { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public DateTime? DOB { get; set; }
        public int CountryId { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
