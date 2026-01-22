import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 4,
      }}
    >
      <Box>
        <Typography variant="h2" component="h1" gutterBottom>
          AI-Powered Early Detection for Neurodegenerative Disorders
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Using voice biomarkers to screen for conditions like Alzheimer's and Parkinson's with confidence and care.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/assessment')}
            sx={{ px: 4, py: 2 }}
          >
            Start Assessment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;