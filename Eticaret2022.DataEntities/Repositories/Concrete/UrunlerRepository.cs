using Eticaret2022.DataEntities.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eticaret2022.DataEntities.Repositories.Concrete
{
    public class UrunlerRepository :Repository<Urunler>,IUrunlerRepository
    {
        public UrunlerRepository(Eticaret2022Entities context) : base(context)
        {
        }
    }
}
