using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using backend.Entities.Entities;

namespace backend.Test.Api.OrdersControllerSpec
{
    public class When_getting_all_orders : UsingOrdersControllerSpec
    {
        private ActionResult<IEnumerable<Orders>> _result;

        private IEnumerable<Orders> _all_orders;
        private Orders _orders;

        public override void Context()
        {
            base.Context();

            _orders = new Orders{
                orderid = 32,
                description = "description"
            };

            _all_orders = new List<Orders> { _orders};
            _ordersService.GetAll().Returns(_all_orders);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _ordersService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<Orders>>();

            List<Orders> resultList = resultListObject as List<Orders>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_orders);
        }
    }
}
