import { Request, Response, NextFunction } from 'express'
import { database } from '../database/database'

export function verifyExistList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { listId } = req.params
  const findList = database.find((list) => list.id === Number(listId))

  if (!findList) {
    return res
      .status(404)
      .json({ message: `List with id "${listId}" does not exist` })
  }

  next()
}
