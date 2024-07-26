export interface Orders{
   orders_id: number;
   order_date: Date;
   total_amount: number | null;
   status: string;
   payment_method: string;
   created_at: string;
   created_by: string;
   updated_at: string;
   updated_by: string;
   deleted: boolean;
   user_id_fk: number;
}
