exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects_test').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects_test').insert([
        {id: 1, name: 'project 1'},
        {id: 2, name: 'project 2'},
        {id: 3, name: 'project 3'}
      ])
    })
}
