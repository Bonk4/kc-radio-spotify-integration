using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpotifyAPI.Web.Auth;
using SpotifyAPI.Web.Enums;
using SpotifyAPI.Web.Models;
using SpotifyRadio.Objects;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SpotifyRadio.Controllers
{
    public class HomeController : Controller
    {
        private string client_id = "23f299b83b5e45c0ad209144ac4e9c5c";
        private string redirect_uri = @"http://localhost:27784/";
        private string scope = "playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private";
        
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
                "client_id=" + client_id +
                "&response_type=token" +
                "&scope=" + scope + 
                "&redirect_uri=" + redirect_uri);
        }
    }
}