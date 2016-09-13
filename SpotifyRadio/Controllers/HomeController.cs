using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpotifyRadio.Objects;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SpotifyRadio.Controllers
{
    public class HomeController : Controller
    {
        private string client_id = "23f299b83b5e45c0ad209144ac4e9c5c";
        private string client_secret = "6efc18a526c942d8af4e3ebcdb658957";
        private string redirect_uri = @"http://localhost:27784/";
        private string token_uri = @"https://accounts.spotify.com/api/token";
        private string user_uri = @"https://api.spotify.com/v1/me";

        public ActionResult Index(string code = null, string state = null, string error = null)
        {
            if (code != null)
            {
                string result = null;
                //get user spotify credentials
                using (var client = new WebClient())
                {
                    var values = new NameValueCollection();
                    var postData = new TokenRequest
                    {
                        code = code,
                        redirect_uri = redirect_uri
                    };

                    var json = JsonConvert.SerializeObject(postData);

                    //var response = client.UploadValues(token_uri, postData);

                    var postRequest = WebRequest.Create(token_uri);
                    postRequest.Method = "POST";

                    //result = Encoding.Default.GetString(response);

                    if (!string.IsNullOrEmpty(result))
                    {
                        JObject data = JObject.Parse(result);
                        var access_token = data["access_token"];
                        var refresh_token = data["refresh_token"];

                        var request = WebRequest.Create(user_uri);
                        request.Method = "GET";
                        request.Headers["Authorization"] = "Bearer " + access_token;

                        var user = request.GetResponse();

                        ViewBag.code = code;
                        ViewBag.user = user;
                    }
                }
            }

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

        public ActionResult Callback(string code = "", string state = "", string error = "")
        {
            var request = Request;

            // save the data sent back

            return Index();
        }

        public ActionResult Login()
        {
            Response.Redirect("https://accounts.spotify.com/authorize?" +
                "client_id=" + client_id +
                "&response_type=code&redirect_uri=" + redirect_uri);
            return Callback();
        }
    }
}