export function useLabelColors(id: number) {
  console.log('useLabelColors', id)
  switch (id) {
    case 1:
      return {
        card: 'bg-label01-900 hover:bg-label01-800',
        meta: 'text-label01-400'
      }
    case 2:
      return {
        card: 'bg-label02-900 hover:bg-label02-800',
        meta: 'text-label02-400'
      }
    case 3:
      return {
        card: 'bg-label03-900 hover:bg-label03-800',
        meta: 'text-label03-400'
      }
    case 4:
      return {
        card: 'bg-label04-900 hover:bg-label04-800',
        meta: 'text-label04-400'
      }
    case 5:
      return {
        card: 'bg-label05-900 hover:bg-label05-800',
        meta: 'text-label05-400'
      }
    case 6:
      return {
        card: 'bg-label06-900 hover:bg-label06-800',
        meta: 'text-label06-400'
      }
    default:
      return {
        card: 'bg-zinc-900 hover:bg-zinc-800',
        meta: 'text-zinc-400'
      }
  }
}
