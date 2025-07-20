
using Back.Models;
using Microsoft.EntityFrameworkCore;

namespace Back
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            //      DB_CONFIGURATION          //
            string host = configuration["POSTGRES_HOST"]!;
            string port = configuration["POSTGRES_PORT"]!;
            string database = configuration["POSTGRES_DB"]!;
            string username = configuration["POSTGRES_USER"]!;
            string password = configuration["POSTGRES_PASSWORD"]!;
            string conStr = $"Host={host};Port={port};Database={database};Username={username};Password={password}";
           
            builder.Services.AddDbContext<ApplicationDBContext>(options => options.UseNpgsql(conStr));
            /////////////////////////////////////

            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
