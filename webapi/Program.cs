using com.spoonacular;
using Org.OpenAPITools.Client;
using webapi.API;

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

            var app = builder.Build();

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