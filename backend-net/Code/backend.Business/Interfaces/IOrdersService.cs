using backend.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Business.Interfaces
{
    public interface IOrdersService
    {      
        IEnumerable<Orders> GetAll();
        Orders Save(Orders classification);
        Orders Update(string id, Orders classification);
        bool Delete(string id);

    }
}
