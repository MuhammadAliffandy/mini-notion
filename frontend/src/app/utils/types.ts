export interface Users {
    name?: string;
    email: string;
    password?: string;
}

export interface Notes {
    forEach: any;
    id?: number;
    title: string;
    user_id?: string;
    createdAt?: string;
    updatedAt?: string;
    user?: {
        name: string;
    };
    blocks?: Blocks[];
}

export interface Blocks {
    id?: number;
    content: string;
    type?: string;
    order_index?: number;
    parent_id?: number;
    note_id?: number;
    createdAt?: string;
    updatedAt?: string;
}
