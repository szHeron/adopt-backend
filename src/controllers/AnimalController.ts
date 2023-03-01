import z from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { Animal } from '@prisma/client';

module.exports = {
    async create(req: Request, res: Response){
        const animalInfoSchema = z.object({
            name: z.string(),
            race: z.string(),
            type: z.string(),
            gender: z.string(),
            age: z.string(),
            city: z.string(),
            state: z.string(),
            userId: z.string()
        })
        // const animalInfo = animalInfoSchema.parse(req.body);
        // let animal = await prisma.animal.create({
        //     data: animalInfo
        // })
        // return res.json(animal).status(200)
    },

    async delete(req: Request, res: Response){
        const animalInfoSchema = z.object({
            id: z.string()
        })
        const animalInfo = animalInfoSchema.parse(req.params);
        let animal = await prisma.animal.delete({
            where:{
                id: animalInfo.id
            }
        });
        if(!animal){
            return res.json({"Error": "Animal not found."}).status(404)
        }
        return res.json(animal).status(200)
    },

    async getAnimals(req: Request, res: Response){
        let animals: Array<Animal> = []
        if(!Object.keys(req.query).length){
            animals = await prisma.animal.findMany(
                {
                    include: 
                    { 
                        createdBy: true,
                        Favorites: true
                    }
                }
            );
        }else{
            const name = typeof req.query.name === "string"?req.query.name:undefined
            const age =  typeof req.query.age === "string"?req.query.age:undefined
            const type =  typeof req.query.type === "string"?req.query.type:undefined
            const gender =  typeof req.query.gender === "string"?Number(req.query.gender):undefined

            animals = await prisma.animal.findMany({
                where: {
                    name: {
                        startsWith: name,
                        mode: 'insensitive'
                    },
                    age: age,
                    type: type,
                    gender: gender
                },
                include: { 
                    createdBy: true,
                    Favorites: true
                }
            });
            
        }

        if(!animals){
            return res.json({"Error": "Animal is empyt"}).status(404)
        }
        return res.json(animals).status(200)
    },
}