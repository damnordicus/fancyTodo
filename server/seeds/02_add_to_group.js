/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  
  await knex('group').del()
  await knex('group').insert([
    {group_id: 1, posX: 100, posY: 100,},
    {group_id: 2, posX: 400, posY: 100,},
  ]);
};
