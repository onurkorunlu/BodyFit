using BodyFit.Entities;
using BodyFit.Entities.Enums;

namespace BodyFit.Model.RequestModel
{
    public class UpdateAppUserRequestModel
    {
        public int Height { get; set; }
        public decimal TargetWeight { get; set; }
        public TargetType TargetType { get; set; }
        public DailyActivityType DailyActivityType { get; set; }
        public Dictionary<PreferencesType, object>? Preferences { get; set; }
    }
}
