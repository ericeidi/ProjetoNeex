import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export default class AddOrderIdToOrdersProducts1604089144771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn({
          name: 'order_id',
          type: 'uuid',
          isNullable: true,
        })
      )
      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey
        ({
          name: 'OrdersProductsOrder',
          columnNames: ['order_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'orders',
          onDelete: 'SET NULL'
        })
      )
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders_products', 'orders_products');

      await queryRunner.dropColumn('orders_products', 'order_id')
    }

}
