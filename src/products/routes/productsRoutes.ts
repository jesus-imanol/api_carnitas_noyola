import { Router } from 'express';
import { getProducts, getProductById, createProduct, updatedProduct, deleteProduct, deletedProductLogic, addAmountProduct, getProductsByDescription } from '../controllers/productsControllers';
//import { authMiddleware } from '../../shared/middlewares/auth';
import upload from '../../shared/middlewares/uploadMidleware';
const productsRoutes: Router = Router();
productsRoutes.get('/product/',getProducts);
productsRoutes.get('/byRole/:role_id',getProductById);
productsRoutes.post('/',upload.single('image'),createProduct);
productsRoutes.put('/product/:product_id',updatedProduct);
productsRoutes.delete('/:product_id', deleteProduct);
productsRoutes.get("/productDescription/:description", getProductsByDescription)
productsRoutes.put("/delete/:product_id", deletedProductLogic);
productsRoutes.put("/addAmount/:product_id", addAmountProduct);
export default productsRoutes;