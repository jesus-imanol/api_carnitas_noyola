import { Router } from 'express';
import { createOrder, deletedOrderLogic, deleteOrder, getOrderById, getOrders, updatedOrder, } from '../controllers/ordersController';
import { authMiddleware } from '../../shared/middlewares/auth';

const ordersRoutes: Router = Router();

ordersRoutes.get('/',authMiddleware,getOrders);
ordersRoutes.get('/:product_id', authMiddleware,getOrderById);
ordersRoutes.post('/',authMiddleware, createOrder);
ordersRoutes.put('/:product_id', authMiddleware,updatedOrder);
ordersRoutes.delete('/:product_id', authMiddleware, deleteOrder);
ordersRoutes.put("/delete/:orders_id", authMiddleware, deletedOrderLogic);
export default ordersRoutes;