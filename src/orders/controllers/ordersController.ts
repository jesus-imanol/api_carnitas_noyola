import { Request, Response } from 'express';
import { ordersService } from '../services/ordersService';
import { Orders } from '../models/ordersModel';

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await ordersService.getAllOrders();
    if(orders){
      res.status(201).json(orders);
    }else{
      res.status(404).json({ message: 'No hay pedidos que mostrar' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await ordersService.getOrderById(parseInt(req.params.orders_id, 10));
    if(order){
      res.status(201).json(order);
    }else{
      res.status(404).json({ message: 'No se encontró el pedido' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {relations}= req.body;
    const newOrder = await ordersService.addOrder(req.body as Orders);
      const createdProductOrder = await ordersService.addProductOrder(relations, newOrder.orders_id)
    if(newOrder && createdProductOrder){
      res.status(201).json(newOrder);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatedOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await ordersService.modifyOrder(parseInt(req.params.orders_id, 10), req.body);
    if(updatedOrder){
      res.status(201).json(updatedOrder);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const deletedOrderLogic = async(req: Request, res: Response)=>{
  try{
     const deletedOrder = await ordersService.deletedOrderLogic(parseInt(req.params.orders_id, 10), req.body);
     if(deletedOrder){
      res.status(201).json({message: "Pedido eliminado con éxito"});
     }else{
      res.status(404).json({message: "Algo salió mal" });
     }
  }catch(error: any){
    res.status(500).json({error: error.message})
  }
}
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await ordersService.deleteOrder(parseInt(req.params.orders_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el pedido.' });
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
