interface List {
  id: number
  listName: string
  data: DataTypes[]
}

interface DataTypes {
  name: string
  quantity: string
}

interface Client {
  email: string
}

export { List, Client }
