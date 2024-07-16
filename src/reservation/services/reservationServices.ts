import { ReservationRepository } from "../repositories/reservationRepositories";
import { Reservation } from "../models/reservationModels";
import { DateUtils } from "../../shared/utils/DateUtils";

export class reservationService {

    public static async getAllReservations(): Promise<Reservation[]> {
        try{
            return await ReservationRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener las reservaciones: ${error.message}`);
        }
    }

    public static async getReservationsPending(): Promise<Reservation[]>{
        try{
        return await ReservationRepository.findByStatusPending();
        }catch(error: any){
            throw new Error(`Error al obtener las reservación: ${error.message}`);
        }
    }
    public static async getReservationsCanceled(): Promise<Reservation[]>{
        try{
        return await ReservationRepository.findByStatusCanceled();
        }catch(error: any){
            throw new Error(`Error al obtener las reservación: ${error.message}`);
        }
    }
    public static async getReservationsAcepted(): Promise<Reservation[]>{
        try{
          return await ReservationRepository.findByStatusAcepted();
        }catch(error:any){
            throw new Error(`Error al obtener las reservaciones: ${error.message}`)
        }
    }
    public static async getReservationsByReservationsDate(reservationsDate: Date): Promise<Reservation[]>{
        try{
           return await ReservationRepository.findByReservationsDate(reservationsDate);
        }catch(error:any){
            throw new Error(`Error al obtener las reservaciones: ${error.message}`)
        }
    }
    public static async getReservationById(reservation_id: number): Promise<Reservation | null> {
        try{
            return await ReservationRepository.findById(reservation_id);
        }catch (error: any){
            throw new Error(`Error al encontrar la reservación: ${error.message}`);
        }
    }

    public static async addReservation(reservation: Reservation) {
        try {
            reservation.created_at = DateUtils.formatDate(new Date());
            reservation.updated_at = DateUtils.formatDate(new Date());
            reservation.deleted=false;
            return await ReservationRepository.createReservation(reservation);
        } catch (error: any) {
            throw new Error(`Error al crear el reservation: ${error.message}`);
        }
    }

    public static async modifyReservation(reservation_id: number, reservationData: Reservation){
        try{
            const reservationFound =  await ReservationRepository.findById(reservation_id);
            if(reservationFound){
                if(reservationData.description){
                    reservationFound.description = reservationData.description;
                }
                if(reservationData.amount_persons){
                    reservationFound.amount_persons = reservationData.amount_persons;
                }
                if(reservationData.amount_tables){
                    reservationFound.amount_tables = reservationData.amount_tables;
                }
                if(reservationData.status){
                    reservationFound.status = reservationData.status;
                }
                if(reservationData.reservationsDate){
                    reservationFound.reservationsDate = reservationData.reservationsDate;
                }
            }else{
                return null;
            }
            reservationFound.updated_by = reservationFound.updated_by;
            reservationFound.updated_at = DateUtils.formatDate(new Date());
            return await ReservationRepository.updateReservation(reservation_id, reservationFound);
        }catch (error: any){
            throw new Error(`Error al modificar reservaciones: ${error.message}`);
        }
    }
    public static async deletedReservationLogic(reservation_id: number, reservationData: Reservation){ 
      try{
        const reservationFound = await ReservationRepository.findById(reservation_id);
        if(reservationFound){
            reservationFound.deleted= reservationData.deleted;
            reservationFound.updated_by= reservationData.updated_by;
            reservationFound.updated_at = DateUtils.formatDate(new Date());
        }else{
            return null;
        }
        return await ReservationRepository.updateReservation(reservation_id, reservationFound);
      }catch(error:any){
    throw new Error(`Error al eliminar reservación: ${error.message}`);
      }
    }
    public static async deleteReservation(reservation_id: number): Promise<boolean> {
        try{
            return await ReservationRepository.deleteReservation(reservation_id);
        }catch (error: any){
            throw new Error(`Error al eliminar la reservación: ${error.message}`);
        }
    }

}