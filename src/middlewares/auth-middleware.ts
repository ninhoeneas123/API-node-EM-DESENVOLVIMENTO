import { NextFunction, Request, Response } from 'express';
require('dotenv').config()

import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send({ auth: false, message: 'unauthorized' })
    }
    const token = authorization.replace('Bearer', '').trim()
    try {
        const data = jwt.verify(token, "1221321dsdskadasxcc")

        const { id } = data as TokenPayload 

        req.userId = id

        next()

    } catch {
        return res.status(401).send({ auth: false, message: 'unauthorized' })
    }
}