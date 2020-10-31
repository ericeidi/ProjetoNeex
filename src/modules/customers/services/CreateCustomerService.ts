import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  telephone: string;
  address: string;

}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository) {}

  public async execute({ name, telephone, address }: IRequest): Promise<Customer> {
    const customerExists = await this.customersRepository.findByEmail(telephone);

    if(customerExists){
      throw new AppError('This telephone is already assigned to a customer');
    }

    const customer = await this.customersRepository.create({
      name,
      telephone,
      address,
    });

    return customer;
  }
}

export default CreateCustomerService;
