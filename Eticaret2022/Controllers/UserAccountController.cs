using Eticaret2022.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Eticaret2022.Controllers
{
    public class UserAccountController : BaseController
    {
        // GET: UserAccount
        public ActionResult ProfilBilgileri()
        {
            return View();
        }
    }
}