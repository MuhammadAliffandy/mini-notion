import { config } from 'dotenv';
import { PrismaClient } from '../../prisma/generated/prisma';


config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NODE_ENV === 'test'
        ? (process.env.DATABASE_URL_TEST as string)
        : (process.env.DATABASE_URL as string)
    }
  }
});

export default prisma;
