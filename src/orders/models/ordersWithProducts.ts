export interface ProductWithOrdersAndUser{
    orders_id: number;
    product_id: number; 
    user_id: number;
    order_date: Date;
    total_amount: number;
    description: string;
    price: number;
    name: string;
    lastname: string;
    email: string, 
    number_phone: string;
}