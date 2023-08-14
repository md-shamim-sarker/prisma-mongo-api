//http://localhost:3000/api/posts

import prisma from '@/app/libs/prismadb';
import {NextResponse} from 'next/server';

// Post a record
export const POST = async (request) => {
    try {
        const body = await request.json();
        const newData = await prisma.post.create({
            data: body
        });
        return NextResponse.json(newData);
    } catch(error) {
        return NextResponse.json({message: "POST Error", error}, {status: 500});
    }
};

// Get all records
export const GET = async () => {
    try {
        const allData = await prisma.post.findMany();
        return NextResponse.json(allData);
    } catch(error) {
        return NextResponse.json({message: "GET Error", error}, {status: 500});
    }
};