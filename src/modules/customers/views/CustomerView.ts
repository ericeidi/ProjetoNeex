import Customer from '../infra/typeorm/entities/Customer';

export default {
    render(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            telephone: customer.telephone,
            address: customer.address,
        }
    },

    renderMany(customers: Customer[]) {
        return customers.map(customer => this.render(customer))
    }
}
