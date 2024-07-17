import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/auth';
import { createReservation, deletedReservationLogic, deleteReservation, getReservationById, getReservations, getReservationsAcepted, getReservationsByReservationsDate, getReservationsCanceled, getReservationsPending, updatedReservation } from '../controllers/reservationControllers';

const reservationRoutes: Router = Router();

reservationRoutes.get('/acepted', authMiddleware, getReservationsAcepted);
reservationRoutes.get('/pending', authMiddleware, getReservationsPending);
reservationRoutes.get('/canceled', authMiddleware, getReservationsCanceled);
reservationRoutes.get('/date/:reservationsDate', authMiddleware, getReservationsByReservationsDate);
reservationRoutes.put('/delete/:product_id', authMiddleware, deletedReservationLogic);
reservationRoutes.get('/reservation/:reservation_id', authMiddleware, getReservationById);
reservationRoutes.put('/:reservation_id', authMiddleware, updatedReservation);
reservationRoutes.delete('/:reservation_id', authMiddleware, deleteReservation);
reservationRoutes.get('/', authMiddleware, getReservations);
reservationRoutes.post('/', authMiddleware, createReservation);
export default reservationRoutes;