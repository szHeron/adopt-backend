import z from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

module.exports = {
    async create(req: Request, res: Response){
        const animalInfoSchema = z.object({
            name: z.string(),
            race: z.string(),
            gender: z.number(),
            age: z.number().nullable(),
            userId: z.string()
        })
        const animalInfo = animalInfoSchema.parse(req.body);
        let animal = await prisma.animal.create({
            data: animalInfo
        })
        return res.json(animal).status(200)
    },

    async delete(req: Request, res: Response){
        const animalInfoSchema = z.object({
            id: z.string()
        })
        const animalInfo = animalInfoSchema.parse(req.params);
        let animal = await prisma.post.delete({
            where:{
                id: animalInfo.id
            }
        });
        if(!animal){
            return res.json({"Error": "Animal not found."}).status(404)
        }
        return res.json(animal).status(200)
    },

    async getAllAnimals(req: Request, res: Response){
        const animals = await prisma.animal.findMany({include: { createdBy: true }});
        if(!animals){
            return res.json({"Error": "Animal is empyt"}).status(404)
        }
        return res.json(animals).status(200)
    },
}