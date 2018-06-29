exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.string('red')
      table.string('green')
      table.string('blue')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.dropColumn('colors')
    })
  ])
}
