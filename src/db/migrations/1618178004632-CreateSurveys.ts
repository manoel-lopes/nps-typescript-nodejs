import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSurveys1618178004632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'surveys',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp'
          },
          {
            name: 'update_at',
            type: 'timestamp'
          }
        ]
      })
    )
  }
        
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('surveys')
  }
        
}
        
    
