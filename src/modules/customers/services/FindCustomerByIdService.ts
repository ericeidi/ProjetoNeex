import { inject, injectable } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustumerRepository from '../repositories/ICustomersRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustumerRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Customer | undefined> {
    const customer = await this.customersRepository.findById(id);

    return customer;
  }
}

export default FindCustomerService;
