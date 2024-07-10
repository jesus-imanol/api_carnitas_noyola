import { Request, Response } from 'express';
import { productsService } from '../services/productsService';

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productsService.getAllProducts();
    if(products){
      res.status(201).json(products);
    }else{
      res.status(404).json({ message: 'No hay productos que mostrar' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productsService.getProductById(parseInt(req.params.product_id, 10));
    if(product){
      res.status(201).json(product);
    }else{
      res.status(404).json({ message: 'No se encontró el producto' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productsService.addProduct(req.body);
    if(newProduct){
      res.status(201).json(newProduct);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatedProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productsService.modifyProduct(parseInt(req.params.product_id, 10), req.body);
    if(updatedProduct){
      res.status(201).json(updatedProduct);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const deletedProductLogic = async(req: Request, res: Response)=>{
  try{
     const deletedProduct = await productsService.deletedProductLogic(parseInt(req.params.product_id, 10), req.body);
     if(deletedProduct){
      res.status(201).json({message: "Producto eliminado con éxito"});
     }else{
      res.status(404).json({message: "Algo salió mal" });
     }
  }catch(error: any){
    res.status(500).json({error: error.message})
  }
}
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await productsService.deleteProduct(parseInt(req.params.product_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el producto.' });
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
