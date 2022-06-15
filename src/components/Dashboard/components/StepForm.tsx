import { Box, Divider, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { Button } from "./Button";

interface StepFormProps {
  steps: { label: string; element: React.ReactNode }[];
  children: (e: React.ReactNode) => React.ReactNode;
}

export default function StepForm({ steps, children }: StepFormProps) {
  const [step, setStep] = useState(0);
  const ready = step === steps.length - 1;

  const handleNext = () => setStep((active) => active + 1);
  const handlePrevious = () => setStep((active) => active - 1);

  return (
    <Box display={`flex`} flexDirection={`column`} height={`100%`} p={3}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box flexGrow={1} p={3}>
        {children(steps[step].element)}
      </Box>
      <Divider />
      <Grid container justifyContent={`space-between`} mt={3}>
        <Grid item>
          <Button onClick={handlePrevious} disabled={step <= 0}>
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleNext} disabled={ready}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
