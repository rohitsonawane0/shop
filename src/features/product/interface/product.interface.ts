export interface UpdateProductInput {
  name?: string
  longDescription?: string
  shortDescription?: string
  quantity?: number
  categoryId?: number
  mainImage?: string
}

export interface ShowProduct {
  id: number
  name: string
  longDescription: string
  shortDescription: string
  quantity: number
  categoryId: number
  mainImage: string
  createAt: Date
  updatedAt: Date
}

export interface ProductInput {
  name: string
  longDescription: string
  shortDescription: string
  quantity: number
  categoryId: number
  mainImage: string
}

export interface PaginationParams {
  page?: string
  limit?: string
}
