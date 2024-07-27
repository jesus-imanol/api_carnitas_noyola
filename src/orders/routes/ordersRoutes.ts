import { Router } from 'express';
import { createOrder, deletedOrderLogic, deleteOrder, getOrderById, getOrders, getOrdersWithProductsAndUser, updatedOrder,getOrdersWIthProductsByUserId } from '../controllers/ordersController';
//import { authMiddleware } from '../../shared/middlewares/auth';

const ordersRoutes: Router = Router();

ordersRoutes.get('/',getOrders);
ordersRoutes.get('/order/orders_id', getOrderById);
ordersRoutes.post('/',createOrder);
ordersRoutes.put('/:orders_id', updatedOrder);
ordersRoutes.delete('/:orders_id', deleteOrder);
ordersRoutes.put("/delete/:orders_id",deletedOrderLogic);
ordersRoutes.get("/ordersWithProducts", getOrdersWithProductsAndUser);
ordersRoutes.get("/ordersByUserId/:user_id_fk",getOrdersWIthProductsByUserId)
export default ordersRoutes;