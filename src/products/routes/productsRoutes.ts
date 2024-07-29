import { Router } from 'express';
import { getProducts, getProductById, createProduct, updatedProduct, deleteProduct, deletedProductLogic, addAmountProduct, getProductsByDescription } from '../controllers/productsControllers';
//import { authMiddleware } from '../../shared/middlewares/auth';
import upload from '../../shared/middlewares/uploadMidleware';
import { authMiddleware } from '../../shared/middlewares/auth';
const productsRoutes: Router = Router();
productsRoutes.get('/product/', getProducts);
productsRoutes.get('/byRole/:role_id', authMiddleware, getProductById);
productsRoutes.post('/',authMiddleware, upload.single('image'),createProduct);
productsRoutes.put('/product/:product_id', authMiddleware, updatedProduct);
productsRoutes.delete('/:product_id', authMiddleware, deleteProduct);
productsRoutes.get("/productDescription/:description", getProductsByDescription)
productsRoutes.put("/delete/:product_id", authMiddleware, deletedProductLogic);
productsRoutes.put("/addAmount/:product_id", authMiddleware, addAmountProduct);
export default productsRoutes;