using Eticaret2022.DataEntities;
using Eticaret2022.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Eticaret2022.DataEntities.Repositories.Abstract;
using Eticaret2022.DataEntities.Repositories.Concrete;
using Eticaret2022.BussinessLayer.Basket;
using Eticaret2022.Models;

namespace Eticaret2022.Controllers
{
    public class HomeController : BaseController
    {
        UnitOfWork uow = new UnitOfWork(new Eticaret2022Entities());
        // deneme push
        public ActionResult Index()
        {

            var urunlist = uow.UrunlerRepository.GetAll();
            return View(urunlist);
        }

        public PartialViewResult Basket()
        {
            if(Session["Basket"] != null)
            {
                return PartialView((Basket)Session["Basket"]);
            }else
            {
                return PartialView(new Basket { });
            }
        }

        public PartialViewResult HeaderTopMenu()
        {

            var kategoriListe = uow.KategorilerRepository.GetAll();
            return PartialView(kategoriListe);
        }

         public ActionResult deneme()
        {
            return View();
        }
      

    }
}