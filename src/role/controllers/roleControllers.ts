import { Request, Response } from 'express';
import { roleService } from '../services/roleServices';
export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    if(roles){
      res.status(201).json(roles);
    }else{
      res.status(404).json({ message: 'No hay roles que mostrar' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await roleService.getRoleById(parseInt(req.params.role_id, 10));
    if(role){
      res.status(201).json(role);
    }else{
      res.status(404).json({ message: 'No se encontró el rol' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const newRole = await roleService.addRole(req.body);
    if(newRole){
      res.status(201).json(newRole);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatedRole = async (req: Request, res: Response) => {
  try {
    const updatedRole = await roleService.modifyRole(parseInt(req.params.product_id, 10), req.body);
    if(updatedRole){
      res.status(201).json(updatedRole);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const deletedRoleLogic = async(req: Request, res: Response)=>{
  try{
     const deletedRole = await roleService.deletedRoleLogic(parseInt(req.params.product_id, 10), req.body);
     if(deletedRole){
      res.status(201).json({message: "Rol eliminado con éxito"});
     }else{
      res.status(404).json({message: "Algo salió mal" });
     }
  }catch(error: any){
    res.status(500).json({error: error.message})
  }
}
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const deleted = await roleService.deleteRole(parseInt(req.params.role_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el rol.' });
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
