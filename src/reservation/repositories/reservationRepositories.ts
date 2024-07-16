import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Reservation } from '../models/reservationModels';
export class ReservationRepository {

  public static async findAll(): Promise<Reservation[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reservation Where deleted = 0', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reservations: Reservation[] = results as Reservation[];
          resolve(reservations);
        }
      });
    });
  }

  public static async findById(reservation_id: number): Promise<Reservation | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reservation WHERE reservation_id = ? AND deleted = 0', [reservation_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reservations: Reservation[] = results as Reservation[];
          if (reservations.length > 0) {
            resolve(reservations[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  public static async findByStatusAcepted(): Promise<Reservation[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reservation WHERE status = "Aceptado" AND deleted = 0', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reservations: Reservation[] = results as Reservation[];
          resolve(reservations);
        }
      });
    });
  }
  public static async findByStatusPending(): Promise<Reservation[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reservation WHERE status = "Pendiente" AND deleted = 0', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reservations: Reservation[] = results as Reservation[];
          resolve(reservations);
        }
      });
    });
  }
  public static async findByStatusCanceled(): Promise<Reservation[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reservation WHERE status = "Cancelado"AND deleted = 0', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reservations: Reservation[] = results as Reservation[];
          resolve(reservations);
        }
      });
    });
  }
  public static async findByReservationsDate(reservationsDate: Date): Promise<Reservation[] > {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reservation WHERE reservationsDate = ? AND deleted =0', [reservationsDate],(error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reservations: Reservation[] = results as Reservation[];
          resolve(reservations);
        }
      });
    });
  }

  public static async createReservation(reservation: Reservation): Promise<Reservation> {
    const query = 'INSERT INTO Reservation (description,amount_persons,amount_tables,reservationsDate,status, created_at, created_by, updated_at, updated_by, deleted, user_id_fk) VALUES (?,?,?, ?, ?, ?, ?,?,?,?,?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reservation.description,reservation.amount_persons,reservation.amount_tables,reservation.reservationsDate,reservation.status, reservation.created_at, reservation.created_by, reservation.updated_at, reservation.updated_by, reservation.deleted, reservation.user_id_fk], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdReservationId = result.insertId;
          const createdReservation: Reservation = { ...reservation, reservation_id: createdReservationId };
          resolve(createdReservation);
        }
      });
    });
  }
  public static async updateReservation(reservation_id: number, reservationData: Reservation): Promise<Reservation | null> {
    const query = 'UPDATE Reservation SET description = ?, amount_persons=?, amount_tables=?, reservationsDate=?,status=?, created_at=?, created_by = ?, updated_at = ?, updated_by = ?, deleted = ?, user_id_fk=? WHERE product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reservationData.description, reservationData.amount_persons, reservationData.amount_tables, reservationData.reservationsDate,reservationData.status, reservationData.created_at,reservationData.created_by,reservationData.updated_at, reservationData.updated_by, reservationData.deleted, reservationData.user_id_fk, reservation_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedReservation: Reservation = { ...reservationData, reservation_id: reservation_id };
            resolve(updatedReservation);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  public static async deleteReservation(reservation_id: number): Promise<boolean> {
    const query = 'DELETE FROM Reservation WHERE reservation_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reservation_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }
}