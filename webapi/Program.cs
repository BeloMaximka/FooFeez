using com.spoonacular;
using Org.OpenAPITools.Client;
using webapi.API;
using System.Text.Json;

namespace webapi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();

            
            try
            {
                // configure spoonacular sdk
                Configuration.ApiKey.Add("x-api-key", File.ReadAllText("key"));
            }
            catch (Exception)
            {
                Console.WriteLine("Missing api key");
                Console.ReadKey();
                return;
            }
            
            builder.Services.AddSingleton<ICustomRecipesApi, CustomRecipesApi>();

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });

            var app = builder.Build();

            // CORS
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

    }
}