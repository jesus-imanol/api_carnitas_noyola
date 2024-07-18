import { Router } from 'express';
import { getUsers, getUserById, createUser, updatedUser, deleteUser,loginUser, getUserByEmail } from '../controllers/userController';
//import { authMiddleware } from '../../shared/middlewares/auth';

const userRoute: Router = Router();
userRoute.post('/login', loginUser);
userRoute.get('/', getUsers);
userRoute.get('/:user_id', getUserById);
userRoute.post('/', createUser);
userRoute.put('/:user_id',updatedUser);
userRoute.delete('/:user_id', deleteUser);
userRoute.get("/email/:email", getUserByEmail)
export default userRoute;