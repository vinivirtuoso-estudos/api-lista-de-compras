import express from 'express'
import { ClientController } from './controllers/ClientController'
import { ListProductController } from './controllers/ListProductController'
import { validateCreateList } from './middlewares/validateCreateList'
import { verifyClient } from './middlewares/verifyClient'
import { verifyExistItem } from './middlewares/verifyExistItem'
import { verifyExistList } from './middlewares/verifyExistList'

export const app = express()
app.use(express.json())

const listProductController = new ListProductController()
const clientController = new ClientController()

// FRUITS ROUTES
app.post('/list', validateCreateList, listProductController.create)
app.get('/list', listProductController.handle)
app.patch('/list/:listId', listProductController.updateList)
app.patch('/list/:listId/:itemName', listProductController.updateItem)
app.delete('/list/:listId', verifyExistList, listProductController.deleteList)
app.delete(
  '/list/:listId/:itemName',
  verifyExistItem,
  listProductController.deleteItem
)

// CLIENTS ROUTES
app.get('/clients', verifyClient, clientController.handle)

app.listen(3333, () => {
  console.log('Running Server 🚀🚀')
})
