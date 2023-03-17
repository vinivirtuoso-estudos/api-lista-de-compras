import { Request, Response } from 'express'

import { List } from '../interfaces/interfaces'
import { database } from '../database/database'

export class ListProductController {
  async handle(req: Request, res: Response) {
    return res.status(200).json(database)
  }

  async create(req: Request, res: Response) {
    const { listName, data }: Omit<List, 'id'> = req.body

    try {
      const id = database.length + 1
      database.push({ id, listName, data })

      return res.status(201).json({ id, listName, data })
    } catch (err) {
      return res.status(400).json({ type: 'Error', message: 'Sever Error' })
    }
  }

  async deleteItem(req: Request, res: Response) {
    const { listId, itemName } = req.params

    const findArrItem = database.find((list) => list.id === Number(listId))
    const findArrIndex = database.findIndex(
      (list) => list.id === Number(listId)
    )

    if (findArrItem) {
      const deletedItem = findArrItem.data.filter(
        (item) => item.name.toLowerCase() !== itemName.toLowerCase()
      )

      database[findArrIndex] = { ...findArrItem, data: deletedItem }
    }

    return res.status(204).json([])
  }

  async deleteList(req: Request, res: Response) {
    const { listId } = req.params
    const findArrIndex = database.findIndex(
      (list) => list.id === Number(listId)
    )

    database.splice(findArrIndex, 1)

    return res.status(204).json([])
  }

  async updateItem(req: Request, res: Response) {
    const { listId, itemName } = req.params
    const { name, quantity } = req.body

    const findList = database.findIndex((list) => list.id === Number(listId))

    if (findList < 0) {
      return res
        .status(404)
        .json({ message: `List with id "${listId}" does not exist` })
    }
    const findItem = database[findList].data.findIndex(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    )

    if (findItem < 0) {
      return res
        .status(404)
        .json({ message: `Item with name "${itemName}" does not exist` })
    }

    const oldData = database[findList].data[findItem]

    database[findList].data[findItem] = {
      name: name ? name : oldData.name,
      quantity: quantity ? quantity : oldData.quantity,
    }

    return res.status(201).json(database)
  }

  async updateList(req: Request, res: Response) {
    const { listId } = req.params
    const { listName } = req.body

    if (!listName || typeof listName !== 'string') {
      return res
        .status(400)
        .json({ message: 'The list name need to be a string' })
    }

    const findList = database.findIndex((list) => list.id === Number(listId))

    if (findList < 0) {
      return res
        .status(404)
        .json({ message: `List with id "${listId}" does not exist` })
    }

    const oldData = database[findList]

    database[findList].listName = listName ? listName : oldData.listName

    return res.status(201).json(database)
  }
}
