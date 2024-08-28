/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {title: 'test1', comments: 'Possible suggestions', is_complete: false, creator_id: 3, group_id: 1},
    {title: 'test2', comments: 'tips and things', is_complete: true, creator_id: 3, group_id: 1},
    {title: 'test3', comments: 'not mandatory', is_complete: false, creator_id: 3, group_id: 1},
    {title: 'test1', comments: 'or don\'t', is_complete: true, creator_id: 2, group_id: 1},
    {title: 'test2', comments: 'Possible suggestions', is_complete: false, creator_id: 2, group_id: 1},
    {title: 'test3', comments: 'Possible suggestions', is_complete: true, creator_id: 2, group_id: 1}
  ]);
  
};
