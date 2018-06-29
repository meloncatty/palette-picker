exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects_test').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects_test').insert([
        {
          id: 1,
          name: 'palette 1',
          color1: 'rgb(23, 190, 251)',
          color2: 'rgb(11, 100, 0)',
          color3: 'rgb(199, 0, 44)',
          color4: 'rgb(200, 250, 12)',
          color5: 'rgb(160, 60, 60)',
          projectId: 1
        },
        {
          id: 2,
          name: 'palette 2',
          color1: 'rgb(23, 190, 251)',
          color2: 'rgb(11, 100, 0)',
          color3: 'rgb(199, 0, 44)',
          color4: 'rgb(200, 250, 12)',
          color5: 'rgb(160, 60, 60)',
          projectId: 2
        },
        {
          id: 3,
          name: 'palette 3',
          color1: 'rgb(23, 190, 251)',
          color2: 'rgb(11, 100, 0)',
          color3: 'rgb(199, 0, 44)',
          color4: 'rgb(200, 250, 12)',
          color5: 'rgb(160, 60, 60)',
          projectId: 3
        }
      ])
    })
}
