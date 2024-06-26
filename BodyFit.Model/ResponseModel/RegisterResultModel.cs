﻿using BodyFit.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BodyFit.Model.ResponseModel
{
    public class LoginResultModel : ResultBase
    {
        public string Token { get; set; }
        public string ReturnUrl { get; set; }
        public DateTime ExpireDate { get; set; }
        public AppUser AppUser { get; set; }
        public AppUserRole AppUserRole { get; set; }
    }
}
