export interface ProductWithOrdersOnly{
    orders_id: number;
    product_id: number; 
    amount: number;
    order_date: Date;
    total_amount: number;
    status: string,
    description: string;
    price: number;
}