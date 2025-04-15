namespace NoteApplicationAPI.Services.Interface
{
    public interface ICurrentUserService
    {
        string? Name { get; }
        string? Email { get; }
        int? UserId { get; }
        string? Country { get; }
        DateTime?DOB { get; }
    }
}
