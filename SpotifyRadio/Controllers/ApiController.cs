using SpotifyRadio.Scrapers;
using System.Web.Mvc;

namespace SpotifyRadio.Controllers
{
    public class ApiController : Controller
    {
        private string theBuzzFeed = @"http://krbz.tunegenie.com/";
        private string theRockFeed = @"http://kqrc.tunegenie.com/";

        //api/alternative GET
        [HttpGet]
        public JsonResult Alternative()
        {
            var scraper = new RadioWebScraper();

            var songs = scraper.GetSongs(theBuzzFeed);

            return Json(songs, JsonRequestBehavior.AllowGet);
        }

        //api/rock GET
        [HttpGet]
        public JsonResult Rock()
        {
            var scraper = new RadioWebScraper();

            var songs = scraper.GetSongs(theRockFeed);

            return Json(songs, JsonRequestBehavior.AllowGet);
        }
    }
}