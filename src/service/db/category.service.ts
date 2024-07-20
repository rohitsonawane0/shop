import prisma from '~/db'
import { Category } from '@prisma/client'
import { CategoryInput, CategoryShow, UpdateCategory } from '~/features/category/interface/category.interface'
import { BadRequestException, NotFoundException } from '~/globals/middlewares/error.middleware'

const categorySelect = {
  id: true,
  name: true,
  icon: true,
  createAt: true,
  updatedAt: true
}

class CategoryService {
  public async addCategory(reqBody: any): Promise<Category> {
    const { name, icon }: CategoryInput = reqBody
    const categoryCreated = await prisma.category.create({ data: { name, icon, updatedAt: new Date() } })
    return categoryCreated
  }

  public async getCategoryByName(categoryName: string): Promise<CategoryShow | null> {
    const categoryCreated = await prisma.category.findFirst({
      where: { name: categoryName, isDeleted: false },
      select: categorySelect
    })
    return categoryCreated
  }
  public async getCategoryById(id: string | number): Promise<CategoryShow | null> {
    const categoryCreated = await prisma.category.findFirst({
      where: { id: Number(id), isDeleted: false },
      select: categorySelect
    })
    return categoryCreated
  }
  public async deleteCategoryById(id: string | number) {
    const categoryCreated = await prisma.category.update({
      where: { id: Number(id), isDeleted: false },
      data: { isDeleted: true },
      select: categorySelect
    })
    return categoryCreated
  }
  public async getCategoryAllCategories(): Promise<CategoryShow[] | []> {
    const categoryCreated = await prisma.category.findMany({
      where: { isDeleted: false },
      select: categorySelect
    })
    return categoryCreated
  }
  public async update(id: number, reqBody: any) {
    const updateData: UpdateCategory = {}
    if (reqBody.name) {
      updateData.name = reqBody.name
    }
    if (reqBody.icon) {
      updateData.icon = reqBody.icon
    }
    const isCategoryExist = await this.getCategoryById(id)
    if (!isCategoryExist) {
      throw new NotFoundException(`Category not found `)
    }
    if (reqBody.name) {
      const alreadyCategoryExist = await this.getCategoryByName(reqBody.name)
      if (alreadyCategoryExist) {
        throw new BadRequestException(
          `Category already exist with id of ${alreadyCategoryExist.id} for name ${reqBody.name}`
        )
      }
    }

    const categoryUpdated = await prisma.category.update({
      where: { id, isDeleted: false },
      data: updateData,
      select: categorySelect
    })
    return categoryUpdated
  }
}

export const categoryService = new CategoryService()
