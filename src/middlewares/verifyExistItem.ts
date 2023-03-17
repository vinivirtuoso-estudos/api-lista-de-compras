import { Request, Response, NextFunction } from 'express'
import { database } from '../database/database'

export function verifyExistItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { listId, itemName } = req.params

  const findArrItem = database.find((list) => list.id === Number(listId))
  const findArrIndex = database.findIndex((list) => list.id === Number(listId))

  if (!findArrItem || findArrIndex === -1) {
    return res
      .status(404)
      .json({ message: `List with id "${listId}" does not exist` })
  }

  if (
    !findArrItem.data.find(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    )
  ) {
    return res
      .status(404)
      .json({ message: `Item with name "${itemName}" does not exist` })
  }
  next()
}
