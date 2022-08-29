using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using backend.Entities.Entities;


namespace backend.Test.Business.OrdersServiceSpec
{
    public class When_updating_orders : UsingOrdersServiceSpec
    {
        private Orders _result;
        private Orders _orders;

        public override void Context()
        {
            base.Context();

            _orders = new Orders
            {
                orderid = 16,
                description = "description"
            };

            _ordersRepository.Update(_orders.Id, _orders).Returns(_orders);
            
        }
        public override void Because()
        {
            _result = subject.Update(_orders.Id, _orders);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _ordersRepository.Received(1).Update(_orders.Id, _orders);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Orders>();

            _result.ShouldBe(_orders);
        }
    }
}
