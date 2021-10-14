using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eticaret2022.DataEntities.Repositories.Abstract
{
    public interface IRepository<TEntity> where TEntity:class
    {
        TEntity GetById(int Id);

        IEnumerable<TEntity> GetAll();

        void Add(TEntity entity);

        void AddRange(IEnumerable<TEntity> entities);

        void Remove(int Id);

        void RemoveRange(IEnumerable<TEntity> entities);
    }
}
