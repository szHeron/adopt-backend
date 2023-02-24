const admin = require('../services/firebase')
import { Request, Response, NextFunction } from 'express';

module.exports = {
    async verifyToken(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization?.split(' ')[1];

		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				return next();
			}
			return res.json({ message: 'Unauthorized' });
		} catch (e) {
			return res.json(e);
		}
	}
}