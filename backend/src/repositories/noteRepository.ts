import prisma from "../lib/prisma";
import { Note } from "../model/model";

export const readNotes =  () => {
    return prisma.notes.findMany({
        where: {
            deletedAt: null,
        },
        include: {
            blocks:true,
            user: {
                select: {
                    name: true, 
                },
            },
        },
   
    })
}

export const readNote =  (id: number) => {
    return prisma.notes.findUnique({
        where: {
            id: id,
            deletedAt: null,
        },
        include: {
            blocks:true,
        }
    })
}

export const createNote =  (payload: Note , user_id: number) => {
    const { title } = payload;

    return prisma.notes.create({
        data: {
            title: title,
            user: {
                connect: { id: user_id }
            }
        }
    
    })

}

export const updateNote =  (id: number, payload: Note) => { 
    const { title } = payload;

    return prisma.notes.update({
        where: {
            id: id,
            deletedAt: null,
        },
        data: {
            title: title,
            updatedAt: new Date()
        }
    })
}

export const deleteNote =  (id: number) => {
    return prisma.notes.update({
        where: {
            id: id,
            deletedAt: null,
        },
        data: {
            deletedAt: new Date()
        }
    })
}

