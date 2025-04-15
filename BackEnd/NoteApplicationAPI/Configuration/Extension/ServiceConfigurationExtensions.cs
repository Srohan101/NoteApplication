using NoteApplicationAPI.Services.Implementation;
using Microsoft.OpenApi.Models;
using NoteApplicationAPI.Services.Interface;

namespace NoteApplicationAPI.Configuration.Extension
{
    public static class ServiceConfigurationExtensions
    {
        internal static IServiceCollection AddCustomServices(this IServiceCollection services)
        {
            //Transient objects are always different; a new instance is provided to every controller and every service.
            //Scoped objects are the same within a request, but different across differentS requests.
            //Singleton objects are the same for every object and every request.
            services.AddSwaggerDocumentation();
            services.AddHttpContextAccessor();
            services.AddTransient<ICurrentUserService,CurrentUserService>();
            services.AddTransient<IDapperRepository, DapperRepository>();
            services.AddTransient<IServiceCollection, ServiceCollection>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<INotesService,NotesService>();
            return services;
        }

        internal static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Auth API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement{
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    }
                },
                Array.Empty<string>()
            }
            });
            });
            return services;
        }
    }
}
