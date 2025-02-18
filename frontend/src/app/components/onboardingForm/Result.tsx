"use client";

import { useStateMachine } from "little-state-machine";

import updateOnboardingForm from "../../../state/updateAction";

type ResultProps = {
  onReset: () => void;
};

const Result = ({ onReset }: ResultProps) => {
  const { state } = useStateMachine({ actions: { updateOnboardingForm } });

  return (
    <div>
      <h2 className="text-xl font-bold">Form Submission Result</h2>
      <p>
        <strong>Professional Title:</strong> {state.onboardingForm.professionalTitle}
      </p>
      <p>
        <strong>Country:</strong> {state.onboardingForm.country}
      </p>
      <p>
        <strong>Field1:</strong> {state.onboardingForm.field1}
      </p>
      <button onClick={onReset}>Back</button>
    </div>
  );
};

export default Result;
