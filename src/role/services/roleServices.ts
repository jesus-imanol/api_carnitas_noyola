import { RoleRepository } from "../repositories/roleRepositories";
import { Role } from "../models/roleModels";
import { DateUtils } from "../../shared/utils/DateUtils";

export class roleService {

    public static async getAllRoles(): Promise<Role[]> {
        try{
            return await RoleRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener roles: ${error.message}`);
        }
    }

    public static async getRoleById(role_id: number): Promise<Role | null> {
        try{
            return await RoleRepository.findById(role_id);
        }catch (error: any){
            throw new Error(`Error al encontrar el rol: ${error.message}`);
        }
    }

    public static async addRole(role: Role) {
        try {
            role.created_at = DateUtils.formatDate(new Date());
            role.updated_at = DateUtils.formatDate(new Date());
            role.deleted=false;
            return await RoleRepository.createRole(role);
        } catch (error: any) {
            throw new Error(`Error al crear el rol: ${error.message}`);
        }
    }

    public static async modifyRole(role_id: number, roleData: Role){
        try{
            const roleFound =  await RoleRepository.findById(role_id);
            if(roleFound){
                if(roleData.name){
                    roleFound.name = roleData.name;
                }
                if(roleData.description){
                    roleFound.description = roleData.description;
                }
            }else{
                return null;
            }
            roleFound.updated_by = roleData.updated_by
            roleFound.updated_at = DateUtils.formatDate(new Date());
            return await RoleRepository.updateRole(role_id, roleFound);
        }catch (error: any){
            throw new Error(`Error al modificar rol: ${error.message}`);
        }
    }
    public static async deletedRoleLogic(role_id: number, roleData: Role){ 
      try{
        const roleFound = await RoleRepository.findById(role_id);
        if(roleFound){
            roleFound.deleted= roleData.deleted;
            roleFound.updated_by= roleData.updated_by;
            roleFound.updated_at = DateUtils.formatDate(new Date());
        }else{
            return null;
        }
        return await RoleRepository.updateRole(role_id, roleFound);
      }catch(error:any){
    throw new Error(`Error al eliminar rol: ${error.message}`);
      }
    }
    public static async deleteRole(role_id: number): Promise<boolean> {
        try{
            return await RoleRepository.deleteRole(role_id);
        }catch (error: any){
            throw new Error(`Error al eliminar rol: ${error.message}`);
        }
    }

}