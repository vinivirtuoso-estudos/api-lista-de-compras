import { NextFunction, Request, Response } from 'express'
import { databaseClients } from '../database/database'
import { Client } from '../interfaces/interfaces'

export function verifyClient(req: Request, res: Response, next: NextFunction) {
  const client: Client | undefined = databaseClients.find(
    (client) => client.email === req.body.email
  )

  if (!client) {
    return res.status(404).json({ message: 'Client not found' })
  }

  req.body.client = client

  return next()
}
