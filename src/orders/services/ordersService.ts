import { OrdersRepository } from "../repositories/ordersRepositories";
import { Orders } from "../models/ordersModel";
import { DateUtils } from "../../shared/utils/DateUtils";

export class ordersService {

    public static async getAllOrders(): Promise<Orders[]> {
        try{
            return await OrdersRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener pedidos: ${error.message}`);
        }
    }

    public static async getOrderById(orders_id: number): Promise<Orders | null> {
        try{
            return await OrdersRepository.findById(orders_id);
        }catch (error: any){
            throw new Error(`Error al encontrar pedido: ${error.message}`);
        }
    }

    public static async addOrder(order: Orders) {
        try {
            order.created_at = DateUtils.formatDate(new Date());
            order.updated_at = DateUtils.formatDate(new Date());
            order.deleted=false;
            return await OrdersRepository.createOrder(order);
        } catch (error: any) {
            throw new Error(`Error al crear pedido: ${error.message}`);
        }
    }

    public static async modifyOrder(orders_id: number, orderData: Orders){
        try{
            const orderFound =  await OrdersRepository.findById(orders_id);
            if(orderFound){
                if(orderData.order_date){
                    orderFound.order_date = orderData.order_date;
                }
                if(orderData.total_amount){
                    orderFound.total_amount = orderData.total_amount;
                }
                if(orderData.status){
                    orderFound.status = orderData.status;
                }
                if(orderData.payment_method){
                  orderFound.payment_method = orderData.payment_method;
                }
            }else{
                return null;
            }
            orderFound.updated_by = orderData.updated_by
            orderFound.updated_at = DateUtils.formatDate(new Date());
            return await OrdersRepository.updateOrder(orders_id, orderFound);
        }catch (error: any){
            throw new Error(`Error al modificar pedido: ${error.message}`);
        }
    }
    public static async deletedOrderLogic(orders_id: number, orderData:Orders){ 
      try{
        const orderFound = await OrdersRepository.findById(orders_id);
        if(orderFound){
            orderFound.deleted= orderData.deleted;
            orderFound.updated_by= orderData.updated_by;
            orderFound.updated_at = DateUtils.formatDate(new Date());
        }else{
            return null;
        }
        return await OrdersRepository.updateOrder(orders_id, orderFound);
      }catch(error:any){
    throw new Error(`Error al eliminar pedido: ${error.message}`);
      }
    }
    public static async deleteOrder(orders_id: number): Promise<boolean> {
        try{
            return await OrdersRepository.deleteOrder(orders_id);
        }catch (error: any){
            throw new Error(`Error al eliminar pedido: ${error.message}`);
        }
    }

}