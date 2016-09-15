using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpotifyRadio.Objects
{
    public class TokenRequest
    {
        public string grant_type { get { return "authorization_code"; } }
        public string code { get; set; }
        public string redirect_uri { get; set; }
    }
}