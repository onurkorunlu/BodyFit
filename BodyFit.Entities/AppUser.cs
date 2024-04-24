using BodyFit.Entities.Enums;
using MongoDB.Bson;
using System.ComponentModel;

namespace BodyFit.Entities
{
    public class AppUser : MongoBaseEntity
    {
        [DisplayName("Kullanıcı")]
        public string Username { get; set; }

        [DisplayName("E-Posta Adresi")]
        public string EmailAddress { get; set; }


        [DisplayName("Şifre")]
        public string Password { get; set; }


        [DisplayName("Kullanıcı Rolü")]
        public ObjectId RoleId { get; set; }

        public int Height { get; set; }
        public decimal TargetWeight { get; set; }

        public ExercisePeriod ExercisePeriod { get; set; }
        public TargetType TargetType { get; set; }
        public DailyActivityType DailyActivityType { get; set; }

        public Dictionary<PreferencesType, object> Preferences { get; set; } = new Dictionary<PreferencesType, object>();
    }

    public enum TargetType
    {
        None,
        LoseWeight,
        Strong,
        Healty
    }

    public enum DailyActivityType
    {
        None,
        Sedentary,
        Dynamic,
    }   

    public enum ExercisePeriod
    {
        None,
        Everyday,
        AFewTimesInWeek,
        AFewTimesInMonth,
        Never
    }
}
