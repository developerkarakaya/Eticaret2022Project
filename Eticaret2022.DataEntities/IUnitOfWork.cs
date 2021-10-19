using Eticaret2022.DataEntities.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eticaret2022.DataEntities
{
    public interface IUnitOfWork:IDisposable
    {
         IUrunlerRepository UrunlerRepository { get; }
        IKategorilerRepository KategorilerRepository { get; }
        int Complete();
    }
}
