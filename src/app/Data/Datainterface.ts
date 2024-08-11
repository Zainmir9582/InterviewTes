// Datainterface.ts
export interface Category {
    id: number;
    name: string;
    options: any;
}

export interface Item {
    id: number;
    tab_id: number;
    name: string;
    amount: number;
    amount_type: string;
    allow_quantity: any;
    deleted_at: string | null;
    required: boolean;
    created_at: string;
    updated_at: string;
    type: string;
    position: number;
    anchor: any;
    parent_id: number | null;
    catalog_object_id: number | null;
    description: string | null;
    available_quantity: number | null;
    hidden: boolean;
    options: any;
    tsv: string;
    quantity_sold: number;
    amount_sold: number;
    total_buyers: number;
    quantity_refunded: number;
    amount_discounted: number;
    amount_refunded: number;
    net_amount: number;
    net_quantity: number;
    subcategory: string | null;
    images: any[];
    category?: Category;
}
