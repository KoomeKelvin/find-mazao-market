 'use client' 
import {useState} from "react";
import {Box , Stack, TextField, Button} from '@mui/material'


export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "I am find-mazao-market assisant, how may I help you"
    }
  ])
  
  const [message, setMessage] = useState('')
  
  const sendMessage= (async()=>{
    //asychronous functtion to reach to open api

    setMessage('')  // Clear the input field
  setMessages((messages) => [
    ...messages,
    { role: 'user', content: message },  // Add the user's message to the chat
    { role: 'assistant', content: '' }, 
  ])

  
  //sample fake data 
 messages.append([{
  role: "assistant",
  content: "Potatoes are on high sales in Nairobi, Muthurwa"
},
{
  role: "assistant",
content: "The price of potatoes is 5000 per bag"
}
])

  setMessages((messages) => {
    let lastMessage = messages[messages.length - 1]  // Get the last message (assistant's placeholder)
    let otherMessages = messages.slice(0, messages.length - 1)  // Get all other messages
    return [
      ...otherMessages,
      { ...lastMessage, content: lastMessage.content + text },  // Append the decoded text to the assistant's message
    ]
  })

  })

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
        >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
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
              >
                {message.content}
                </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}