import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NeuralBackground from "../components/NeuralBackground";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at bottom left, rgba(56,189,248,0.15), transparent 45%), linear-gradient(180deg,#f8fafc 0%, #ffffff 70%)"
      }}
    >
      {/* FLOATING GLOW ORBS */}
      <MotionBox
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: -150,
          right: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(37,99,235,0.2)",
          filter: "blur(120px)"
        }}
      />
      <NeuralBackground />
      {/* <MotionBox
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          bottom: -180,
          left: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "rgba(56,189,248,0.2)",
          filter: "blur(140px)"
        }}
      /> */}

      {/* CONTENT */}
      <Box sx={{ width: "100%", px: { xs: 2, md: 6 }, zIndex: 1 }}>
        <Box maxWidth="1150px" mx="auto">
          <MotionStack
            spacing={4}
            maxWidth="760px"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* HEADLINE */}
            <Typography
              sx={{
                fontSize: { xs: "2.4rem", md: "3.5rem" },
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.8px",
                color: "#0f172a"
              }}
            >
              Early detection of neurodegenerative disease{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg,#2563eb,#38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                powered by AI voice biomarkers
              </Box>
            </Typography>

            {/* SUBTEXT */}
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#475569",
                maxWidth: "640px",
                lineHeight: 1.7
              }}
            >
              A student-built screening platform using speech analysis to support
              early neurological risk detection — fast, non-invasive, and
              accessible.
            </Typography>

            {/* CTA BUTTONS */}
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate("/assessment")}
                  sx={{
                    background:
                      "linear-gradient(135deg,#2563eb,#38bdf8)",
                    color: "#fff",
                    textTransform: "none",
                    px: 4.5,
                    py: 1.7,
                    borderRadius: "14px",
                    fontWeight: 600,
                    boxShadow:
                      "0 12px 30px rgba(37,99,235,0.35)"
                  }}
                >
                  Start Voice Assessment
                </Button>
              </MotionBox>

              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate("/diseases")}
                  sx={{
                    border: "1px solid rgba(15,23,42,0.15)",
                    color: "#0f172a",
                    textTransform: "none",
                    px: 4.5,
                    py: 1.7,
                    borderRadius: "14px",
                    bgcolor: "#ffffff",
                    backdropFilter: "blur(8px)"
                  }}
                >
                  Learn More
                </Button>
              </MotionBox>
            </Stack>

            {/* STATS PANEL */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              sx={{
                mt: 2,
                p: 3,
                borderRadius: "18px",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
                display: "flex",
                gap: 5,
                flexWrap: "wrap"
              }}
            >
              {[
                { label: "Method", value: "Voice Based" },
                { label: "Duration", value: "< 2 Minutes" },
                { label: "Processing", value: "AI Powered" }
              ].map((item) => (
                <Box key={item.label}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#0f172a"
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#64748b"
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </MotionBox>
          </MotionStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
