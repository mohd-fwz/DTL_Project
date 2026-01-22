import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const diseases = [
  {
    name: "Alzheimer's Disease",
    description: "A progressive neurodegenerative disorder causing memory loss and cognitive decline.",
    symptoms: "Memory loss, confusion, difficulty with familiar tasks, mood changes.",
    importance: "Early detection allows for better management and potential treatment options.",
  },
  {
    name: "Parkinson's Disease",
    description: "A movement disorder affecting coordination and causing tremors.",
    symptoms: "Tremors, stiffness, balance issues, slowed movement.",
    importance: "Voice biomarkers can detect subtle changes before physical symptoms appear.",
  },
  {
    name: "Huntington's Disease",
    description: "An inherited disorder causing progressive breakdown of nerve cells in the brain.",
    symptoms: "Uncontrolled movements, cognitive decline, psychiatric symptoms.",
    importance: "Early screening is crucial for genetic counseling and planning.",
  },
  {
    name: "ALS (Amyotrophic Lateral Sclerosis)",
    description: "A progressive neurodegenerative disease affecting nerve cells in the brain and spinal cord.",
    symptoms: "Muscle weakness, difficulty speaking and swallowing, respiratory issues.",
    importance: "Voice analysis can help in early diagnosis and monitoring progression.",
  },
];

const DiseaseInfo: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Understanding Neurodegenerative Diseases
      </Typography>
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Neurodegenerative diseases affect millions worldwide. Early detection through voice biomarkers offers hope for timely intervention and improved quality of life.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {diseases.map((disease, index) => (
          <Box sx={{ flex: '1 1 300px' }} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {disease.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {disease.description}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Symptoms:
                </Typography>
                <Typography variant="body2" paragraph>
                  {disease.symptoms}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Early Detection Importance:
                </Typography>
                <Typography variant="body2">
                  {disease.importance}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default DiseaseInfo;