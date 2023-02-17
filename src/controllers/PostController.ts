import z from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

module.exports = {
    async create(req: Request, res: Response){
        const postInfoSchema = z.object({
            title: z.string(),
            description: z.string(),
            address: z.string(),
            userId: z.string(),
            animalId: z.string()
        })
        const postInfo = postInfoSchema.parse(req.body);
        let post = await prisma.post.create({
            data: postInfo
        })
        return res.json(post).status(200)
    },

    async delete(req: Request, res: Response){
        const postInfoSchema = z.object({
            id: z.string()
        })
        const postInfo = postInfoSchema.parse(req.params);
        let post = await prisma.post.delete({
            where:{
                id: postInfo.id
            }
        });
        if(!post){
            return res.json({"Error": "Post not found."}).status(404)
        }
        return res.json(post).status(200)
    }
}