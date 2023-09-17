using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OfficeOrganizer.Models;

namespace OfficeOrganizer.UtilityServices
{
    public interface IEMailService
    {
        void SendEmail(EmailModel emailModel);
    }
}