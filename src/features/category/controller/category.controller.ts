import { NextFunction, Request, Response } from 'express'
import { HTTPS_STATUS } from '~/globals/contants/http'
import { BadRequestException, NotFoundException } from '~/globals/middlewares/error.middleware'
import { categoryService } from '~/service/db/category.service'
import { catchAsync } from '~/utils/utils'

class CategoryController {
  public addCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const alreadyCategoryExist = await categoryService.getCategoryByName(req.body.name)
    if (alreadyCategoryExist) {
      throw new BadRequestException(`Category already exist with id of ${alreadyCategoryExist.id}`)
    }
    const categoryCraeted = await categoryService.addCategory(req.body)
    if (!categoryCraeted) {
      throw new BadRequestException('Unable to create category')
    }
    res.status(HTTPS_STATUS.CREATED).json({
      message: 'Category successfully created',
      data: categoryCraeted
    })
  })
  public allCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const categoryCraeted = await categoryService.getCategoryAllCategories()

    res.status(HTTPS_STATUS.OK).json({
      message: 'Category successfully fetched',
      data: categoryCraeted
    })
  })
  public byIdCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const foundCategory = await categoryService.getCategoryById(req.params.id)
    if (!foundCategory) {
      throw new NotFoundException('Category not found')
    }
    res.status(HTTPS_STATUS.OK).json({
      message: 'Category successfully fetched',
      data: foundCategory
    })
  })
}

export const categoryController: CategoryController = new CategoryController()
