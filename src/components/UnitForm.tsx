"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import type { Unit } from "@/types/unit";

type UnitFormData = Omit<Unit, "id" | "residents">;

type UnitFormProps = {
  onSubmit: (data: UnitFormData) => void;
  onCancel?: () => void;
  unit?: Unit;
};

export default function UnitForm({ onSubmit, onCancel, unit }: UnitFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UnitFormData>({
    defaultValues: unit,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitForm = async (data: UnitFormData) => {
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
    if (!unit) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700"
        >
          Unit Number
        </label>
        <input
          type="text"
          id="number"
          {...register("number", { required: "Unit number is required" })}
          className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200"
        />
        {errors.number && (
          <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="block"
          className="block text-sm font-medium text-gray-700"
        >
          Block
        </label>
        <input
          type="text"
          id="block"
          {...register("tower")}
          className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="owner"
          className="block text-sm font-medium text-gray-700"
        >
          Owner
        </label>
        <input
          type="text"
          id="owner"
          {...register("ownerId", { required: "Owner name is required" })}
          className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200"
        />
        {errors.ownerId && (
          <p className="mt-1 text-sm text-red-600">{errors.ownerId.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : unit ? "Update Unit" : "Add Unit"}
        </Button>
      </div>
    </form>
  );
}
