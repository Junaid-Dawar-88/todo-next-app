'use server'
import { prisma } from "@/lib/prisma"

export interface Todo {
    id: number
    title: string
    description?: string
    status: string
    priority: string
}

export default async function  POST(formData: Todo) {

    const todo = await prisma.todo.create({
        data: {
            title: formData.title,
            description: formData.description || '',
            status: formData.status,
            priority: formData.priority
        }
    })
    return  todo
}

export async function GET() {
     const todo = await prisma.todo.findMany()
     return todo
}

export async function  DELETE(id: number) {
    const data = await prisma.todo.delete({
        where: {id: id}
    })
    return data
}

export async function  UPDATE(id: number , formData: Todo) {
    const todo = await prisma.todo.update({
        where: {id: id},
        data: {
            title: formData.title,
            description: formData.description || undefined,
            status: formData.status,
            priority: formData.priority
        }
    })

     return todo
}