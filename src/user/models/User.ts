export interface User {
    user_id: number | null;
    name: string;
    lastname: string; 
    password: string;
    email: string;
    number_phone: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: String;
    deleted: boolean;
    role_id_fk: number;
}