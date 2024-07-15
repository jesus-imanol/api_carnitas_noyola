import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/auth';
import { createRole, deletedRoleLogic, deleteRole, getRoleById, getRoles, updatedRole } from '../controllers/roleControllers';

const rolesRoutes: Router = Router();

rolesRoutes.get('/',authMiddleware,getRoles);
rolesRoutes.get('/:product_id',authMiddleware,getRoleById);
rolesRoutes.post('/',authMiddleware, createRole);
rolesRoutes.put('/:product_id', authMiddleware, updatedRole);
rolesRoutes.delete('/:product_id',authMiddleware, deleteRole);
rolesRoutes.put("/delete/:product_id", authMiddleware, deletedRoleLogic);
export default rolesRoutes;