using BodyFit.Business.Base;
using BodyFit.DataAccess.Interfaces;
using BodyFit.Entities;

namespace BodyFit.Business.Interfaces
{
    public interface IAppUserRoleService : IBaseService<AppUserRole, IAppUserRoleDataAccess>
    {
        AppUserRole? GetByRoleName(string name);
    }
}
