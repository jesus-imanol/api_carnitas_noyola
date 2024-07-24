import { Router } from 'express';
import { createReservation, deletedReservationLogic, deleteReservation, getReservationById, getReservationByUserIdFk, getReservations, getReservationsAcepted, getReservationsByReservationsDate, getReservationsCanceled, getReservationsPending, getReservationWithUsers, updatedReservation } from '../controllers/reservationControllers';

const reservationRoutes: Router = Router();

reservationRoutes.get('/acepted',  getReservationsAcepted);
reservationRoutes.get('/pending',  getReservationsPending);
reservationRoutes.get('/canceled',  getReservationsCanceled);
reservationRoutes.get('/date/:reservationsDate', getReservationsByReservationsDate);
reservationRoutes.put('/delete/:product_id', deletedReservationLogic);
reservationRoutes.get('/reservation/:reservation_id', getReservationById);
reservationRoutes.put('/:reservation_id',  updatedReservation);
reservationRoutes.delete('/:reservation_id', deleteReservation);
reservationRoutes.get('/', getReservations);
reservationRoutes.post('/', createReservation);
reservationRoutes.get("/byUser/:user_id_fk", getReservationByUserIdFk);
reservationRoutes.get("/reservationsUsers", getReservationWithUsers)
export default reservationRoutes;