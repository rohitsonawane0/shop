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
  merchantId: number | null
  createdAt: Date
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
export enum OrderBy {
  createdAt = 'createdAt',
  id = 'id'
}
export enum Sort {
  desc = 'desc',
  asc = 'asc'
}

export interface PaginationParams {
  page?: string
  limit?: string
  orderBy?: OrderBy
  sort?: Sort
  filterBy?: any
  filterValueParams?: any
}
