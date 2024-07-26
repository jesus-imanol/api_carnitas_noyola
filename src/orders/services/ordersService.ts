import { OrdersRepository } from "../repositories/ordersRepositories";
import { Orders } from "../models/ordersModel";
import { DateUtils } from "../../shared/utils/DateUtils";
import { ProductAmount } from "../models/productsAmount";
import { ProductOrders } from "../models/productOrders";
import { ProductRepository } from "../../products/repositories/productsRepositories";
import { ProductWithOrdersAndUser } from "../models/ordersWithProducts";
import { ProductWithOrdersOnly } from "../models/ordersProductsOnly";

export class ordersService {

    public static async getAllOrders(): Promise<Orders[]> {
        try{
            return await OrdersRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener pedidos: ${error.message}`);
        }
    }
    public static async getOrdersWithProductsAndUser(): Promise <ProductWithOrdersAndUser[]>{
        try {
            return await OrdersRepository.findOrdersWithProducts();
        } catch (error: any) {
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
    public static async getOrdersWIthProductsById(orders_id: number): Promise <ProductWithOrdersOnly[]>{
    try {
       return await OrdersRepository.findOrdersWithProductsById(orders_id); 
    } catch (error: any) {
        throw new Error(`Error al encontrar pedido: ${error.message}`);
        
    }
    }
    public static async addOrder(order: Orders) {
        try {
            order.created_at = DateUtils.formatDate(new Date());
            order.updated_at = DateUtils.formatDate(new Date());
            order.deleted=false;
            order.total_amount=0;
            return await OrdersRepository.createOrder(order);
        } catch (error: any) {
            throw new Error(`Error al crear pedido: ${error.message}`);
        }
    }
    public static async addProductOrder(relations: Array<ProductAmount>, orders_id: number){
     try {
         const allProducts = await ProductRepository.findAll();
         let total_amount = 0;
         for(let i=0; i<allProducts.length; i++){
            for(let j = 0; j<relations.length; j++ ){
                if(relations[j].product_id_fk == allProducts[i].product_id){
                    if(relations[j].amount>allProducts[i].amount){
                        await ordersService.deleteOrder(orders_id);
                        return (null)
                    }else{
                        
                        total_amount += relations[j].amount * allProducts[i].price;
                    }
                }
            }
         }
        const dates = relations.map(products => {
            const productOrders: ProductOrders = {
                product_id_fk : products.product_id_fk,
                orders_id_fk : orders_id,
                amount : products.amount
            }
            OrdersRepository.updatedTotalAmount(total_amount, orders_id)
             return OrdersRepository.createdProductOrder(productOrders)
        })
        const results = await Promise.all(dates);
        return results;
     }catch(error: any){
        throw new Error(`Error al crear el pedido ${error.message}`)
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
                if(orderData.user_id_fk){
                    orderFound.user_id_fk=orderData.user_id_fk;
                }
            }else{
                return null;
            }
            orderFound.updated_by = orderData.updated_by;
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