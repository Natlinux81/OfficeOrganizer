using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OfficeOrganizer.helper
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email, string emailToken)
        {
            return $@"<html>
    <head></head>
    <body style=""margin:0;padding:0; font-family: Montserrat, sans-serif; justify-content: center; display: flex;"">
        <div style=""height: auto;background: linear-gradient(#71b7c4, #c7c7c7, #9485c0, #d395b5) no-repeat; padding: 30px;"">
            <div>
                    <h1 style=""text-align: center;"">Reset your Password</h1>
                    <hr>
                    <p style=""text-align: center;"">You`re receiving this e-mail because your requested a password reset for your OfficeOrganizer account</p>
                    <p>Please tap the button below to choose an new password</p>
                    <a href=""https://localhost:44491/reset?email={email}&code={emailToken}"" target=""_blank"" style=""background:#c7c7c7; padding: 10px; border: none;
                    color:black; border-radius: 10px; display:block; margin:0 auto; width:25%; text-align:center;text-decoration:none"">Reset Password</a>

                    <p>Kind Regards, <br><br></p>
                    OfficeOrganizer Team
            </div>            
        </div>
    </body>
</html>";
        }
    }
}