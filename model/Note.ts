import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Note extends Model {
  static table = 'notes'

  @field('content') content: string
  @field('last_updated') lastUpdated: Date
  @field('sync_pending') syncPending: boolean
}
