
'use client'

import { Container, Typography, Button, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link'

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#808080',
  color: '#fff',
  padding: theme.spacing(10, 0),
  borderRadius: '5px',
  textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
}));

const TestimonialsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[100],
}));

export default function Home() {
  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <Typography variant='h2' gutterBottom>
        Your Smart Hass Avocado Farming Partner: From Seed to Market
        </Typography>
        <Typography variant='h5' gutterBottom>
        Empower your avocado farm with AI-driven insights at every stage—planting, grafting, harvesting, and selling. Let our intelligent assistant guide you to a bountiful harvest and profitable sale
        </Typography>
      <Link href='/sign-up' passHref>
        <Button variant='contained' color='primary'
        sx={{
            backgroundColor: 'black', // Default background color
            '&:hover': {
              backgroundColor: '#424242', // Dark gray on hover
            },
          }}>
          Sign Up
        </Button>
      </Link>
      <Link href='/sign-in' passHref>
        <Button variant='outlined' color='primary'  sx={{
            color: 'black', // Text color for the outlined button
            borderColor: 'black', // Border color
            '&:hover': {
              backgroundColor: '#424242', // Dark gray background on hover
              borderColor: 'black', // Keep border color black
              color: 'white', // Change text color to white on hover
            },
            marginLeft: 2, // Space between buttons
          }}>
          Sign In
        </Button>
      </Link>
      </HeroSection>

      {/* Features Section */}
      <Box py={10}>
        <Typography variant='h4' align='center' gutterBottom>
        
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                Personalized Hass Avocado Farming Guidance
                </Typography>
                <Typography variant='body1'>
                Our AI assistant provides step-by-step guidance based on your farms unique conditions.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                Real-time Problem Solving
                </Typography>
                <Typography variant='body1'>
                Facing issues with pests or plant diseases? Chat with our AI to diagnose
                problems and get instant solutions, ensuring your avocado trees stay
                healthy and productive
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                Market Insights and Connections
                </Typography>
                <Typography variant='body1'>
                Stay ahead with real-time market data and connect directly with buyers. 
                Our AI helps you navigate the best marketing strategies and find the 
                most profitable markets for your produce
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <Typography variant='h4' align='center' gutterBottom>
        </Typography>
        <Grid container spacing={4} display='flex' justifyContent='center' alignItems='center'>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display='flex' alignItems='center' mb={2}>
                <Avatar alt='User One' src='/user1.jpg' />
                  <Box ml={2}>
                    <Typography variant='h6'>Koome Kelvin</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Creator of find-mazao-market
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='body1'>
                  I decided to plant 20 hass avocado seedlings and do everything for myself.. 
                  so i decided to build this AI assistant to help me out.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TestimonialsSection>

      {/* Footer */}
      <Box py={4} textAlign='center'>
        <Typography variant='body2' color='textSecondary'>
          © {new Date().getFullYear()} find-mazao-market. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
