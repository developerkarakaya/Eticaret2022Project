using Eticaret2022.BussinessLayer.Basket;
using Eticaret2022.DataEntities;
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
            return View(GetBasket());
        }
        [HttpPost]
        public JsonResult AddProduct(int Id, int adet)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork(new Eticaret2022Entities()))
                {
                    var Product = uow.UrunlerRepository.GetById(Id);
                    if (Product != null)
                    {
                        GetBasket().AddProduct(Product, adet);
                        return Json(new { rtnValue = true, message = "Ürün Sepete Eklendi !" });
                    }
                    else
                    {
                        return Json(new { rtnValue = false, message = "Ürün Sepete Eklenirken Sorun Oluştu.Lütfen Tekrar Deneyiniz !" });
                    }
                }
            }
            catch (Exception e)
            {
                return Json(new { rtnValue = false, message = "Ürün Sepete Eklenirken Sorun Oluştu.Lütfen Tekrar Deneyiniz !" });
            }
        }

        [HttpPost]
        public JsonResult RemoveProduct(int Id)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork(new Eticaret2022Entities()))
                {
                    var Product = uow.UrunlerRepository.GetById(Id);
                    if (Product != null)
                    {
                        GetBasket().DeleteProduct(Product);
                        return Json(new { rtnValue = true, message = "Ürün Sepetinizden Çıkarılmıştır !" });
                    }
                    else
                    {
                        return Json(new { rtnValue = false, message = "Ürün Sepetten Çıkarılırken Sorun Oluştu.Lütfen Tekrar Deneyiniz !" });
                    }
                }
            }
            catch (Exception)
            {
                return Json(new { rtnValue = false, message = "Ürün Sepetten Çıkarılırken Sorun Oluştu.Lütfen Tekrar Deneyiniz !" });
            }
        }

        public Basket GetBasket()
        {
            // sepete ürün ekleme ile ilgili işlem yapılacağı zaman getbasket methodu
            // çağrılır ve sessionda basket objesi yok ise olusturur. 
            // uı daha sonra yapılacak şimdilik backend tamamlandı.
            var Basket = (Basket)Session["Basket"];
            if (Basket == null)
            {
                Basket = new Basket();
                Session["Basket"] = Basket;
            }
            return Basket;
        }

        [HttpPost]
        public void ClearBasket()
        {
            GetBasket().BasketLines.Clear();
        }
    }
}