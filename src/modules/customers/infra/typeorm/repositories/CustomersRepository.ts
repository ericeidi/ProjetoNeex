import { getRepository, Repository } from 'typeorm';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, telephone, address }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      telephone,
      address,
    });

    await this.ormRepository.save(customer);

    return customer;
  }


  public async findById(id: string): Promise<Customer | undefined> {
    const findCustomer = await this.ormRepository.findOne(id);

    return findCustomer;
  }

  public async findByEmail(telephone: string): Promise<Customer | undefined> {
    const findCustomer = await this.ormRepository.findOne({
      where: {
        telephone,
      },
    });

    return findCustomer;
  }
}

export default CustomersRepository;
