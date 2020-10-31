import { json, Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';
import FindCustomerByIdService from '@modules/customers/services/FindCustomerByIdService';
import { getRepository } from 'typeorm';
import Customer from '../../typeorm/entities/Customer';
import CustomerView from '@modules/customers/views/CustomerView';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {name, telephone, address} = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      telephone,
      address
    })

    return response.json(customer);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.find({
    });

    return response.json(CustomerView.renderMany(customer))
  }

  public async showById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrder = container.resolve(FindCustomerByIdService);

    const customer = await findOrder.execute({
      id
  });



  return response.json(customer);
  }

}
