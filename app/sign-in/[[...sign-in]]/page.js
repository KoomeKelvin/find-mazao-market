import { SignIn} from '@clerk/nextjs'
import {Box} from "@mui/material"

export default function Signin() {
    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
        }}
      >
        <SignIn />
      </Box>
    )

}