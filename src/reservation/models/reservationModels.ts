export interface Reservation{
    reservation_id: number | null;
    description: string;
    amount_persons: number;
    amount_tables: number;
    reservationsDate: Date;
    status: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
    user_id_fk: number;
}
