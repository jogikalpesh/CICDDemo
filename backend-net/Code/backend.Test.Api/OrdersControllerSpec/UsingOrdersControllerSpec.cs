using NSubstitute;
using backend.Test.Framework;
using backend.Api.Controllers;
using backend.Business.Interfaces;


namespace backend.Test.Api.OrdersControllerSpec
{
    public abstract class UsingOrdersControllerSpec : SpecFor<OrdersController>
    {
        protected IOrdersService _ordersService;

        public override void Context()
        {
            _ordersService = Substitute.For<IOrdersService>();
            subject = new OrdersController(_ordersService);

        }

    }
}
