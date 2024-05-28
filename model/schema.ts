import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'notes',
      columns: [
        { name: 'id', type: 'string', isIndexed: true },
        { name: 'content', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'label', type: 'number', isOptional: true },
        { name: 'is_pinned', type: 'boolean' }
      ]
    }),
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'id', type: 'string', isIndexed: true },
        { name: 'content', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'priority', type: 'number', isOptional: true },
        { name: 'finished', type: 'boolean', isOptional: true },
        { name: 'position', type: 'number', isOptional: true }
      ]
    })
  ]
})
