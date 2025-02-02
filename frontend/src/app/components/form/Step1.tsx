/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/components/form/Step1.tsx
"use client";

import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import { State } from "../../state/stateTypes";
import updateAction from "../../state/updateAction";

type Step1Props = {
  onNext: (data: State["data"]) => void;
}

const Step1 = ({ onNext }: Step1Props) => {
  const { register, handleSubmit } = useForm<State["data"]>();
  const { actions } = useStateMachine({actions: { updateAction }});

  const onSubmit = (data: State["data"]) => {
    actions.updateAction(data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="block">Professional Title</label>
        <input 
          {...register("professionalTitle")} 
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block">Country</label>
        <input 
          {...register("country")} 
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-end">
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1;