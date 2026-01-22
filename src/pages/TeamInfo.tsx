import React from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Stack
} from "@mui/material";
import TeamNetworkBackground from "../components/TeamNetworkBackground";

const teamMembers = [
  {
    name: "Mohammed Fawaz Zakir",
    role: "Backend Developer",
    image: "/images/fawaz.png"
  },
  {
    name: "Mohammed Aman Jukaku",
    role: "Machine Learning Engineer",
    image: "/images/aman.jpg"
  },
  {
    name: "Krrish Agarwal",
    role: "Frontend Developer",
    image: "images/krrish.jpeg"
  },
  {
    name: "Karthikey Sharma",
    role: "Voice Processing and Designing",
    image: "/images/karthikey.png"
  }
];

const TeamInfo: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 10 },
        background:
          "linear-gradient(180deg, #f9fbfd 0%, #ffffff 70%)"
      }}
    >
  <TeamNetworkBackground />
      <Container
  maxWidth="lg"
  sx={{
    position: "relative",
    zIndex: 1,

    // Glass content panel
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(8px)",
    borderRadius: "28px",

    // Spacing
    py: { xs: 4, md: 5 },
    px: { xs: 2, md: 4 },

    // Elevation
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)"
  }}
>

        {/* HEADER */}
        <Stack spacing={2} alignItems="center" textAlign="center" mb={7}>
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.4rem" },
              fontWeight: 800,
              color: "#0f172a"
            }}
          >
            Meet Our Team
          </Typography>

          <Typography
            sx={{
              maxWidth: 620,
              color: "#475569",
              fontSize: "1rem",
              lineHeight: 1.7
            }}
          >
            We’re a group of college students passionate about using technology,
            data, and creativity to explore innovative solutions for early
            neurological disease detection.
          </Typography>
        </Stack>

        {/* TEAM GRID */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {teamMembers.map((member, index) => (
            <Box key={index} sx={{ flex: '1 1 250px', maxWidth: 300 }}>
              <Card
                sx={{
                  textAlign: "center",
                  borderRadius: "20px",
                  height: "100%",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
                  transition: "0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2} alignItems="center">
                    {/* Avatar */}
                    <Avatar
                      src={member.image}
                      sx={{
                        width: 96,
                        height: 96,
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        bgcolor: "#2563eb"
                      }}
                    >
                      {!member.image &&
                        member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </Avatar>

                    {/* Name */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#0f172a"
                      }}
                    >
                      {member.name}
                    </Typography>

                    {/* Role */}
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "#475569"
                      }}
                    >
                      {member.role}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* FOOTER NOTE */}
        <Box textAlign="center" mt={7}>
          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "#64748b",
              maxWidth: 720,
              mx: "auto"
            }}
          >
            This project was developed as part of our academic coursework and
            research initiative, combining computer science, data science, and
            healthcare innovation concepts.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TeamInfo;
