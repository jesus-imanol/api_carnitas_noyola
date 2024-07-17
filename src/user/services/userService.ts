import { UserRepository } from "../repositories/userRepository";
import { User } from "../models/User";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const saltRounds = 10;
const secretKey = process.env.SECRET || "";
export class userService {
    public static async login(email: string, password: string){
        try{
            const user = await this.getUserByEmail(email);
            if(!user){
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return null;
            }
            const payload = {
                user_id: user.user_id,
                role_id_fk: user.role_id_fk,
                email: user.email
            }
            
            return await jwt.sign(payload, secretKey, { expiresIn: '1h' });

        }catch (error: any){
            throw new Error(`Error al logearse: ${error.message}`);
        }

    }
    public static async getAllUsers(): Promise<User[]> {
        try{
            return await UserRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener los usuarios: ${error.message}`);
        }
    }

    public static async getUserById(user_id: number): Promise<User | null> {
        try{
            return await UserRepository.findById(user_id);
        }catch (error: any){
            throw new Error(`Error al encontrar usuario: ${error.message}`);
        }
    }
    public static async getUserByEmail(email: string): Promise<User | null> {
        try{
            return await UserRepository.findByEmail(email);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addUser(user: User) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            user.created_at = DateUtils.formatDate(new Date());
            user.updated_at = DateUtils.formatDate(new Date());
            user.password = await bcrypt.hash(user.password, salt);
            user.deleted=false;
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    public static async modifyUser(user_id: number, userData: User){
        try{
            const userFound =  await UserRepository.findById(user_id);
            const salt = await bcrypt.genSalt(saltRounds);
            if(userFound){
                if(userData.name){
                    userFound.name = userData.name;
                }
                if(userData.lastname){
                    userFound.lastname = userData.lastname;
                }
                if(userData.password){
                    userFound.password = await bcrypt.hash(userData.password, salt);
                }
                if(userData.email){
                    userFound.email = userData.email;
                }
                if(userData.number_phone){
                    userFound.number_phone=userData.number_phone; 
                }
                if(userData.role_id_fk){
                    userFound.role_id_fk=userData.role_id_fk;
                }
            }else{
                return null;
            }
            userFound.updated_by = userData.updated_by
            userFound.updated_at = DateUtils.formatDate(new Date());
            return await UserRepository.updatedUser(user_id, userFound);
        }catch (error: any){
            throw new Error(`Error al modificar el usuario): ${error.message}`);
        }
    }

    public static async deleteUser(user_id: number): Promise<boolean> {
        try{
            return await UserRepository.deleteUser(user_id);
        }catch (error: any){
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }

}