using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using backend.Entities.Entities;

namespace backend.Test.Business.OrdersServiceSpec
{
    public class When_getting_all_orders : UsingOrdersServiceSpec
    {
        private IEnumerable<Orders> _result;

        private IEnumerable<Orders> _all_orders;
        private Orders _orders;

        public override void Context()
        {
            base.Context();

            _orders = new Orders{
                orderid = 57,
                description = "description"
            };

            _all_orders = new List<Orders> { _orders};
            _ordersRepository.GetAll().Returns(_all_orders);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _ordersRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Orders>>();

            List<Orders> resultList = _result as List<Orders>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_orders);
        }
    }
}
