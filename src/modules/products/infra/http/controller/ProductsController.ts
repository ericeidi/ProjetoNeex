import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import FindProductByIdService from '@modules/products/services/FindProductByIdService';
import { getRepository } from 'typeorm';
import Product from '../../typeorm/entities/Product'
import ProductView from '../../../views/ProductView'

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity} = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const productsRepository = getRepository(Product);

    const products = await productsRepository.find({
      relations: ['order_products']
    });

    return response.json(ProductView.renderMany(products))
  }


  public async showById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrder = container.resolve(FindProductByIdService);

    const product = await findOrder.execute({
      id
  });



  return response.json(product);
  }
}
