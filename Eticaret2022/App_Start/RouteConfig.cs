using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Eticaret2022
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "anasayfaRoute",
                url: "anasayfa",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "Eticaret2022.Controllers" }
            );

            routes.MapRoute(
                name: "ProductDetailRoute",
                url: "{Title}-{id}",
                defaults: new { controller = "Detail", action = "Index" },
                 namespaces: new[] { "Eticaret2022.Controllers" }

                );


            routes.MapRoute(
                name: "girisRoute",
                url: "girisyap",
                defaults: new { controller = "Account", action = "Login", id = UrlParameter.Optional },
                namespaces: new[] { "Eticaret2022.Controllers" }
            );
            routes.MapRoute(
               name: "kayitolRoute",
               url: "kayitol",
               defaults: new { controller = "Account", action = "Register", id = UrlParameter.Optional },
               namespaces: new[] { "Eticaret2022.Controllers" }
           );

            routes.MapRoute(
             name: "hesabimRoute",
             url: "Hesabim",
             defaults: new { controller = "UserAccount", action = "ProfilBilgileri", id = UrlParameter.Optional },
             namespaces: new[] { "Eticaret2022.Controllers" }
         );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "Eticaret2022.Controllers" } 
            );
        }
    }
}
