"use client";

import { useStateMachine } from "little-state-machine";
import { useCallback, useState } from "react";

import {
  Associate,
  Basics,
  Category,
  Questionnaire,
  Result,
  Student,
} from "@/components/onboardingForm";
import { onboardingState } from "@/state/stateTypes";
import updateOnboardingForm from "@/state/updateOnboardingForm";

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const { state, actions } = useStateMachine({ actions: { updateOnboardingForm } });

  const handleNext = useCallback(
    (data: onboardingState["data"]) => {
      actions.updateOnboardingForm(data);

      setStep((prevStep) => {
        if (prevStep === 3) {
          return prevStep + 2;
        } else {
          return prevStep + 1;
        }
      });
    },
    [actions, setStep],
  );

  const handleBack = useCallback(() => {
    setStep((prev) => Math.max(1, prev - 1));
  }, [setStep]);

  const handleReset = useCallback(() => {
    actions.updateOnboardingForm({
      professionalTitle: { value: "", label: "" },
      country: { value: "", label: "" },
      languages: [],
    });
    setStep(1);
  }, [actions, setStep]);

  // Special flow handlers for Student and Associate Member paths
  const handleStudentFlow = useCallback(() => {
    setStep(2.1); // Use decimal to represent the student sub-step
  }, [setStep]);

  const handleAssociateFlow = useCallback(() => {
    setStep(2.2);
  }, [setStep]);

  const continueFromIntermediateStep = useCallback(() => {
    setStep(3); // Go to Step3A after either intermediate step
  }, [setStep]);

  return (
    <div className="w-full h-full">
      {step === 1 && <Basics onNext={handleNext} />}

      {step === 2 && (
        <Questionnaire
          onNext={handleNext}
          onBack={handleBack}
          onStudentFlow={handleStudentFlow}
          onAssociateFlow={handleAssociateFlow}
        />
      )}

      {step === 2.1 && (
        <Student
          onNext={continueFromIntermediateStep}
          onBack={() => {
            setStep(2);
          }}
        />
      )}

      {step === 2.2 && (
        <Associate
          onNext={continueFromIntermediateStep}
          onBack={() => {
            setStep(2);
          }}
        />
      )}

      {step === 3 && (
        <Category
          onNext={handleNext}
          onBack={() => {
            // If we're coming from an intermediate step, go back to Step2
            const membership = state.onboardingForm.membership;
            if (membership === "Student") {
              setStep(2.1);
            } else if (membership === "Associate Member") {
              setStep(2.2);
            } else {
              setStep(2);
            }
          }}
        />
      )}

      {step === 5 && <Result onReset={handleReset} />}
    </div>
  );
}
