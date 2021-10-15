using Eticaret2022.BussinessLayer.Basket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Eticaret2022.Controllers
{
    public class BasketController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public Basket GetBasket()
        {
            // sepete ürün ekleme ile ilgili işlem yapılacağı zaman getbasket methodu
            // çağrılır ve sessionda basket objesi yok ise olusturur. 
            // uı daha sonra yapılacak şimdilik backend tamamlandı.
            var Basket = (Basket)Session["Basket"];
            if(Basket == null)
            {
                Basket = new Basket();
                Session["Basket"] = Basket;
            }
            return Basket;
        }
    }
}