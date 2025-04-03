"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { Resident } from "@/types/unit";

type ResidentFormData = Omit<Resident, "id" | "vehicles">;

type ResidentFormProps = {
  onSubmit: (data: ResidentFormData) => void;
  onCancel?: () => void;
  resident?: Resident;
};

export default function ResidentForm({
  onSubmit,
  onCancel,
  resident,
}: ResidentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResidentFormData>({
    defaultValues: resident,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitForm = async (data: ResidentFormData) => {
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
    if (!resident) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Resident Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Resident name is required" })}
          className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="cpf"
          className="block text-sm font-medium text-gray-700"
        >
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          {...register("cpf", {
            required: "CPF is required",
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: "CPF must be in the format 000.000.000-00",
            },
          })}
          placeholder="000.000.000-00"
          className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200"
        />
        {errors.cpf && (
          <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : resident
              ? "Update Resident"
              : "Add Resident"}
        </Button>
      </div>
    </form>
  );
}
