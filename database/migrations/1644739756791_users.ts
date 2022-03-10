import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email', 100)
      table.string('name', 120)
      table.string('password', 72)
      table.enum('role', ['administrator', 'manager', 'investor']).defaultTo('manager')
      table.boolean('disabled').defaultTo(false)
      table.string('language', 3).defaultTo('en')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
