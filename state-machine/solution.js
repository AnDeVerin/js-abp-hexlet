import Order from './Order';

export const init = items => new Order(items);

export const cancel = (order) => {
  if (order.can('cancel')) {
    order.cancel();
  }
};
