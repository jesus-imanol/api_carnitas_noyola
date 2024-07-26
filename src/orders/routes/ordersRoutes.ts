import { Router } from 'express';
import { createOrder, deletedOrderLogic, deleteOrder, getOrderById, getOrders, getOrdersWithProductsAndUser, updatedOrder, } from '../controllers/ordersController';
//import { authMiddleware } from '../../shared/middlewares/auth';

const ordersRoutes: Router = Router();

ordersRoutes.get('/',getOrders);
ordersRoutes.get('/order/orders_id', getOrderById);
ordersRoutes.post('/',createOrder);
ordersRoutes.put('/:product_id', updatedOrder);
ordersRoutes.delete('/:product_id', deleteOrder);
ordersRoutes.put("/delete/:orders_id",deletedOrderLogic);
ordersRoutes.get("/ordersWithProducts", getOrdersWithProductsAndUser);
export default ordersRoutes;