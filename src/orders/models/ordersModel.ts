export interface Orders{
   orders_id: number | null;
   order_date: string;
   total_amount: number;
   status: string;
   payment_method: string;
   created_at: string;
   created_by: string;
   updated_at: string;
   updated_by: string;
   deleted: boolean;
   client_id_fk: number;
}
