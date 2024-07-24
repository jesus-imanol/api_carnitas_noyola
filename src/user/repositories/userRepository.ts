import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import {  User } from "../models/User";

export class UserRepository{
    public static async findAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
         connection.query("SELECT * FROM User WHERE deleted = 0", (error: any, results) =>{
          if(error){
            reject(error);
          }else{
            const orders: User[] = results as User[];
            resolve (orders);
          }
         });
      });
    }
    public static async findWithRole(user_id_fk: number): Promise<User[]> {
      return new Promise((resolve, reject) => {
       connection.query("SELECT * FROM User WHERE user_id_fk = ? AND deleted = 0",[user_id_fk], (error: any, results) =>{
        if(error){
          reject(error);
        }else{
          const orders: User[] = results as User[];
          resolve (orders);
        }
       });
    });
  }
    public static async findById(user_id: number): Promise<User | null>{
      return new Promise((resolve, reject) =>{
       connection.query('SELECT * FROM User WHERE user_id = ? AND deleted = 0', [user_id],(error: any, results) =>{
        if(error){
          reject(error)
        }else{
          const user: User[] = results as User[];
          if(user.length >0){
            resolve(user[0]);
          }else{
            resolve(null);
          }
        }
       });
      });
    }
    public static async findByEmail(email: string): Promise<User | null> {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM User WHERE email = ? AND deleted = 0', [email], (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const users: User[] = results as User[];
            if (users.length > 0) {
              resolve(users[0]);
            } else {
              resolve(null);
            }
          }
        });
      });
    }
  
    public static async createUser(user: User): Promise<User>{
      const query = 'INSERT INTO User (name,lastname, password, email, number_phone, created_at, created_by, updated_at, updated_by, deleted, role_id_fk) VALUES(?,?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
      return new Promise((resolve, reject) =>{
        connection.execute(query, [user.name, user.lastname, user.password, user.email, user.number_phone, user.created_at, user.created_by, user.updated_at, user.updated_by, user.deleted, user.role_id_fk], (error, result: ResultSetHeader)=>{
          if(error){
            reject(error);
          }else{
            const createdUserId = result.insertId;
            const createdUser: User= {...user, user_id: createdUserId};
            resolve(createdUser);
          }
        });
      });
    }
    public static async updatedUser (user_id: number, userData: User): Promise<User | null> {
      const query = "UPDATE User SET name =?, password=?,  email=?, number_phone=?, created_at=?, created_by=?, updated_at=?, updated_by=?, deleted=?, role_id_fk=? WHERE user_id=? AND deleted = 0";
      return new Promise((resolve, reject) =>{
      connection.execute(query, [userData.name, userData.password, userData.email, userData.number_phone, userData.created_at, userData.created_by, userData.updated_at, userData.updated_by, userData.deleted,userData.role_id_fk, user_id],(error, result:ResultSetHeader)=>{
      if(error){   
        reject(error);
      }else{
        if(result.affectedRows>0){
          const updatedUser: User = { ...userData, user_id: user_id };
          resolve(updatedUser);
        }else{
          resolve(null);
        }
      }
      });
      }); 
    }
    public static async deleteUser(user_id: number): Promise<boolean> {
      const query = 'DELETE FROM User WHERE user_id = ?';
      return new Promise((resolve, reject) => {
        connection.execute(query, [user_id], (error, result: ResultSetHeader) => {
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