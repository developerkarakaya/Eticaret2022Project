using Eticaret2022.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Eticaret2022.Controllers
{
    public class DetailController : Controller
    {
        UnitOfWork uow = new UnitOfWork(new Eticaret2022.DataEntities.Eticaret2022Entities());
        // GET: Detail
        public ActionResult Index(string Title,int id)
        {
            try
            {
                    var model = uow.UrunlerRepository.GetById(id);
                    return View(model);
            }
            catch (Exception)
            {
                return View("");
            }
        }
    }
}