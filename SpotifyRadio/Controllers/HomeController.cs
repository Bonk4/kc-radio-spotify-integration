using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SpotifyRadio.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Songs()
        {
            return View();
        }

        public ActionResult Menu()
        {
            return View();
        }
    }
}