import { Router } from 'express';
import { createReservation, deletedReservationLogic, deleteReservation, getReservationById, getReservationByUserIdFk, getReservations, getReservationsAcepted, getReservationsByReservationsDate, getReservationsCanceled, getReservationsPending, getReservationWithUsers, updatedReservation } from '../controllers/reservationControllers';
import { authMiddleware } from '../../shared/middlewares/auth';
const reservationRoutes: Router = Router();

reservationRoutes.get('/acepted', authMiddleware, getReservationsAcepted);
reservationRoutes.get('/pending', authMiddleware, getReservationsPending);
reservationRoutes.get('/canceled', authMiddleware, getReservationsCanceled);
reservationRoutes.get('/date/:reservationsDate', authMiddleware,  getReservationsByReservationsDate);
reservationRoutes.put('/delete/:reservation_id', authMiddleware, deletedReservationLogic);
reservationRoutes.get('/reservation/:reservation_id', authMiddleware, getReservationById);
reservationRoutes.put('/:reservation_id', authMiddleware, updatedReservation);
reservationRoutes.delete('/:reservation_id', authMiddleware, deleteReservation);
reservationRoutes.get('/', authMiddleware, getReservations);
reservationRoutes.post('/', authMiddleware, createReservation);
reservationRoutes.get("/byUser/:user_id_fk", authMiddleware,  getReservationByUserIdFk);
reservationRoutes.get("/reservationsUsers", authMiddleware, getReservationWithUsers)
export default reservationRoutes;