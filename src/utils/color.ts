export function getUserColor(username: string | null | undefined): string {
  if (!username) return 'gray'
  const colors = [
    'red', 'blue', 'green', 'purple', 'orange', 'pink', 'teal',
    'yellow-500', 'indigo-600', 'lime-600', 'cyan-500', 'rose-600', 'amber-500', 'emerald-600'
  ]
  const index = [...username].reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}
