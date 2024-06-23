import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Product } from '../models/productsModels';

export class ProductRepository {

  public static async findAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Product', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const products: Product[] = results as Product[];
          resolve(products);
        }
      });
    });
  }

  public static async findById(product_id: number): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Product WHERE product_id = ?', [product_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const products: Product[] = results as Product[];
          if (products.length > 0) {
            resolve(products[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createProduct(product: Product): Promise<Product> {
    const query = 'INSERT INTO Product (type, price, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    console.log(product);
    return new Promise((resolve, reject) => {
      connection.execute(query, [product.type, product.price, product.created_at, product.created_by, product.updated_at, product.updated_by, product.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdProductId = result.insertId;
          const createdProduct: Product = { ...product, product_id: createdProductId };
          resolve(createdProduct);
        }
      });
    });
  }

  public static async updateProduct(product_id: number, productData: Product): Promise<Product | null> {
    const query = 'UPDATE Product SET type = ?, price = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [productData.type, productData.price, productData.updated_at, productData.updated_by, productData.deleted, product_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedProduct: Product = { ...productData, product_id: product_id };
            resolve(updatedProduct);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteProduct(product_id: number): Promise<boolean> {
    const query = 'DELETE FROM Product WHERE product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [product_id], (error, result: ResultSetHeader) => {
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