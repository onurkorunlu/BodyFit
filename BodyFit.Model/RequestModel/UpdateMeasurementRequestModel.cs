using BodyFit.Entities.Enums;
using System.ComponentModel;

namespace BodyFit.Model.RequestModel
{
    public class UpdateMeasurementRequestModel
    {
        [DisplayName("Tarih")]
        public DateTime Date { get; set; }

        [DisplayName("Kilo")]
        public decimal Weight { get; set; }


        [DisplayName("Boyun Ölçüsü")]
        public decimal NeckSize { get; set; }

        [DisplayName("Göðüs Ölçüsü")]
        public decimal ChestSize { get; set; }

        [DisplayName("Üst Karýn Ölçüsü")]
        public decimal EpigastriumSize { get; set; }

        [DisplayName("Göbek Ölçüsü")]
        public decimal BellySize { get; set; }

        [DisplayName("Bel Ölçüsü")]
        public decimal WaistSize { get; set; }

        [DisplayName("Kalça Ölçüsü")]
        public decimal ButtockSize { get; set; }

        [DisplayName("Basen Ölçüsü")]
        public decimal HaunchSize { get; set; }

        [DisplayName("Pazý Ölçüsü")]
        public decimal BicepsSize { get; set; }

        [DisplayName("Ön Kol Ölçüsü")]
        public decimal UnderArm { get; set; }

        [DisplayName("Baldýr Ölçüsü")]
        public decimal CalfSize { get; set; }
    }
}
