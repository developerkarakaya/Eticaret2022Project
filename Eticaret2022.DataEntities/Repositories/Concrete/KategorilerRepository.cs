using Eticaret2022.DataEntities.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eticaret2022.DataEntities.Repositories.Concrete
{

   public class KategorilerRepository :Repository<Kategoriler>,IKategorilerRepository
    {
        public KategorilerRepository(Eticaret2022Entities context):base(context)
        {

        }
    }
}
