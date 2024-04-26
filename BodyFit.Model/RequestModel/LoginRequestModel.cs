using BodyFit.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BodyFit.Model.RequestModel
{
    public class RegisterRequestModel
    {
        [Required(ErrorMessage = "Kullanıcı adı girilmesi zorunludur.")]
        [MinLength(4, ErrorMessage = "Kullanıcı adı en az 4 karakter olmalıdır."), MaxLength(50, ErrorMessage = "Kullanıcı adı en fazla 50 karakter olmaldır.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Şifre girilmesi zorunludur.")]
        [MinLength(7, ErrorMessage = "Şifre en az 7 karakter olmalıdır."), MaxLength(50, ErrorMessage = "Şifre en fazla 50 karakter olmaldır.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "E-Posta adresi girilmesi zorunludur.")]
        [EmailAddress(ErrorMessage = "Lütfen geçerli bir e-posta adresi giriniz.")]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage = "Yaşınızı giriniz.")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Boyunuzu giriniz.")]
        public int Height { get; set; }

        [Required(ErrorMessage = "Hedef kilonuzu giriniz.")]
        public decimal TargetWeight { get; set; }

        [Required(ErrorMessage = "Egzersiz sıklığınızı seçiniz.")]
        public ExercisePeriod ExercisePeriod { get; set; }

        [Required(ErrorMessage = "Hedefinizi seçiniz.")]
        public TargetType TargetType { get; set; }

        [Required(ErrorMessage = "Günlük aktivitenizi seçiniz.")]
        public DailyActivityType DailyActivityType { get; set; }

        [Required(ErrorMessage = "Cinsiyetinizi seçiniz.")]
        public GenderType Gender { get; set; }

    }
}
