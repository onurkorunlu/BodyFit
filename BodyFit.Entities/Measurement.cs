using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BodyFit.Entities
{
    public class Measurement : MongoBaseEntity
    {
        public ObjectId AppUserId { get; set; } = ObjectId.GenerateNewId();

        public string StringAppUserId
        {
            get { return AppUserId.ToString(); }
        }

        public List<MeasurementDetail> MeasurementDetails { get; set; } = new List<MeasurementDetail>();
    }

    public class MeasurementDetail
    {

        private DateTime _Date { get; set; }

        [DisplayName("Tarih")]
        public DateTime Date
        {
            get
            {
                return _Date.ToLocalTime();
            }
            set => _Date = value.ToUniversalTime();
        }

        [DisplayName("Kilo")]
        public decimal Weight { get; set; }


        [DisplayName("Boyun Ölçüsü")]
        public decimal NeckSize { get; set; }

        [DisplayName("Göğüs Ölçüsü")]
        public decimal ChestSize { get; set; }

        [DisplayName("Üst Karın Ölçüsü")]
        public decimal EpigastriumSize { get; set; }

        [DisplayName("Göbek Ölçüsü")]
        public decimal BellySize { get; set; }

        [DisplayName("Bel Ölçüsü")]
        public decimal WaistSize { get; set; }

        [DisplayName("Kalça Ölçüsü")]
        public decimal ButtockSize { get; set; }

        [DisplayName("Basen Ölçüsü")]
        public decimal HaunchSize { get; set; }

        [DisplayName("Pazı Ölçüsü")]
        public decimal BicepsSize { get; set; }

        [DisplayName("Ön Kol Ölçüsü")]
        public decimal UnderArm { get; set; }

        [DisplayName("Baldır Ölçüsü")]
        public decimal CalfSize { get; set; }
    }
}
