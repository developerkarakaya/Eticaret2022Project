using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Eticaret2022.Utils
{

    /* Samet Mirza Karakaya -- Ramazan İşçanan 
       Başlangıç Tarihi : 14 Ekim 2021 Perşembe
       Bitiş Tarihi : ?
    */
    public class BaseController:System.Web.Mvc.Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // sayfalar arası geçişi session'a göre yöneteceğim.
            base.OnActionExecuting(filterContext);
        }
    }
}