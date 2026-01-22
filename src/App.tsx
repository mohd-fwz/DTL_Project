import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
  Divider
} from '@mui/material';

import Landing from './pages/Landing';
import VoiceAssessment from './pages/VoiceAssessment';
import DiseaseInfo from './pages/DiseaseInfo';
import TeamInfo from './pages/TeamInfo';

function App() {
  return (
    <Router>
      <CssBaseline />

      {/* App Shell */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f8fafc'
        }}
      >
        {/* Header */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            borderBottom: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          <Toolbar
            sx={{
              maxWidth: '1280px',
              width: '100%',
              mx: 'auto',
              px: { xs: 2, md: 4 }
            }}
          >
            <Typography
              component={Link}
              to="/"
              sx={{
                fontSize: '1.05rem',
                fontWeight: 600,
                letterSpacing: '0.3px',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1
              }}
            >
              Voice Biomarker Platform
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { label: 'Assessment', path: '/assessment' },
                { label: 'Diseases', path: '/diseases' },
                { label: 'Team', path: '/team' }
              ].map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#334155',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(15,23,42,0.05)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: '72px', // matches toolbar height
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/assessment" element={<VoiceAssessment />} />
            <Route path="/diseases" element={<DiseaseInfo />} />
            <Route path="/team" element={<TeamInfo />} />
          </Routes>
        </Box>

        <Divider />

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: 'center',
            backgroundColor: '#ffffff'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.8rem',
              color: '#64748b'
            }}
          >
            © {new Date().getFullYear()} Voice Biomarker Platform — Research Prototype
          </Typography>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
