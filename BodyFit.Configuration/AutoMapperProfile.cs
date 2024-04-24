using AutoMapper;
using MongoDB.Bson;

namespace BodyFit.Configuration
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ObjectId, string>().ConvertUsing(x => x.ToString());
            CreateMap<string, ObjectId>().ConvertUsing(x => ObjectId.Parse(x.ToString()));
        }
    }
}
