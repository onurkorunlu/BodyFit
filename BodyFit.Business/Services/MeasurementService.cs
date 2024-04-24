using BodyFit.Business.Base;
using BodyFit.Business.Interfaces;
using BodyFit.DataAccess.Interfaces;
using BodyFit.Entities;
using MongoDB.Bson;

namespace BodyFit.Business.Services
{
    public class MeasurementService : BaseService<Measurement, IMeasurementDataAccess>, IMeasurementService
    {
        public Measurement? GetAll(string authenticatedUserId)
        {
            return FilterBy(x => x.AppUserId == ObjectId.Parse(authenticatedUserId)).FirstOrDefault();
        }
    }
}
