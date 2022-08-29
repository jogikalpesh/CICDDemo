using System.Collections.Generic;
using backend.Business.Interfaces;
using backend.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        IOrdersService _OrdersService;
        public OrdersController(IOrdersService OrdersService)
        {
            _OrdersService = OrdersService;
        }

        // GET: api/Orders
        [HttpGet]
        public ActionResult<IEnumerable<Orders>> Get()
        {
            return Ok(_OrdersService.GetAll());
        }

        [HttpPost]
        public ActionResult<Orders> Save(Orders Orders)
        {
            return Ok(_OrdersService.Save(Orders));

        }

        [HttpPut("{id}")]
        public ActionResult<Orders> Update([FromRoute] string id, Orders Orders)
        {
            return Ok(_OrdersService.Update(id, Orders));

        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            return Ok(_OrdersService.Delete(id));

        }


    }
}
