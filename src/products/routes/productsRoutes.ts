import { Router } from 'express';
import { getProducts, getProductById, createProduct, updatedProduct, deleteProduct } from '../controllers/productsControllers';

const productsRoutes: Router = Router();

productsRoutes.get('/', getProducts);
productsRoutes.get('/:product_id', getProductById);
productsRoutes.post('/', createProduct);
productsRoutes.put('/:product_id', updatedProduct);
productsRoutes.delete('/:product_id', deleteProduct);

export default productsRoutes;