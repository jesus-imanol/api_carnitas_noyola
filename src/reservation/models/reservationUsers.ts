export interface ReservationUsers{
    reservation_id : number | null;
    user_id: number | null;
    description: string;
    amount_persons: number;
    amount_tables: number;
    reservationsDate: Date;
    status: string;
    name: string;
    lastname: string;
    email: string;
    number_phone: string;
}