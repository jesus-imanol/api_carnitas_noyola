import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/auth';
import { createRole, deletedRoleLogic, deleteRole, getRoleById, getRoles, updatedRole } from '../controllers/roleControllers';

const rolesRoutes: Router = Router();

rolesRoutes.get('/',getRoles);
rolesRoutes.get('/:product_id',getRoleById);
rolesRoutes.post('/', createRole);
rolesRoutes.put('/:product_id', updatedRole);
rolesRoutes.delete('/:product_id',deleteRole);
rolesRoutes.put("/delete/:product_id", deletedRoleLogic);
export default rolesRoutes;