import { NextFunction, Request, Response } from 'express'
import { HTTPS_STATUS } from '~/globals/contants/http'
import { BadRequestException, NotFoundException } from '~/globals/middlewares/error.middleware'
import { prodcutService } from '~/service/db/product.service'
import { catchAsync } from '~/utils/utils'

class ProductController {
  public addProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productCreated = await prodcutService.create(req.body, req.currentUser)
    if (!productCreated) {
      throw new BadRequestException('Unable to create Product')
    }
    res
      .status(HTTPS_STATUS.CREATED)
      .json({ status: true, message: 'Product created successfully', data: productCreated })
  })

  public listProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.query)
    const productList = await prodcutService.list(req.query)

    res
      .status(HTTPS_STATUS.OK)
      .json({ status: true, message: 'Product created successfully', count: productList.count, data: productList.list })
  })

  public byIdProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productFound = await prodcutService.getById(Number(req.params.id))
    if (!productFound) {
      throw new NotFoundException('Product not found')
    }
    res.status(HTTPS_STATUS.OK).json({ status: true, message: 'Product fetched successfully', data: productFound })
  })

  public updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updated = await prodcutService.update(Number(req.params.id), req.body)

    res.status(HTTPS_STATUS.OK).json({ status: true, message: 'Product updated successfully', data: updated })
  })

  public deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const deleted = await prodcutService.delete(Number(req.params.id))

    res.status(HTTPS_STATUS.OK).json({ status: true, message: 'Product deleted successfully' })
  })
}

export const productController = new ProductController()
