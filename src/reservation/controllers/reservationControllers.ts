import { Request, Response } from 'express';
import { reservationService } from '../services/reservationServices';
export const getReservations = async (_req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getAllReservations();
    if(reservations){
      res.status(201).json(reservations);
    }else{
      res.status(404).json({ message: 'No hay reservaciones que mostrar' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getReservationWithUsers = async(_req: Request, res: Response)=>{
  try{
   const reservations = await reservationService.getReservationsWithUsers();
   if(reservations){
    res.status(201).json(reservations);
   }else{
    res.status(404).json({message: "No hay reservaciones que mostrar"})
   }
  }catch(error: any){
    res.status(500).json({error : error.message})
  }
}
export const getReservationsPending = async(_req: Request, res: Response) => {
    try{
     const reservations = await reservationService.getReservationsPending();
     if(reservations){
        res.status(201).json(reservations)
     }else{
        res.status(404).json({message: "No hay reservaciones que mostrar"})
     }
    }catch(error: any){
      res.status(500).json({error: error.message});
    }
};
export const getReservationsAcepted = async(_req: Request, res: Response) =>{
    try{
    const reservations = await reservationService.getReservationsAcepted();
    if(reservations){
        res.status(201).json(reservations);
    }else{
        res.status(404).json({message: "No hay reservaciones que mostrar"})
    }
    }catch(error: any){
        res.status(500).json({error: error.message});
    }
};
export const getReservationsCanceled = async(_req: Request, res: Response) =>{
    try{
    const reservations = await reservationService.getReservationsCanceled();
    if(reservations){
        res.status(201).json(reservations);
    }else{
        res.status(404).json({message: "No hay reservaciones que mostrar"})
    }
    }catch(error: any){
        res.status(500).json({error: error.message});
    }
};
export const getReservationsByReservationsDate = async (req: Request, res: Response) =>{
    try{
    const reservations = await reservationService.getReservationsByReservationsDate(new Date(req.params.reservationsDate));
    if(reservations){
        res.status(201).json(reservations);
    }else{
        res.status(404).json({message: "No se encontró reservaciones para esta fecha"});
    }
    }catch(error: any){
        res.status(500).json({error:error.message})
    }
}
export const getReservationById = async (req: Request, res: Response) => {
  try {
    const reservation = await reservationService.getReservationById(parseInt(req.params.reservation_id, 10));
    if(reservation){
      res.status(201).json(reservation);
    }else{
      res.status(404).json({ message: 'No se encontró la reservación' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getReservationByUserIdFk = async (req: Request, res: Response) => {
  try {
    const reservation = await reservationService.getReservationByUserIdFk(parseInt(req.params.user_id_fk, 10));
    if(reservation){
      res.status(201).json(reservation);
    }else{
      res.status(404).json({ message: 'No se encontró la reservación' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const newReservation = await reservationService.addReservation(req.body);
    if(newReservation){
      res.status(201).json(newReservation);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatedReservation = async (req: Request, res: Response) => {
  try {
    const updatedReservation = await reservationService.modifyReservation(parseInt(req.params.reservation_id, 10), req.body);
    if(updatedReservation){
      res.status(201).json(updatedReservation);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const deletedReservationLogic = async(req: Request, res: Response)=>{
  try{
     const deletedReservation = await reservationService.deletedReservationLogic(parseInt(req.params.reservation_id, 10), req.body);
     if(deletedReservation){
      res.status(201).json({message: "Reservación eliminado con éxito"});
     }else{
      res.status(404).json({message: "Algo salió mal" });
     }
  }catch(error: any){
    res.status(500).json({error: error.message})
  }
}
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const deleted = await reservationService.deleteReservation(parseInt(req.params.reservation_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó la reservación.' });
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
