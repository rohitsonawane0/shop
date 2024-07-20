export interface CategoryInput {
  name: string
  icon: string
}

export interface CategoryShow {
  id: number
  name: string
  icon: string
  createAt: Date
  updatedAt: Date
}

export interface UpdateCategory {
  name?: string
  icon?: string
}
