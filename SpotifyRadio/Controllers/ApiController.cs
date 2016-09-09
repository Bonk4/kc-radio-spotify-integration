using SpotifyRadio.Objects;
using SpotifyRadio.Scrapers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SpotifyRadio.Controllers
{
    public class ApiController : Controller
    {
        private List<RadioStation> _stations = new List<RadioStation>()
        {
            new RadioStation
            {
                Id = 1,
                Name = "96.5 - The Buzz",
                Url = @"http://krbz.tunegenie.com/"
            },
            new RadioStation
            {
                Id = 2,
                Name = "98.9 - The Rock!",
                Url = @"http://kqrc.tunegenie.com/"
            },
            new RadioStation
            {
                Id = 3,
                Name = "X105.1 Alternative",
                Url = @"http://kcjk.tunegenie.com/"
            }
        };

        //api/alternative GET
        //params: url (tunegenie site to scrape songs from)
        [HttpGet]
        public JsonResult Songs(int id)
        {
            var test = _stations.Max(x => x.Id);

            if (id > _stations.Max(x => x.Id))
            {
                throw new Exception("Invalid station ID.");
            }
            var scraper = new RadioWebScraper();

            var songs = scraper.GetSongs(_stations.First(x => x.Id == id).Url);

            return Json(songs, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Stations()
        {
            return Json(_stations, JsonRequestBehavior.AllowGet);
        }
    }
}