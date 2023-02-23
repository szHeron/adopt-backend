import z from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

module.exports = {
    async getUser(req: Request, res: Response){
        const userInfoSchema = z.object({
            id: z.string()
        })
        const userInfo = userInfoSchema.parse(req.params);

        let user = await prisma.user.findUnique({
            where:{
                id: userInfo.id
            }
        })

        return res.json(user).status(200)
    },

    async register(req: Request, res: Response){
        const userInfoSchema = z.object({
            id: z.string(),
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
                    id: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email
                }
            })
        }else{
            return res.json({message: "Ja existe usuario"}).status(400)    
        }

        return res.json(userInfo).status(200)
    },

    async delete(req: Request, res: Response){
        const userInfoSchema = z.object({
            id: z.string()
        })
        const userInfo = userInfoSchema.parse(req.params);
        let user = await prisma.user.delete({
            where:{
                id: userInfo.id
            }
        });
        if(!user){
            return res.json({"Error": "User not found."}).status(404)
        }
        return res.json(userInfo).status(200)
    },

    async update(req: Request, res: Response){
        const userInfoSchema = z.object({
            email: z.string().email(),
            name: z.string()
        })
        const userInfo = userInfoSchema.parse(req.body);
        let user = await prisma.user.update({
            where: {
                email: userInfo.email
            },
            data: {
                name: userInfo.name,
                email: userInfo.email
            }
        })
        if(!user){
            return res.json({"Error": "User not found."}).status(404)
        }
        return res.json(userInfo).status(200)
    }
}