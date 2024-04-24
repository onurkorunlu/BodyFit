using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using BodyFit.Business.Interfaces;
using BodyFit.Business.Services;
using BodyFit.Core;
using BodyFit.DataAccess.Interfaces;
using BodyFit.DataAccess.Services;
using System.Text;

namespace BodyFit.Configuration
{
    public class Configurations
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddTransient<IApplicationContext, ApplicationContext>();

            if (System.Reflection.Assembly.GetEntryAssembly()?.GetName()?.Name == "BodyFit.Server")
            {
                ConfigurationCache.Instance.TryGet<string>("JwtSecret", out string jwtSecretKey);
                var key = Encoding.ASCII.GetBytes(jwtSecretKey);
                services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                }).AddCookie();
            }
            else
            {
                services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
               .AddCookie(options =>
               {
                   options.LoginPath = "/User/Login";
                   options.AccessDeniedPath = "/User/AccessDenied";
                   options.LogoutPath = "/User/Logout";
               });
            }
        }

        public static void SetConfigurations(IConfiguration configuration)
        {
            //DB
            ConfigurationCache.Instance.Add("MongoDbConnectionString", configuration.GetSection("MongoConnection:ConnectionString").Value);
            ConfigurationCache.Instance.Add("MongoDbName", configuration.GetSection("MongoConnection:Database").Value);

            //API
            ConfigurationCache.Instance.Add("JwtSecret", configuration.GetSection("AppSettings:JwtSecret").Value);
            ConfigurationCache.Instance.Add("WC_API_KEY", configuration.GetSection("AppSettings:WC_API_KEY").Value);
            ConfigurationCache.Instance.Add("WC_API_SECRET", configuration.GetSection("AppSettings:WC_API_SECRET").Value);
            ConfigurationCache.Instance.Add("SHOPIER_PAT", configuration.GetSection("AppSettings:SHOPIER_PAT").Value);
            ConfigurationCache.Instance.Add("BATCH_API_KEY", configuration.GetSection("AppSettings:BATCH_API_KEY").Value);
        }

        public static void RegisterServices()
        {
            AppServiceProvider.Instance.RegisterAsSingleton(typeof(IMapper), AutoMapperBuilder.GetMapper());
            AppServiceProvider.Instance.RegisterAsSingleton(typeof(IMemoryCache), new MemoryCache(new MemoryCacheOptions()
            {
                ExpirationScanFrequency = TimeSpan.FromHours(1)
            }));
        }

        public static void RegisterBusinessServices()
        {
            
 			AppServiceProvider.Instance.Register(typeof(IAppUserService), new AppUserService());
 			AppServiceProvider.Instance.Register(typeof(IAppUserRoleService), new AppUserRoleService());
 			AppServiceProvider.Instance.Register(typeof(IMeasurementService), new MeasurementService());
 			//@RegisterBusinessPointer
        }

        public static void RegisterDataAccessServices()
        {
            
 			AppServiceProvider.Instance.Register(typeof(IAppUserDataAccess), new AppUserDataAccess());
 			AppServiceProvider.Instance.Register(typeof(IAppUserRoleDataAccess), new AppUserRoleDataAccess());
 			AppServiceProvider.Instance.Register(typeof(IMeasurementDataAccess), new MeasurementDataAccess());
 			//@RegisterDataAccessPointer
        }

    }
}
