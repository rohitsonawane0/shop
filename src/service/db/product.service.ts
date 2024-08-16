import prisma from '~/db'
import { categoryService } from './category.service'
import { NotFoundException } from '~/globals/middlewares/error.middleware'
import {
  UpdateProductInput,
  ShowProduct,
  ProductInput,
  PaginationParams,
  OrderBy
} from '~/features/product/interface/product.interface'
import { fileUpload } from '~/globals/helper/fileUpload'

const selectProduct = {
  id: true,
  name: true,
  longDescription: true,
  shortDescription: true,
  quantity: true,
  categoryId: true,
  mainImage: true,
  createdAt: true,
  updatedAt: true,
  merchantId: true
}
//0

class ProdcutService {
  public async create(reqBody: ProductInput, reqUser: UserPayload, image: IFile[]): Promise<ShowProduct | null> {
    const { name, longDescription, shortDescription, quantity, categoryId, mainImage } = reqBody
    console.log({ image })
    const categoryFound = await categoryService.getCategoryById(categoryId)
    if (!categoryFound) {
      throw new NotFoundException('Category you are trying to add does not exist')
    }
    // console.log({ image })
    const uploadImage = await fileUpload.uploadFile(image[0])
    let newImage = mainImage
    if (uploadImage) {
      newImage = uploadImage
    }
    // console.log(uploadImage)

    const dataToSave = {
      name,
      longDescription,
      shortDescription,
      quantity: Number(quantity),
      categoryId: Number(categoryId),
      mainImage: newImage,
      updatedAt: new Date(),
      merchantId: reqUser.id
    }
    console.log(dataToSave)
    const createdProduct = await prisma.product.create({
      data: dataToSave,
      select: selectProduct
    })
    return createdProduct
  }
  public async update(id: number, reqBody: UpdateProductInput): Promise<ShowProduct | null> {
    const updateData: UpdateProductInput = {}
    if (reqBody.name) {
      updateData.name = reqBody.name
    }
    if (reqBody.longDescription) {
      updateData.longDescription = reqBody.longDescription
    }
    if (reqBody.shortDescription) {
      updateData.shortDescription = reqBody.shortDescription
    }
    if (reqBody.quantity || reqBody.quantity == 0) {
      updateData.quantity = reqBody.quantity
    }
    if (reqBody.categoryId) {
      const categoryFound = await categoryService.getCategoryById(reqBody.categoryId)
      if (!categoryFound) {
        throw new NotFoundException('Category you are trying to add does not exist')
      }
      updateData.categoryId = reqBody.categoryId
    }
    if (reqBody.mainImage) {
      updateData.mainImage = reqBody.mainImage
    }
    const foundProduct = await this.getById(id)
    if (!foundProduct) {
      throw new NotFoundException(`Product not found with id ${id}`)
    }
    const updatedProduct = await prisma.product.update({
      where: { id, isDeleted: false },
      data: updateData,
      select: selectProduct
    })
    return updatedProduct
  }
  public async getById(id: number): Promise<ShowProduct | null> {
    const foundProduct = await prisma.product.findFirst({ where: { id, isDeleted: false }, select: selectProduct })
    return foundProduct
  }
  public async delete(id: number): Promise<boolean> {
    const foundProduct0 = await prisma.product.findFirst({ where: { id, isDeleted: false }, select: selectProduct })
    if (!foundProduct0) {
      throw new NotFoundException(`product not found with id ${id}`)
    }
    const foundProduct = await prisma.product.update({ where: { id, isDeleted: false }, data: { isDeleted: true } })
    return foundProduct ? true : false
  }
  public async list(query: PaginationParams) {
    const where: any = { isDeleted: false }
    const page = Number(query?.page) || 1
    const limit = Number(query?.limit) || 10
    const skip = (page - 1) * limit
    const orderBy = query?.orderBy || 'createdAt'
    const sort = query?.sort || 'desc'
    const filterBy = query?.filterBy || ''
    const filterValueParams = query?.filterValueParams || ''
    const [filterCondition, filterValue] = filterValueParams.split('.')
    const orderByValue = {
      [orderBy]: sort
    }

    const operations = ['lt', 'lte', 'gt', 'gte', 'equals']
    operations.forEach((operation) => {
      if (filterCondition == operation) {
        where[filterBy] = {}
        where[filterBy][filterCondition] = Number(filterValue)
      }
    })
    // console.log({ where })
    const list = await prisma.product.findMany({
      where,
      select: selectProduct,
      skip: skip,
      take: limit,
      orderBy: orderByValue
    })
    const count = await prisma.product.count({
      where: { isDeleted: false }
    })
    return { list, count }
  }
}

export const prodcutService = new ProdcutService()
