import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Landing from './pages/Landing';
import VoiceAssessment from './pages/VoiceAssessment';
import DiseaseInfo from './pages/DiseaseInfo';
import TeamInfo from './pages/TeamInfo';

function App() {
  return (
    <Router>
      <AppBar position="fixed" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Voice Biomarker Platform
          </Typography>
          <Button color="inherit" component={Link} to="/assessment">
            Assessment
          </Button>
          <Button color="inherit" component={Link} to="/diseases">
            Diseases
          </Button>
          <Button color="inherit" component={Link} to="/team">
            Team
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ pt: 8 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assessment" element={<VoiceAssessment />} />
          <Route path="/diseases" element={<DiseaseInfo />} />
          <Route path="/team" element={<TeamInfo />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
