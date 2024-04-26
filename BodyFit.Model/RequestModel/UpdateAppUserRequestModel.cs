using BodyFit.Entities;
using BodyFit.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace BodyFit.Model.RequestModel
{
    public class UpdateAppUserRequestModel
    {
        public int Height { get; set; }
        public decimal TargetWeight { get; set; }
        public TargetType TargetType { get; set; }
        public DailyActivityType DailyActivityType { get; set; }
        public ExercisePeriod ExercisePeriod { get; set; }
        public Dictionary<PreferencesType, object>? Preferences { get; set; }
        public GenderType Gender { get; set; }
        public int Age { get; set; }
    }
}
