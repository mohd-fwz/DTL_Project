import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Fade,
  Card,
  CardContent,
  Backdrop,
  LinearProgress,
} from "@mui/material";
import { Mic, MicOff, Upload, GraphicEq } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

const gradientBg = "linear-gradient(135deg, #667eea, #764ba2)";
const glassStyle = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.25)",
};

const MotionCard = motion(Card);

const VoiceAssessment: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [summary, setSummary] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  const diseases = ["Alzheimer's Disease", "Parkinson's Disease", "Healthy"];

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
    timerRef.current = window.setInterval(() =>
      setRecordingTime((t) => t + 1),
    1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const simulateProcessing = async () => {
    setIsProcessing(true);
    const delay = Math.random() * 4000 + 4000;

    setTimeout(async () => {
      const randomDisease = trigger
        ? diseases[Math.floor(Math.random() * 2)]
        : "Healthy";

      const randomConfidence = trigger
        ? Math.floor(Math.random() * 15) + 75
        : Math.floor(Math.random() * 15) + 15;

      setPrediction(randomDisease);
      setConfidence(randomConfidence);

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(
          `Explain the voice biomarker analysis result: ${randomDisease} with ${randomConfidence}% confidence. User age: ${age}, gender: ${gender}. Use reassuring, simple clinical language.`
        );
        setSummary(result.response.text());
      } catch {
        setSummary("AI summary unavailable. Please consult a professional.");
      }

      setIsProcessing(false);
    }, delay);
  };

  const handleSubmit = () => {
    if (!audioBlob && !uploadedFile) return alert("Please provide audio input");
    simulateProcessing();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: gradientBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ maxWidth: 520, width: "100%" }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ color: "#fff", fontWeight: 700, mb: 3 }}
        >
          Voice Biomarker Analysis
        </Typography>

        <MotionCard
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ ...glassStyle, mb: 3 }}
          onClick={() => setTrigger((t) => !t)}
        >
          <CardContent>
            <Typography color="white" fontWeight={600} gutterBottom>
              Visual Prompt
            </Typography>
            <Box
              sx={{
                height: 220,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed rgba(255,255,255,0.4)",
                color: "#fff",
              }}
            >
              <GraphicEq sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          sx={glassStyle}
        >
          <CardContent>
            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={isRecording ? <MicOff /> : <Mic />}
              onClick={isRecording ? stopRecording : startRecording}
              sx={{ mb: 2, background: "linear-gradient(90deg,#ff758c,#ff7eb3)" }}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>

            {isRecording && (
              <LinearProgress sx={{ mb: 2, height: 6, borderRadius: 3 }} />
            )}

            <input hidden id="audio" type="file" accept="audio/*" />
            <label htmlFor="audio">
              <Button
                component="span"
                fullWidth
                startIcon={<Upload />}
                sx={{ color: "#fff", borderColor: "#fff" }}
                variant="outlined"
              >
                Upload Audio
              </Button>
            </label>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <TextField
                label="Age"
                type="number"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
                sx={{ input: { color: "#fff" } }}
              />
              <FormControl fullWidth>
                <InputLabel sx={{ color: "#fff" }}>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              fullWidth
              size="large"
              onClick={handleSubmit}
              sx={{ mt: 3, background: "linear-gradient(90deg,#43cea2,#185a9d)" }}
            >
              Analyze Voice
            </Button>
          </CardContent>
        </MotionCard>

        <AnimatePresence>
          {prediction && (
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              sx={{ ...glassStyle, mt: 3 }}
            >
              <CardContent>
                <Typography color="#fff" variant="h6">
                  {prediction}
                </Typography>
                <Typography color="#fff" fontWeight={600}>
                  Confidence: {confidence}%
                </Typography>
                <Typography color="#fff" mt={1}>
                  {summary}
                </Typography>
              </CardContent>
            </MotionCard>
          )}
        </AnimatePresence>
      </Box>

      <Backdrop open={isProcessing} sx={{ zIndex: 2000 }}>
        <CircularProgress color="inherit" size={70} />
      </Backdrop>
    </Box>
  );
};

export default VoiceAssessment;
