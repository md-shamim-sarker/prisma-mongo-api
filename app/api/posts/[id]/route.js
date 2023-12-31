//http://localhost:3000/api/posts/[id]

import prisma from '@/app/libs/prismadb';
import {NextResponse} from 'next/server';

// Get a record
export const GET = async (request, {params}) => {
    try {
        const {id} = params;
        const data = await prisma.post.findUnique({
            where: {id}
        });
        if(!data) {
            return NextResponse.json(
                {message: "Data Not Found!"}
            );
        }
        return NextResponse.json(data);
    } catch(error) {
        return NextResponse.json({message: "GET Error", error}, {status: 500});
    }
};

// Update a record
export const PATCH = async (request, {params}) => {
    try {
        const body = await request.json();
        // const {title, description} = body;
        const {id} = params;
        await prisma.post.update({
            where: {id},
            data: body
        });
        return NextResponse.json({message: "Data Updated"});
    } catch(error) {
        return NextResponse.json({message: "PATCH Error", error}, {status: 500});
    }
};

// Delete a record
export const DELETE = async (request, {params}) => {
    try {
        const {id} = params;
        await prisma.post.delete({
            where: {id}
        });
        return NextResponse.json({message: "Data Deleted"});
    } catch(error) {
        return NextResponse.json({message: "DELETE Error", error}, {status: 500});
    }
};