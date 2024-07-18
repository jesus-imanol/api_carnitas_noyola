import { Router } from 'express';
import { getProducts, getProductById, createProduct, updatedProduct, deleteProduct, deletedProductLogic, addAmountProduct } from '../controllers/productsControllers';
//import { authMiddleware } from '../../shared/middlewares/auth';

const productsRoutes: Router = Router();

productsRoutes.get('/',getProducts);
productsRoutes.get('/:role_id',getProductById);
productsRoutes.post('/',createProduct);
productsRoutes.put('/product/:product_id',updatedProduct);
productsRoutes.delete('/:product_id', deleteProduct);
productsRoutes.put("/delete/:product_id", deletedProductLogic);
productsRoutes.put("/addAmount/:product_id", addAmountProduct);
export default productsRoutes;