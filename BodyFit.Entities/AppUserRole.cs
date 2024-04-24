using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BodyFit.Entities
{
    public class AppUserRole : MongoBaseEntity
    {
        public string RoleName { get; set; }
    }
}
