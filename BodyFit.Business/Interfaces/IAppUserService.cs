using BodyFit.Business.Base;
using BodyFit.DataAccess.Interfaces;
using BodyFit.Entities;
using BodyFit.Model.RequestModel;
using BodyFit.Model.ResponseModel;
using Microsoft.AspNetCore.Http;

namespace BodyFit.Business.Interfaces
{
    public interface IAppUserService : IBaseService<AppUser, IAppUserDataAccess>
    {
        LoginResultModel Login(LoginServiceRequestModel loginModel);
        void BatchLogin(HttpContext httpContext);
        LoginResultModel TokenBasedLogin(LoginServiceRequestModel model);
        AppUser? GetByUserName(string userName);
        RegisterResultModel Register(RegisterServiceRequestModel requestModel);
    }
}
