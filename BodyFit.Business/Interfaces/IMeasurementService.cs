using BodyFit.Business.Base;
using BodyFit.DataAccess.Interfaces;
using BodyFit.Entities;

namespace BodyFit.Business.Interfaces
{
    public interface IMeasurementService : IBaseService<Measurement, IMeasurementDataAccess>
    {
        Measurement? GetAll(string authenticatedUserId);
    }
}
