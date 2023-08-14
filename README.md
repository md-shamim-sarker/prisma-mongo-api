# Prisma Mongo API (Nabaratna)

## 1st Step
Create Next.js Brand New Application (With App Router)

## 2nd Step
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```
## 3rd Step (.env)
```code
DATABASE_URL=mongodb+srv://username:password@cluster0.86wpxgn.mongodb.net/snigdha
```

## 4th Step (prisma/schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Post {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String?
  description String?
  createdAt   DateTime @default(now())
  updateAt    DateTime @updatedAt
}
```

## 5th Step (libs/prismadb.js)
```js
import {PrismaClient} from "@prisma/client";

const client = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
```

## 6th Step
```bash
npx prisma generate
npx prisma db push
```
## 7th Step (app/api/posts/route.js)
```js
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
```
## 8th Step (app/api/posts/[id]/route.js)
```js
//http://localhost:3000/api/posts/[id]

import prisma from '@/app/libs/prismadb';
import {NextResponse} from 'next/server';

// Get a record
export const GET = async (request, {params}) => {
    try {
        const {id} = params;
        const post = await prisma.post.findUnique({
            where: {id}
        });
        if(!post) {
            return NextResponse.json(
                {message: "Post not found"}
            );
        }
        return NextResponse.json(post);
    } catch(error) {
        return NextResponse.json({message: "GET Error", error}, {status: 500});
    }
};

// Update a record
export const PATCH = async (request, {params}) => {
    try {
        const body = await request.json();
        const {title, description} = body;
        const {id} = params;
        await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                description
            }
        });
        return NextResponse.json("Post updated");
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
        return NextResponse.json("Post deleted");
    } catch(error) {
        return NextResponse.json({message: "DELETE Error", error}, {status: 500});
    }
};
```

## 9th Step
It's time to check all api routes with any api testing client