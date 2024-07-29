import { Router } from 'express';
import { createOrder, deletedOrderLogic, deleteOrder, getOrderById, getOrders, getOrdersWithProductsAndUser, updatedOrder,getOrdersWIthProductsByUserId, getFullTotalAmount,getOrdersValidationsWithProductsAndUser } from '../controllers/ordersController';
import { authMiddleware } from '../../shared/middlewares/auth';
//import { authMiddleware } from '../../shared/middlewares/auth';

const ordersRoutes: Router = Router();

ordersRoutes.get('/',authMiddleware, getOrders);
ordersRoutes.get('/order/orders_id', authMiddleware, getOrderById);
ordersRoutes.post('/',authMiddleware, createOrder);
ordersRoutes.put('/:orders_id', authMiddleware, updatedOrder);
ordersRoutes.delete('/:orders_id', authMiddleware, deleteOrder);
ordersRoutes.put("/delete/:orders_id", authMiddleware, deletedOrderLogic);
ordersRoutes.get("/ordersWithProducts/:order_date", authMiddleware, getOrdersWithProductsAndUser);
ordersRoutes.get("/ordersWithProducts/", authMiddleware, getOrdersValidationsWithProductsAndUser);
ordersRoutes.get("/ordersByUserId/:user_id_fk", authMiddleware, getOrdersWIthProductsByUserId);
ordersRoutes.get("/allAmount/:order_date", authMiddleware, getFullTotalAmount);
export default ordersRoutes;