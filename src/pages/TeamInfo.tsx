import React from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
} from '@mui/material';

const teamMembers = [
  { name: 'Dr. Alice Johnson', role: 'Neurologist' },
  { name: 'Dr. Bob Smith', role: 'AI Researcher' },
  { name: 'Dr. Carol Lee', role: 'Data Scientist' },
  { name: 'Dr. David Kim', role: 'Bioengineer' },
];

const TeamInfo: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Our Team
      </Typography>
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Dedicated professionals committed to advancing neurodegenerative disease detection through innovative technology.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {teamMembers.map((member, index) => (
          <Box sx={{ textAlign: 'center', flex: '1 1 200px' }} key={index}>
            <Avatar
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
            >
              {member.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Typography variant="h6">{member.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {member.role}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TeamInfo;