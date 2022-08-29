using backend.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Data.Interfaces
{
    public interface IOrdersRepository : IGetAll<Orders>, ISave<Orders>, IUpdate<Orders, string>, IDelete<string>
    {
    }
}
