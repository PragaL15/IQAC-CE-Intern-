import React from "react";
import { Step, Stepper } from "react-form-stepper";

const StepperComponent = () => {
  return (
    <div>
      <Stepper
        steps={[{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]}
        activeStep={2}
        activeColor="blue"
      />
      <Stepper activeStep={2}>
  <Step label="Children Step 1" />
  <Step label="Children Step 2" />
  <Step label="Children Step 3" />
  <Step label="Children Step 4"/>
</Stepper>
    </div>
  );
};

export default StepperComponent;
