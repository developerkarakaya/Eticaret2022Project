using Eticaret2022.DataEntities.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eticaret2022.DataEntities.Repositories.Concrete
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected Eticaret2022Entities _dbContext;
        private DbSet<TEntity> _DbSet;


        public Repository(Eticaret2022Entities context)
        {
            _dbContext = context;
            _DbSet = _dbContext.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            _DbSet.Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            _DbSet.AddRange(entities);

        }

        public IEnumerable<TEntity> GetAll()
        {
            return _DbSet.ToList();
        }

        public TEntity GetById(int Id)
        {
            return _DbSet.Find(Id);
        }

        public void Remove(int Id)
        {
            _DbSet.Remove(GetById(Id));
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            _DbSet.RemoveRange(entities);
        }
    }
}
