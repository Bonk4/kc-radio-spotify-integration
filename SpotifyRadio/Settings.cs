using System.Web.Configuration;

namespace SpotifyRadio
{
    public class Settings
    {
        public static string ClientId { get { return WebConfigurationManager.AppSettings["ClientId"]; } }
        public static string RedirectUri { get { return WebConfigurationManager.AppSettings["RedirectUri"]; } }
        public static string Scope { get { return WebConfigurationManager.AppSettings["Scope"]; } }
    }
}