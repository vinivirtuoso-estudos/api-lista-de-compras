import { Request, Response, NextFunction } from 'express'
import { List } from '../interfaces/interfaces'

export function validateCreateList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { listName, data }: List = req.body

  if (!listName.trim() || typeof listName.trim() !== 'string') {
    return res
      .status(404)
      .json({ message: 'The list name need to be a string' })
  }

  try {
    if (
      data.length === 0 ||
      data.find(
        (list) =>
          list.name.trim() === undefined ||
          list.name.trim() === '' ||
          list.quantity.trim() === undefined ||
          list.quantity.trim() === ''
      )
    ) {
      return res
        .status(404)
        .json({ message: 'Updatable fields are: "name" and "quantity"' })
    }
  } catch (err) {
    return res.status(404).json({ message: 'Internal Error' })
  }

  next()
}
