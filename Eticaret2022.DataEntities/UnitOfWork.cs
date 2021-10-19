using Eticaret2022.DataEntities.Repositories.Abstract;
using Eticaret2022.DataEntities.Repositories.Concrete;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eticaret2022.DataEntities
{
    public class UnitOfWork : IUnitOfWork
    {
        private Eticaret2022Entities _context;

        public UnitOfWork(Eticaret2022Entities context)
        {
            _context = context;
            UrunlerRepository = new UrunlerRepository(_context);
            KategorilerRepository = new KategorilerRepository(_context);

        }
        public IUrunlerRepository UrunlerRepository { get; private set; }
        public IKategorilerRepository KategorilerRepository { get; private set; }


        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
