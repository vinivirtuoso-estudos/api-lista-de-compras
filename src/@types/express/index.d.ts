import { Client, List } from '../../interfaces/interfaces'

declare global {
  namespace Express {
    interface Request {
      client: Client
    }
  }
}
