export interface ProductWithOrdersAndUser{
    orders_id: number;
    product_id: number; 
    user_id: number;
    amount: number;
    order_date: Date;
    total_amount: number;
    status: string,
    description: string;
    price: number;
    name: string;
    lastname: string;
    email: string, 
    number_phone: string;
}
