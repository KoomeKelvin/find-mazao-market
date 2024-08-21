import { SignUp } from '@clerk/nextjs'
import {Box} from '@mui/material'

export default function Signup() {

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
    }}
  >
  <SignUp/>
  </Box>
  )
  
}