using System.Text;
using OfficeOrganizer.Data;
using Microsoft.EntityFrameworkCore;
using OfficeOrganizer.UtilityServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore.Storage;
using OfficeOrganizer.Models;
using Org.BouncyCastle.Security;
using OfficeOrganizer.helper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

// Get Connection
var mariaDbSettings =builder.Configuration.GetRequiredSection("MariaDbSettings").Get<MariaDbSettings>();
var connectionString = mariaDbSettings.ConnectionString;
builder.Services.AddDbContext<ApplicationDbContext>(options =>{
    options.UseMySql(connectionString, ServerVersion.AutoDetect (connectionString));
});

builder.Services.AddScoped<IEMailService, EmailService>();

// builder.Services.AddDbContext<AuthenticationDbContext>(options =>{
//     options.UseSqlServer(connectionString);
// });

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication")),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew = TimeSpan.Zero
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();   
}

app.UseHttpsRedirection();
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

using ( var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.Run();
