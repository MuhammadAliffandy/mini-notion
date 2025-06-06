export interface User{
    name?: string;
    email: string;
    password?: string;
}

export interface Note{
    title: string;
    user_id?: number;
}

export interface Block{
    type?: string;
    content:string
    note_id?: number;
    parent_id?: number;
    order_index?: number;
}