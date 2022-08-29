using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Business.Services
{
    public class OrdersService : IOrdersService
    {
        IOrdersRepository _OrdersRepository;

        public OrdersService(IOrdersRepository OrdersRepository)
        {
           this._OrdersRepository = OrdersRepository;
        }
        public IEnumerable<Orders> GetAll()
        {
            return _OrdersRepository.GetAll();
        }

        public Orders Save(Orders Orders)
        {
            _OrdersRepository.Save(Orders);
            return Orders;
        }

        public Orders Update(string id, Orders Orders)
        {
            return _OrdersRepository.Update(id, Orders);
        }

        public bool Delete(string id)
        {
            return _OrdersRepository.Delete(id);
        }

    }
}
