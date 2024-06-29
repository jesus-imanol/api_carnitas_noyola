import { Request, Response } from 'express';
import { productsService } from '../services/productsService';

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productsService.getAllProducts();
    if(products){
      res.status(201).json(products);
    }else{
      res.status(404).json({ message: 'Sin registros' });
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
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newEmployee = await productsService.addProduct(req.body);
    if(newEmployee){
      res.status(201).json(newEmployee);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatedProduct = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await productsService.modifyProduct(parseInt(req.params.product_id, 10), req.body);
    if(updatedEmployee){
      res.status(201).json(updatedEmployee);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await productsService.deleteProduct(parseInt(req.params.employee_id, 10));
    if(deleted){

      res.status(201).json({ message: 'Se eliminó el empleado.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
