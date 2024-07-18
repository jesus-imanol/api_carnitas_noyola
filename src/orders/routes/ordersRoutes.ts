import { Router } from 'express';
import { createOrder, deletedOrderLogic, deleteOrder, getOrderById, getOrders, updatedOrder, } from '../controllers/ordersController';
//import { authMiddleware } from '../../shared/middlewares/auth';

const ordersRoutes: Router = Router();

ordersRoutes.get('/',getOrders);
ordersRoutes.get('/:product_id', getOrderById);
ordersRoutes.post('/',createOrder);
ordersRoutes.put('/:product_id', updatedOrder);
ordersRoutes.delete('/:product_id', deleteOrder);
ordersRoutes.put("/delete/:orders_id",deletedOrderLogic);
export default ordersRoutes;