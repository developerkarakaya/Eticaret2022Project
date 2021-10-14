using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Eticaret2022.Startup))]
namespace Eticaret2022
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
