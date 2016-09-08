using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SpotifyRadio.Startup))]
namespace SpotifyRadio
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
