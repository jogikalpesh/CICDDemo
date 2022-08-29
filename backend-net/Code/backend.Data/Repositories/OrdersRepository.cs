using backend.Data.Interfaces;
using backend.Entities.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Data.Repositories
{
    public class OrdersRepository : IOrdersRepository
    {
        private IGateway _gateway;
        private string _collectionName = "Orders";

        public OrdersRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Orders> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Orders>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public bool Save(Orders entity)
        {
            _gateway.GetMongoDB().GetCollection<Orders>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Orders Update(string id, Orders entity)
        {
            var update = Builders<Orders>.Update
                .Set(e => e.orderid, entity.orderid )
                .Set(e => e.description, entity.description );

            var result = _gateway.GetMongoDB().GetCollection<Orders>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Orders>(_collectionName)
                         .DeleteOne(e => e.Id == id);
            return result.IsAcknowledged;
        }
    }
}
