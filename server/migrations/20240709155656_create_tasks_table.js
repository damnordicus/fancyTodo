/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', table => {
        table.increments('id');
        table.string('title').notNullable();
        table.string('comments');
        table.boolean('is_complete');
        table.integer('creator_id');
        table.foreign('creator_id').references('users.id').onDelete('CASCADE');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('tasks', table => {
        table.dropForeign('creator_id');
    }).then(function(){
        return knex.schema.dropTableIfExists('tasks');
    })
};
