import { Request, Response } from 'express';
import { userService } from '../services/userService';
export const loginUser= async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);
    if (!token) {
      res.status(401).json({ message: 'Invalid email or password' });
    }else {
      //res.setHeader("Authorization", token);
      res.status(200).json({ message: 'Inicio de sesión exitoso', token});
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export const getUserByEmail = async (req: Request, res: Response) =>{
  try{
   const user= await userService.getUserByEmail(req.params.email);
   if(user){
    res.status(201).json(user)
   }else{
    res.status(404).json({ message: 'No se encontró el usuario' });
   }

  }catch(error: any){
    res.status(500).json({error: error.message})
  }
}
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    if(users){
      res.status(201).json(users);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.user_id, 10));
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.addUser(req.body);
    if(newUser){
      res.status(201).json(newUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatedUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.modifyUser(parseInt(req.params.user_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await userService.deleteUser(parseInt(req.params.user_id, 10));
    if(deleted){

      res.status(201).json({ message: 'Se eliminó el usuario.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
