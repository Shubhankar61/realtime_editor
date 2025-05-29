import { useEffect, useState } from 'react'

export function useUser() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const name = prompt('Enter your name:')
    if (name) setUsername(name)
  }, [])

  return username
}
