"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/types/unit";
import { getPlateColor } from "@/utils/vehicle";

type VehicleFormData = Omit<Vehicle, "id">;

type VehicleFormProps = {
  onSubmit: (data: VehicleFormData) => void;
  onCancel?: () => void;
  vehicle?: Vehicle;
};

/**
 * Renders a form for creating or editing vehicle information, including vehicle type, license plate, and model.
 *
 * The form supports validation for Mercosul license plate format and displays dynamic styling based on the selected vehicle type. On submission, it invokes the provided callback with the form data. If editing an existing vehicle, fields are prefilled; otherwise, the form resets after successful submission. An optional cancel button is shown if a cancel handler is provided.
 */
export default function VehicleForm({
  onSubmit,
  onCancel,
  vehicle,
}: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<VehicleFormData>({
    defaultValues: vehicle,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const vehicleType = watch("vehicleType") || "personal";

  const onSubmitForm = async (data: VehicleFormData) => {
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
    if (!vehicle) reset();
  };


  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label
          htmlFor="vehicleType"
          className="block text-sm font-medium text-gray-700"
        >
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          {...register("vehicleType")}
          className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200"
        >
          <option value="personal">Personal Vehicle (Black)</option>
          <option value="commercial">Commercial Vehicle (Red)</option>
          <option value="taxi">Taxi (Red)</option>
          <option value="driving_school">Driving School (Red)</option>
          <option value="official">Official Vehicle (Blue)</option>
          <option value="test">Test Vehicle (Green)</option>
          <option value="diplomatic">Diplomatic Vehicle (Gold)</option>
          <option value="collection">Collection Vehicle (Silver)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="licensePlate"
          className="block text-sm font-medium text-gray-700"
        >
          License Plate (Mercosul Format)
        </label>
        <div className="relative">
          <input
            type="text"
            id="licensePlate"
            {...register("licensePlate", {
              required: "License plate is required",
              pattern: {
                value: /^[A-Z0-9]{7}$/,
                message:
                  "License plate must be 7 alphanumeric characters (Mercosul format)",
              },
              validate: {
                mercosulFormat: (value) => {
                  // Count letters and numbers
                  const letters = (value.match(/[A-Z]/g) || []).length;
                  const numbers = (value.match(/[0-9]/g) || []).length;
                  return (
                    (letters === 4 && numbers === 3) ||
                    "Mercosul format requires 4 letters and 3 numbers"
                  );
                },
              },
            })}
            placeholder="ABC1D23"
            className={`focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200 ${getPlateColor(vehicleType)}`}
          />
          <div className="absolute top-2 right-3 text-xs text-gray-500">
            Mercosul
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Format: 4 letters and 3 numbers (e.g., ABC1D23)
        </p>
        {errors.licensePlate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.licensePlate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700"
        >
          Vehicle Model
        </label>
        <input
          type="text"
          id="model"
          {...register("model", { required: "Vehicle model is required" })}
          className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200"
        />
        {errors.model && (
          <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
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
            : vehicle
              ? "Update Vehicle"
              : "Add Vehicle"}
        </Button>
      </div>
    </form>
  );
}
