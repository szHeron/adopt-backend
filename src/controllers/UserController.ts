import z from 'zod';
import { prisma } from '../db/prisma';
import { Request, Response } from 'express';

module.exports = {
    async create(req: Request, res: Response){
        const userInfoSchema = z.object({
            email: z.string().email(),
            name: z.string()
        })
        const userInfo = userInfoSchema.parse(req.body);
        let user = await prisma.user.findUnique({
            where:{
                email: userInfo.email
            }
        });
        if(!user){
            user = await prisma.user.create({
                data: {
                    name: userInfo.name,
                    email: userInfo.email
                }
            })
        }
        res.status(200)
    }
}