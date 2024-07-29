import { Router } from 'express';
import { getUsers, getUserById, createUser, updatedUser, deleteUser,loginUser, getUserByEmail, getUsersWithRole, deletedUserLogic } from '../controllers/userController';
import { authMiddleware } from '../../shared/middlewares/auth';
//import { authMiddleware } from '../../shared/middlewares/auth';

const userRoute: Router = Router();
userRoute.post('/login', loginUser);
userRoute.get('/', authMiddleware, getUsers);
userRoute.get('/:user_id', authMiddleware, getUserById);
userRoute.post('/', createUser);
userRoute.put('/:user_id', authMiddleware, updatedUser);
userRoute.delete('/:user_id', authMiddleware, deleteUser);
userRoute.get("/email/:email", authMiddleware, getUserByEmail)
userRoute.get("/userRole/:role_id_fk", authMiddleware, getUsersWithRole);
userRoute.put('/delete/:user_id', authMiddleware, deletedUserLogic);
export default userRoute;