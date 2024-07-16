import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/auth';
import { createReservation, deletedReservationLogic, deleteReservation, getReservationById, getReservations, updatedReservation } from '../controllers/reservationControllers';

const reservationRoutes: Router = Router();

reservationRoutes.get('/',authMiddleware,getReservations);
reservationRoutes.get('/:reservation_id',authMiddleware,getReservationById);
reservationRoutes.post('/',authMiddleware, createReservation);
reservationRoutes.put('/:reservation_id', authMiddleware, updatedReservation);
reservationRoutes.delete('/:reservation_id',authMiddleware, deleteReservation);
reservationRoutes.put("/delete/:product_id", authMiddleware, deletedReservationLogic);
export default reservationRoutes;