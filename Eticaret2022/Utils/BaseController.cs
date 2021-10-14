using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Eticaret2022.Utils
{
    public class BaseController:System.Web.Mvc.Controller
    {

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // sayfalar arası geçişi session'a göre yöneteceğim.
            base.OnActionExecuting(filterContext);
        }
    }
}