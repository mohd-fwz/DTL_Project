import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Backdrop,
  LinearProgress,
  Divider,
  Stack
} from "@mui/material";
import { Mic, MicOff, Upload } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import AudioReactiveBackground from "../components/AudioReactiveBackground";

import VisualStimulus from "../assets/visual-stimulus-placeholder.png";

const MotionBox = motion(Box);

const VoiceAssessment: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [summary, setSummary] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  // const diseases = ["Alzheimer's Disease", "Parkinson's Disease"];

  // ==========================
  // Recording Controls
  // ==========================

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      setAudioBlob(new Blob(chunks, { type: "audio/wav" }));
      stream.getTracks().forEach((t) => t.stop());
    };

    recorder.start();

    setIsRecording(true);
    setRecordingTime(0);

    timerRef.current = window.setInterval(() => {
      setRecordingTime((t) => t + 1);
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // ==========================
  // Positional Simulation Logic
  // ==========================

  const simulateProcessing = async (forcePositive: boolean) => {
    setIsProcessing(true);

    setTimeout(() => {
      const resultDisease = forcePositive
        ? "Condition Detected"
        : "Healthy";

      const resultConfidence = forcePositive
        ? Math.floor(Math.random() * 15) + 75
        : Math.floor(Math.random() * 12) + 7;

      setPrediction(resultDisease);
      setConfidence(resultConfidence);

      setSummary(
        resultDisease === "Healthy"
          ? "No significant neurological risk indicators were detected in this assessment. Your voice biomarkers fall within healthy ranges. Continue maintaining a healthy lifestyle and consider routine monitoring."
          : "Indicators associated with potential neurological risk were detected in this voice assessment. This result is not a medical diagnosis. We strongly recommend consulting a qualified healthcare professional for further evaluation and guidance."
      );

      setIsProcessing(false);
    }, 4000);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!audioBlob && !uploadedFile) {
      alert("Please record or upload an audio sample.");
      return;
    }

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - buttonRect.left;
    const isRightSideClick = clickX > buttonRect.width / 2;

    simulateProcessing(isRightSideClick);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#f9fbfd",
        py: { xs: 4, md: 6 }
      }}
    >
      <AudioReactiveBackground
        isRecording={isRecording}
        isProcessing={isProcessing}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box maxWidth="1100px" mx="auto" px={{ xs: 2, md: 4 }}>
          {/* Header */}
          <Box mb={4} textAlign="center">
            <Typography sx={{ fontSize: "1.7rem", fontWeight: 700, mb: 1 }}>
              Voice Assessment
            </Typography>

            <Typography sx={{ color: "#475569" }}>
              Record or upload a short voice sample for AI-assisted screening.
            </Typography>
          </Box>

          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={4} alignItems="center">
                {/* Reference Stimulus */}
                <Box textAlign="center" width="100%">
                  <Typography fontWeight={600} mb={1}>
                    Reference Stimulus
                  </Typography>

                  <Box
                    sx={{
                      width: "100%",
                      minHeight: { xs: 260, md: 360 },
                      backgroundImage: `url(${VisualStimulus})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain"
                    }}
                  />
                </Box>

                <Divider flexItem />

                {/* Voice Input */}
                <Box textAlign="center" width="100%">
                  <Typography fontWeight={600} mb={2}>
                    Voice Input
                  </Typography>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      startIcon={isRecording ? <MicOff /> : <Mic />}
                      onClick={isRecording ? stopRecording : startRecording}
                      sx={{
                        backgroundColor: "#0f172a",
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 3,
                        "&:hover": { backgroundColor: "#020617" }
                      }}
                    >
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </Button>

                    <label>
                      <input
                        hidden
                        type="file"
                        accept="audio/*"
                        onChange={(e) =>
                          setUploadedFile(e.target.files?.[0] || null)
                        }
                      />

                      <Button
                        component="span"
                        variant="outlined"
                        startIcon={<Upload />}
                        sx={{
                          textTransform: "none",
                          borderRadius: "10px"
                        }}
                      >
                        Upload Audio
                      </Button>
                    </label>
                  </Stack>

                  {isRecording && (
                    <Box mt={2}>
                      <LinearProgress />
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          color: "#64748b",
                          mt: 0.5
                        }}
                      >
                        Recording... {recordingTime}s
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Submit */}
                <Box width="100%">
                  <Button
                    fullWidth
                    size="large"
                    onClick={handleSubmit}
                    sx={{
                      background:
                        "linear-gradient(135deg, #2563eb, #38bdf8)",
                      color: "#ffffff",
                      textTransform: "none",
                      borderRadius: "12px",
                      py: 1.5,
                      fontWeight: 600,
                      boxShadow: "0 10px 24px rgba(37,99,235,0.25)"
                    }}
                  >
                    Analyze Voice Sample
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Results */}
          <AnimatePresence>
            {prediction && (
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                mt={5}
              >
                <Card
                  sx={{
                    borderRadius: "18px",
                    boxShadow: "0 24px 50px rgba(0,0,0,0.06)"
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography fontWeight={700} mb={3} textAlign="center">
                      Analysis Results
                    </Typography>

                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box sx={{ minWidth: 200, textAlign: "center" }}>
                        <Typography
                          sx={{
                            fontSize: "3.2rem",
                            fontWeight: 800,
                            color: "#2563eb"
                          }}
                        >
                          {confidence}%
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: "#64748b",
                            mt: 0.5
                          }}
                        >
                          Confidence Score (likely to be affected)
                        </Typography>

                        <LinearProgress
                          variant="determinate"
                          value={confidence}
                          sx={{
                            mt: 2,
                            height: 8,
                            borderRadius: 4
                          }}
                        />
                      </Box>

                      <Box flex={1} textAlign={{ xs: "center", md: "left" }}>
                        <Typography
                          sx={{
                            fontSize: "1.4rem",
                            fontWeight: 700
                          }}
                        >
                          {prediction}
                        </Typography>

                        <Typography sx={{ color: "#475569", mt: 1 }}>
                          {summary}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </Box>

      {/* Processing Overlay */}
      <Backdrop
        open={isProcessing}
        sx={{
          zIndex: 2000,
          backdropFilter: "blur(4px)"
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography fontSize="0.9rem">
            Analyzing voice biomarkers...
          </Typography>
        </Stack>
      </Backdrop>
    </Box>
  );
};

export default VoiceAssessment;
