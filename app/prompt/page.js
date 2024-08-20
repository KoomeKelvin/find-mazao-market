'use client' 
import {useState, useRef, useEffect} from "react";
import {Box , Stack, TextField, Button} from '@mui/material'
import Link from 'next/link'

function RenderTextWithParagraphs({ text }) {
  return (
    <div>
      {text.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "I am find-mazao-market assisant, how may I help you"
    }
  ])
  
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  
  
  const sendMessage = async () => {
    if (!message.trim()) return;  // Don't send empty messages
    setIsLoading(true)
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
  
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ])
    }
    setIsLoading(false)
  }
  const messagesEndRef = useRef(null)

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}

useEffect(() => {
  scrollToBottom()
}, [messages])

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
        <Link href="/pay" target="_blank" passHref>
        <Button variant="outlined" color="primary"  sx={{
            color: 'black', // Text color for the outlined button
            borderColor: 'black', // Border color
            '&:hover': {
              backgroundColor: '#424242', // Dark gray background on hover
              borderColor: 'black', // Keep border color black
              color: 'white', // Change text color to white on hover
            },
            margin: 2, // Space between buttons
          }}>
          Buy me coffee to help me build this more
        </Button>
      </Link>
      <Stack
        direction={'column'}
        width="60vw"
        height="90vh"
        border="1px solid gray"
        borderRadius={2}
        p={2}
        spacing={3}
        >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          border="none"
    
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'grey'
                    : 'black'
                }
                color="white"
                borderRadius={16}
                p={3}
                margin={1}
              >
                    <RenderTextWithParagraphs text={message.content} />
                </Box>
            </Box>
          ))}
            <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button variant="contained" onClick={sendMessage}
          disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}