"use client";

import { Radio } from "@tritonse/tse-constellation";
import { useStateMachine } from "little-state-machine";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

import styles from "./Step2Associate.module.css";

import { onboardingState } from "@/state/stateTypes";
import updateOnboardingForm from "@/state/updateOnboardingForm";

type Step2AssociateProps = {
  onNext: (data: onboardingState["data"]) => void;
  onBack: () => void;
};

export const Step2Associate = ({ onNext, onBack }: Step2AssociateProps) => {
  const { state, actions } = useStateMachine({ actions: { updateOnboardingForm } });

  const specializations = [
    "Rare disease advocacy", "Research", "Public Health",
    "Bioethics", "Law", "Biology", "Medical Writer",
    "Medical Science Liaison", "Laboratory scientist", "Professor",
    "Bioinformatics", "Biotech sales and marketing"
  ];

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: state.onboardingForm,
  });

  const onSubmit = useCallback(
    (data: onboardingState["data"]) => {
      actions.updateOnboardingForm(data);
      onNext(data);
    },
    [actions.updateOnboardingForm, onNext],
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      void handleSubmit(onSubmit)();
    },
    [handleSubmit, onSubmit],
  );

  const watchSpecializations = watch("specializations") || [];
  const isRepresentative = watch("isOrganizationRepresentative");

  const toggleSpecialization = (specialization: string) => {
    const currentSpecializations = [...watchSpecializations];
    const index = currentSpecializations.indexOf(specialization);
    
    if (index === -1) {
      currentSpecializations.push(specialization);
    } else {
      currentSpecializations.splice(index, 1);
    }
    
    setValue("specializations", currentSpecializations);
  };

  const handleRepresentativeSelection = (value: string) => {
    setValue("isOrganizationRepresentative", value === "yes");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div>
          <h2 className={styles.title}>For Associate Members</h2>
        </div>

        <div>
          <label className={styles.label}>
            What is your job title or the name of the service you provide?
          </label>
          <input
            {...register("jobTitle")}
            className={styles.input}
            placeholder="e.g., Genetic Counselor"
          />
        </div>

        <div>
          <label className={styles.label}>Area of Specialization</label>
          <Controller
            name="specializations"
            control={control}
            defaultValue={[]}
            render={() => (
              <div className={styles.specializationContainer}>
                {specializations.map((specialization) => {
                  const isSelected = watchSpecializations.includes(specialization);
                  return (
                    <button
                      key={specialization}
                      type="button"
                      className={`${styles.specializationButton} ${isSelected ? styles.specializationButtonSelected : ""}`}
                      onClick={() => { toggleSpecialization(specialization); }}
                    >
                      {specialization}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

        <div>
          <label className={styles.label}>Are you a representative of an organization?</label>
          <div className={styles.radioGroup}>
            <Radio
              id="representative-yes"
              label="Yes"
              checked={isRepresentative}
              onChange={() => { handleRepresentativeSelection("yes"); }}
            />
            <Radio
              id="representative-no"
              label="No"
              checked={!isRepresentative}
              onChange={() => { handleRepresentativeSelection("no"); }}
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>If yes, what is the name of the organization you are representing?</label>
          <input
            {...register("organizationName")}
            className={styles.input}
            placeholder="Name of organization"
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="button" onClick={onBack} className={styles.backButton}>
            Back
          </button>
          <button type="submit" className={styles.continueButton}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};