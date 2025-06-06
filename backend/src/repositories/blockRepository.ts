import { BlockType } from "../../prisma/generated/prisma";
import prisma from "../lib/prisma";
import { Block } from "../model/model";

export const findByNoteId = (id: number) => {
    return prisma.blocks.findMany({
        where: {
            note_id : id,
        },
        orderBy: {
            order_index: 'asc', 
        },
    });
};
export const readBlocks = () => {
    return prisma.blocks.findMany({
        where: {
            deletedAt: null,
        },
        include : {
            note: true,
          
        
        }
    });
};

export const readBlock = (id: number) => {
    return prisma.blocks.findUnique({
        where: {
            id: id,
            deletedAt: null,
        },
        include : {
            note: true,
            children: true,
        }
    });
};

export const createBlock = (payload: Block, note_id: number  , parent_id : number) => {
    const { content, type , order_index } = payload;

    return prisma.blocks.create({
        data: {
            content: content,
            type: type  as BlockType || 'some' as BlockType,
            order_index: Number(order_index) || 0,
            note: {
                connect: { id: note_id },
            },
            ...(parent_id !== null && {
                parent: {
                  connect: {
                    id: parent_id,
                  },
                },
              }),
        },
    });
};

export const updateBlock = (id: number, payload: Block) => {
    const { content, type } = payload;

    return prisma.blocks.update({
        where: {
            id: id,
            deletedAt: null,
        },
        data: {
            content: content,
        },
    });
};

export const deleteBlock = (id: number) => {
    return prisma.blocks.update({
        where: {
            id: id,
            deletedAt: null,
        },
        data: {
            deletedAt: new Date(),
        },
    });
};