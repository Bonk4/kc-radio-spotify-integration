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

        public ActionResult Login()
        {
            //get an oauth code
            return Redirect("https://accounts.spotify.com/authorize?" +
                "client_id=" + Settings.ClientId +
                "&response_type=token" +
                "&scope=" + Settings.Scope + 
                "&redirect_uri=" + Settings.RedirectUri);
        }
    }
}