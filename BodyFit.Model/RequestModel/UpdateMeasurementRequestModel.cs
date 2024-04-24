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


        [DisplayName("Boyun �l��s�")]
        public decimal NeckSize { get; set; }

        [DisplayName("G���s �l��s�")]
        public decimal ChestSize { get; set; }

        [DisplayName("�st Kar�n �l��s�")]
        public decimal EpigastriumSize { get; set; }

        [DisplayName("G�bek �l��s�")]
        public decimal BellySize { get; set; }

        [DisplayName("Bel �l��s�")]
        public decimal WaistSize { get; set; }

        [DisplayName("Kal�a �l��s�")]
        public decimal ButtockSize { get; set; }

        [DisplayName("Basen �l��s�")]
        public decimal HaunchSize { get; set; }

        [DisplayName("Paz� �l��s�")]
        public decimal BicepsSize { get; set; }

        [DisplayName("�n Kol �l��s�")]
        public decimal UnderArm { get; set; }

        [DisplayName("Bald�r �l��s�")]
        public decimal CalfSize { get; set; }
    }
}
