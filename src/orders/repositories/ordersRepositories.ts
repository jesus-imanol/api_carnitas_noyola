import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Orders } from '../models/ordersModel';

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
      connection.query('SELECT * FROM Orders WHERE orders_id = ?', [orders_id], (error: any, results) => {
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

  public static async createOrder(order: Orders): Promise<Orders> {
    const query = 'INSERT INTO Orders (order_date, total_amount, status, payment_method, created_at, created_by, updated_at, updated_by, deleted) VALUES (?,?, ?, ?, ?, ?, ?, ?,?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order.order_date, order.total_amount,order.status, order.payment_method, order.created_at, order.created_by, order.updated_at, order.updated_by, order.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdOrderId = result.insertId;
          const createdOrder: Orders = { ...order, orders_id: createdOrderId };
          resolve(createdOrder);
        }
      });
    });
  }
  public static async updateOrder(orders_id: number, orderData: Orders): Promise<Orders | null> {
    const query = 'UPDATE Orders SET order_date=?, total_amount=?, status=?, payment_method=?, created_at=?, created_by=?, updated_at=?, updated_by=?, deleted=? WHERE orders_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderData.order_date, orderData.total_amount,orderData.status, orderData.payment_method, orderData.created_at, orderData.created_by,orderData.updated_at, orderData.updated_by,orderData.deleted, orders_id], (error, result: ResultSetHeader) => {
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

  public static async deleteOrder(orders_id: number): Promise<boolean> {
    const query = 'DELETE FROM Orders WHERE orders_id = ?';
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