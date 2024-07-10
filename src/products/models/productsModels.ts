export interface Product{
    product_id: number | null;
    type: string;
    amount: number;
    price: number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}
