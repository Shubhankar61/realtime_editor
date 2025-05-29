'use client'

import React, { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { io } from 'socket.io-client'
import { useUser } from '../hooks/useUser'
import { getUserColor } from '../utils/color'
import type { Content } from '@tiptap/core'

const socket = io('http://localhost:4000')

interface UserEdit {
  username: string
  content: Content
}

export default function Editor() {
  const username = useUser()
  const [lastEditedBy, setLastEditedBy] = useState<string>('')

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      socket.emit('edit', { username, content: json })
    },
  })

  useEffect(() => {
    if (!editor) return

    socket.on('update', (data: UserEdit) => {
      setLastEditedBy(data.username)
      editor.commands.setContent(data.content)
    })

    return () => {
      socket.off('update')
    }
  }, [editor])

  const userColor = getUserColor(lastEditedBy)

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Collaborative Editor</h2>
      {lastEditedBy && (
        <p className="text-sm mb-4 flex items-center space-x-2">
          <span
            className={`inline-block w-5 h-5 rounded-full border-2 border-white shadow-md`}
            style={{ backgroundColor: userColor }}
            aria-label={`User color for ${lastEditedBy}`}
          />
          <span className="font-semibold text-gray-900">{lastEditedBy}&nbsp;</span>
          <span className="text-gray-600 italic">is editing...</span>
        </p>
      )}
      <EditorContent
        editor={editor}
        className="prose max-w-none border rounded-md p-4 shadow-inner"
        placeholder="Start typing here..."
      />
    </div>
  )
}
