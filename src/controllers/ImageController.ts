import { Request, Response } from 'express';
const cloudinary = require('../config/cloudinaryConfig')

module.exports = {
    async uploadNewImage(req: Request, res: Response) {
        try {
            const { base64 } = req.body;
            const result = await cloudinary.uploader.upload(base64, {
                upload_preset: 's73ad5fy',
            });
            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao fazer upload da imagem.' });
        }
    },
}