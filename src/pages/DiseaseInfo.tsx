import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Stack
} from "@mui/material";
import DiseaseBackground from "../components/DiseaseBackground";

const diseases = [
  {
    name: "Alzheimer's Disease",
    description:
      "A progressive neurodegenerative disorder affecting memory and cognitive function.",
    symptoms:
      "Memory loss, confusion, difficulty with familiar tasks, mood changes.",
    importance:
      "Early detection improves treatment planning and slows cognitive decline."
  },
  {
    name: "Parkinson's Disease",
    description:
      "A neurological movement disorder impacting motor control and coordination.",
    symptoms:
      "Tremors, muscle stiffness, balance problems, slowed movement.",
    importance:
      "Voice biomarkers detect early neurological changes before physical symptoms."
  },
  {
    name: "Huntington's Disease",
    description:
      "A hereditary disorder causing progressive nerve cell degeneration.",
    symptoms:
      "Involuntary movements, behavioral changes, cognitive decline.",
    importance:
      "Early screening supports genetic counseling and long-term care planning."
  },
  {
    name: "ALS (Amyotrophic Lateral Sclerosis)",
    description:
      "A progressive disease affecting motor neurons in the brain and spinal cord.",
    symptoms:
      "Muscle weakness, speech difficulty, swallowing problems.",
    importance:
      "Voice analysis supports early diagnosis and progression monitoring."
  }
];

const DiseaseInfo: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        background:
          "radial-gradient(circle at top right, rgba(56,189,248,0.15), transparent 50%), linear-gradient(180deg,#f8fafc 0%, #ffffff 60%)"
      }}
    >
      <DiseaseBackground />

      {/* Glow Accent Blob */}
      <Box
        sx={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(37,99,235,0.12)",
          filter: "blur(120px)",
          top: -120,
          left: -120,
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* HEADER */}
        <Stack spacing={2.5} alignItems="center" textAlign="center" mb={8}>
          <Chip
            label="Voice Biomarker Research"
            sx={{
              bgcolor: "rgba(37,99,235,0.1)",
              color: "#2563eb",
              fontWeight: 600
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 800,
              color: "#0f172a",
              maxWidth: 720
            }}
          >
            Neurodegenerative Disease Insights
          </Typography>

          <Typography
            sx={{
              maxWidth: 620,
              color: "#475569",
              fontSize: "1rem",
              lineHeight: 1.7
            }}
          >
            Leveraging voice-based biomarkers to enable earlier diagnosis and
            smarter neurological monitoring.
          </Typography>
        </Stack>

        {/* GRID */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {diseases.map((disease, index) => (
            <Box key={index} sx={{ flex: '1 1 350px', maxWidth: 400 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.07)",
                  transition: "0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.12)"
                  }
                }}
              >
                {/* Top Gradient Strip */}
                <Box
                  sx={{
                    height: 6,
                    width: "100%",
                    background:
                      "linear-gradient(90deg,#2563eb,#38bdf8)"
                  }}
                />

                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2.2}>
                    {/* Title */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: "#0f172a"
                      }}
                    >
                      {disease.name}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#475569",
                        lineHeight: 1.6
                      }}
                    >
                      {disease.description}
                    </Typography>

                    {/* Symptoms */}
                    <Box>
                      <Chip
                        label="Symptoms"
                        size="small"
                        sx={{
                          mb: 1,
                          bgcolor: "rgba(37,99,235,0.1)",
                          color: "#2563eb",
                          fontWeight: 600
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "#334155",
                          lineHeight: 1.6
                        }}
                      >
                        {disease.symptoms}
                      </Typography>
                    </Box>

                    {/* Importance */}
                    <Box>
                      <Chip
                        label="Early Detection"
                        size="small"
                        sx={{
                          mb: 1,
                          bgcolor: "rgba(56,189,248,0.12)",
                          color: "#0284c7",
                          fontWeight: 600
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "#334155",
                          lineHeight: 1.6
                        }}
                      >
                        {disease.importance}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default DiseaseInfo;
