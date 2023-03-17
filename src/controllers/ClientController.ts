import { Request, Response } from 'express'

export class ClientController {
  async handle(req: Request<any>, res: Response) {
    const client = req.body.client

    console.log(client)

    return res.status(200).json(client)
  }
}
