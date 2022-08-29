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
    public class When_saving_orders : UsingOrdersControllerSpec
    {
        private ActionResult<Orders> _result;

        private Orders _orders;

        public override void Context()
        {
            base.Context();

            _orders = new Orders
            {
                orderid = 72,
                description = "description"
            };

            _ordersService.Save(_orders).Returns(_orders);
        }
        public override void Because()
        {
            _result = subject.Save(_orders);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _ordersService.Received(1).Save(_orders);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<Orders>();

            var resultList = (Orders)resultListObject;

            resultList.ShouldBe(_orders);
        }
    }
}
