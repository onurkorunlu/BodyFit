using BodyFit.Business.Base;
using BodyFit.Business.Interfaces;
using BodyFit.DataAccess.Interfaces;
using BodyFit.Entities;

namespace BodyFit.Business.Services
{
    public class AppUserRoleService : BaseService<AppUserRole, IAppUserRoleDataAccess>, IAppUserRoleService
    {
        public AppUserRole? GetByRoleName(string name)
        {
            return FilterBy(x => x.RoleName == name).FirstOrDefault();
        }
    }
}
