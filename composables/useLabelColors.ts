export function useLabelColors(id: number) {
  console.log('useLabelColors', id)
  switch (id) {
    case 1:
      return {
        card: 'bg-rose-500 hover:bg-rose-400 text-black',
        editor: 'bg-rose-500 text-black',
        meta: 'text-rose-900'
      }
    case 2:
      return {
        card: 'bg-amber-500 hover:bg-amber-400 text-black',
        editor: 'bg-amber-500 text-black',
        meta: 'text-amber-900'
      }
    case 3:
      return {
        card: 'bg-lime-500 hover:bg-lime-400 text-black',
        editor: 'bg-lime-500 text-black',
        meta: 'text-lime-900'
      }
    case 4:
      return {
        card: 'bg-emerald-500 hover:bg-emerald-400 text-black',
        editor: 'bg-emerald-500 text-black',
        meta: 'text-emerald-900'
      }
    case 5:
      return {
        card: 'bg-sky-500 hover:bg-sky-400 text-black',
        editor: 'bg-sky-500 text-black',
        meta: 'text-sky-900'
      }
    case 6:
      return {
        card: 'bg-violet-500 hover:bg-violet-400 text-black',
        editor: 'bg-violet-500 text-black',
        meta: 'text-violet-900'
      }
    default:
      return {
        card: 'bg-zinc-900 hover:bg-zinc-800',
        editor: 'bg-zinc-900 text-white',
        meta: 'text-zinc-400'
      }
  }
}
