import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Orders } from '../models/ordersModel';
import { ProductOrders } from '../models/productOrders';
import { ProductWithOrdersAndUser } from '../models/ordersWithProducts';
import { ProductWithOrdersOnly } from '../models/ordersProductsOnly';
export class OrdersRepository {

  public static async findAll(): Promise<Orders[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Orders Where deleted=0', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: Orders[] = results as Orders[];
          resolve(orders);
        }
      });
    });
  }
  public static async findById(orders_id: number): Promise<Orders | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Orders WHERE orders_id = ? AND deleted = 0', [orders_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: Orders[] = results as Orders[];
          if (orders.length > 0) {
            resolve(orders[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  public static async findOrdersWithProducts(order_date: Date): Promise<ProductWithOrdersAndUser[]>{
    return new Promise((resolve, reject)=>{
      connection.query("SELECT orders_id, product_id, user_id, ProductOrders.amount, order_date, total_amount, status,description, price, name, lastname, email, number_phone FROM Orders JOIN User On user_id=user_id_fk JOIN ProductOrders ON orders_id= orders_id_fk JOIN Product ON product_id=product_id_fk WHERE order_date=? AND status = 'Vendido' AND Orders.deleted=0 AND Product.deleted = 0 AND User.deleted =0 ORDER BY orders_id ", [order_date], (error: any, results)=>{
        if(error){
          reject(error);
        }else{
          const orders: ProductWithOrdersAndUser[] = results as ProductWithOrdersAndUser[];
          resolve(orders)
        }
      })
    })
  }
  public static async findOrdersValidationsWithProductsAndUser(): Promise<ProductWithOrdersAndUser[]>{
    return new Promise((resolve, reject)=>{
      connection.query("SELECT orders_id, product_id, user_id, ProductOrders.amount, order_date, total_amount, status,description, price, name, lastname, email, number_phone FROM Orders JOIN User On user_id = user_id_fk JOIN ProductOrders ON orders_id= orders_id_fk JOIN Product ON product_id=product_id_fk WHERE Orders.deleted=0 AND Product.deleted = 0 AND User.deleted =0 ORDER BY orders_id ", (error: any, results)=>{
        if(error){
          reject(error);
        }else{
          const orders: ProductWithOrdersAndUser[] = results as ProductWithOrdersAndUser[];
          resolve(orders)
        }
      })
    })
  }
  public static async findOrdersWithProductsById(orders_id: number): Promise<ProductWithOrdersOnly[]>{
    return new Promise ((resolve, reject)=> {
      connection.query("SELECT orders_id, product_id, ProductOrders.amount, order_date, total_amount, status,description, price FROM Orders JOIN ProductOrders ON orders_id= orders_id_fk JOIN Product ON product_id=product_id_fk Where orders_id = ? AND Orders.deleted=0 AND Product.deleted = 0 ORDER BY orders_id ", [orders_id], (error: any, results)=>{
        if(error){
          reject(error); 
        }else{
          const orders: ProductWithOrdersOnly[] = results as ProductWithOrdersOnly[];
          resolve(orders);
        }
      })
    })
  }
  public static async findOrdersWithProductsByUserId(user_id_fk: number): Promise<ProductWithOrdersOnly[]>{
    return new Promise ((resolve, reject)=> {
      connection.query("SELECT orders_id, product_id, ProductOrders.amount, order_date, total_amount, status,description, price FROM Orders JOIN ProductOrders ON orders_id= orders_id_fk JOIN Product ON product_id=product_id_fk Where user_id_fk = ? AND Orders.deleted=0 AND Product.deleted = 0 ORDER BY orders_id ", [user_id_fk], (error: any, results)=>{
        if(error){
          reject(error); 
        }else{
          const orders: ProductWithOrdersOnly[] = results as ProductWithOrdersOnly[];
          resolve(orders);
        }
      })
    })
  }
  public static async createdProductOrder(productOrders: ProductOrders): Promise <ProductOrders>{
    const query = "INSERT INTO ProductOrders (product_id_fk, orders_id_fk, amount) VALUES(?,?,?)";
    return new Promise((resolve, reject)=>{
      connection.execute(query, [productOrders.product_id_fk, productOrders.orders_id_fk, productOrders.amount], (error, result: ResultSetHeader)=>{
        if(error){
          reject(error);
        }else{
          const createdProductOrderId= result.insertId;
          const createdProductOrder: ProductOrders = {...productOrders, orders_id_fk: createdProductOrderId}
          resolve(createdProductOrder);
        }
      })
    })
  }
  public static async createOrder(order: Orders): Promise<Orders> {
    const query = 'INSERT INTO Orders (order_date, total_amount, status, payment_method, created_at, created_by, updated_at, updated_by, deleted, user_id_fk) VALUES (?,?,?, ?, ?, ?, ?, ?, ?,?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order.order_date, order.total_amount,order.status, order.payment_method, order.created_at, order.created_by, order.updated_at, order.updated_by, order.deleted, order.user_id_fk], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdOrderId = result.insertId;
          const createdOrder: Orders = { ...order, orders_id: createdOrderId };
          resolve(createdOrder);
        }
      }
    );
    });
  }
  
  public static async updateOrder(orders_id: number, orderData: Orders): Promise<Orders | null> {
    const query = 'UPDATE Orders SET order_date=?, total_amount=?, status=?, payment_method=?, created_at=?, created_by=?, updated_at=?, updated_by=?, deleted=?, user_id_fk= ? WHERE orders_id = ? AND deleted = 0';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderData.order_date, orderData.total_amount,orderData.status, orderData.payment_method, orderData.created_at, orderData.created_by,orderData.updated_at, orderData.updated_by,orderData.deleted,orderData.user_id_fk, orders_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedOrder: Orders = { ...orderData, orders_id: orders_id };
            resolve(updatedOrder);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  public static async updatedTotalAmount(total_amount: number, orders_id: number): Promise<number |null>{
   const query = "UPDATE Orders SET total_amount = ? WHERE orders_id = ?";
   return new Promise((resolve, reject)=>{
    connection.execute(query, [total_amount, orders_id], (error, result: ResultSetHeader)=>{
      if(error){
        reject(error);
      }else{
        if(result.affectedRows> 0){
          const updatedOrder=total_amount;
          resolve(updatedOrder);
        }else{
          resolve(null)
        }
      }
    })
   })  
  }
  public static async deleteOrder(orders_id: number): Promise<boolean> {
    const query = 'DELETE FROM Oders WHERE orders_id = ? AND deleted = 0';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orders_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

}