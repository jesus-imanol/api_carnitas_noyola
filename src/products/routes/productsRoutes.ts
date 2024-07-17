import { Router } from 'express';
import { getProducts, getProductById, createProduct, updatedProduct, deleteProduct, deletedProductLogic, addAmountProduct } from '../controllers/productsControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const productsRoutes: Router = Router();

productsRoutes.get('/',authMiddleware,getProducts);
productsRoutes.get('/:product_id', authMiddleware,getProductById);
productsRoutes.post('/',authMiddleware, createProduct);
productsRoutes.put('/product/:product_id', authMiddleware,updatedProduct);
productsRoutes.delete('/:product_id', authMiddleware, deleteProduct);
productsRoutes.put("/delete/:product_id", authMiddleware, deletedProductLogic);
productsRoutes.put("/addAmount/:product_id", authMiddleware, addAmountProduct);
export default productsRoutes;