import { Router } from 'express';
import { getProducts, getProductById, createProduct, updatedProduct, deleteProduct, deletedProductLogic } from '../controllers/productsControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const productsRoutes: Router = Router();

productsRoutes.get('/',authMiddleware,getProducts);
productsRoutes.get('/:role_id', authMiddleware,getProductById);
productsRoutes.post('/',authMiddleware, createProduct);
productsRoutes.put('/:role_id', authMiddleware,updatedProduct);
productsRoutes.delete('/:role_id', authMiddleware, deleteProduct);
productsRoutes.put("/delete/:role_id", authMiddleware, deletedProductLogic);
export default productsRoutes;