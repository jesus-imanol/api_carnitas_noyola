import { ProductRepository } from "../repositories/productsRepositories";
import { Product } from "../models/productsModels";
import { DateUtils } from "../../shared/utils/DateUtils";
import * as dotenv from 'dotenv';
dotenv.config();
export class productsService {

    public static async getAllProducts(): Promise<Product[]> {
        try{
            return await ProductRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    public static async getProductById(product_id: number): Promise<Product | null> {
        try{
            return await ProductRepository.findById(product_id);
        }catch (error: any){
            throw new Error(`Error al encontrar producto: ${error.message}`);
        }
    }
    public static async getProductByDescription(description: string): Promise<Product[]>{
        try {
            return await ProductRepository.findByName(description);
        } catch (error: any) {
            throw new Error(`Error al encontrar productos: ${error.message}`);
        }
    }
    public static async addProduct(product: Product, file: Express.Multer.File) {
        const urlProject = process.env.URL; 
        const portProject = process.env.PORT; 
        try {
            product.image = `${urlProject}:${portProject}/images/${file.filename}`;
            product.created_at = DateUtils.formatDate(new Date());
            product.updated_at = DateUtils.formatDate(new Date());
            product.deleted=false;
            return await ProductRepository.createProduct(product);
        } catch (error: any) {
            throw new Error(`Error al crear producto: ${error.message}`);
        }
    }

    public static async modifyProduct(product_id: number, productData: Product){
        try{
            const productFound =  await ProductRepository.findById(product_id);
            if(productFound){
                if(productData.description){
                    productFound.description = productData.description;
                }
                if(productData.price){
                    productFound.price = productData.price;
                }
                if(productData.image){
                    productFound.image = productData.image;
                }
            }else{
                return null;
            }
            productFound.updated_by = productData.updated_by
            productFound.updated_at = DateUtils.formatDate(new Date());
            return await ProductRepository.updateProduct(product_id, productFound);
        }catch (error: any){
            throw new Error(`Error al modificar producto: ${error.message}`);
        }
    }
    public static async deletedProductLogic(product_id: number, productData: Product){ 
      try{
        const productFound = await ProductRepository.findById(product_id);
        if(productFound){
            productFound.deleted= productData.deleted;
            productFound.updated_by= productData.updated_by;
            productFound.updated_at = DateUtils.formatDate(new Date());
        }else{
            return null;
        }
        return await ProductRepository.updateProduct(product_id, productFound);
      }catch(error:any){
    throw new Error(`Error al eliminar producto: ${error.message}`);
      }
    }
    public static async addAmountProduct(product_id: number, productData: Product){ 
        try{
          const productFound = await ProductRepository.findById(product_id);
          if(productFound){
              productFound.amount= productFound.amount+productData.amount;
              productFound.updated_by= productData.updated_by;
              productFound.updated_at = DateUtils.formatDate(new Date());
          }else{
              return null;
          }
          return await ProductRepository.updateProduct(product_id, productFound);
        }catch(error:any){
      throw new Error(`Error al eliminar producto: ${error.message}`);
        }
      }
    public static async deleteProduct(product_id: number): Promise<boolean> {
        try{
            return await ProductRepository.deleteProduct(product_id);
        }catch (error: any){
            throw new Error(`Error al eliminar producto: ${error.message}`);
        }
    }

}