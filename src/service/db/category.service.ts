import prisma from '~/db'
import { Category } from '@prisma/client'
import { CategoryInput, CategoryShow } from '~/features/category/interface/category.interface'

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
  public async getCategoryAllCategories(): Promise<CategoryShow[] | []> {
    const categoryCreated = await prisma.category.findMany({
      where: { isDeleted: false },
      select: categorySelect
    })
    return categoryCreated
  }
}

export const categoryService = new CategoryService()
