using NSubstitute;
using backend.Test.Framework;
using backend.Business.Services;
using backend.Data.Interfaces;

namespace backend.Test.Business.OrdersServiceSpec
{
    public abstract class UsingOrdersServiceSpec : SpecFor<OrdersService>
    {
        protected IOrdersRepository _ordersRepository;

        public override void Context()
        {
            _ordersRepository = Substitute.For<IOrdersRepository>();
            subject = new OrdersService(_ordersRepository);

        }

    }
}
