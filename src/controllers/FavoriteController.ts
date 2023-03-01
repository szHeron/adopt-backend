import z from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

module.exports = {
    async create(req: Request, res: Response){
        const favoriteInfoSchema = z.object({
            userId: z.string(),
            animalId: z.string()
        })
        const favoriteInfo = favoriteInfoSchema.parse(req.body);
        let favorite = await prisma.favorites.create({
            data: favoriteInfo
        })
        return res.json(favorite).status(200)
    },

    async delete(req: Request, res: Response){
        const favoriteInfoSchema = z.object({
            id: z.string()
        })
        const favoriteInfo = favoriteInfoSchema.parse(req.params);
        let favorite = await prisma.favorites.delete({
            where:{
                id: favoriteInfo.id
            }
        });
        if(!favorite){
            return res.json({"Error": "Favorite not found."}).status(404)
        }
        return res.json(favorite).status(200)
    },

    async getFavorites(req: Request, res: Response){
        const favoriteInfoSchema = z.object({
            userId: z.string()
        })
        const favoriteInfo = favoriteInfoSchema.parse(req.query);
        let favorites = await prisma.favorites.findMany(
            {
                where: {
                    userId: favoriteInfo.userId
                },
                include: 
                { 
                    animal: true 
                }
            }
        );
        
        if(!favorites){
            return res.json({"Error": "Favorites is empyt"}).status(404)
        }
        return res.json(favorites).status(200)
    },
}