exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.string('color4')
      table.string('color5')
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
