import Product from '../infra/typeorm/entities/Product';

export default {
    render(product: Product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        }
    },

    renderMany(products: Product[]) {
        return products.map(product => this.render(product))
    }
}
