import type React from "react";
import { Button } from "@/components/ui/button";
import { getPlateColor } from "@/utils/vehicle";
import type {
  Unit,
  Resident,
  Vehicle,
  EditingResident,
  EditingVehicle,
} from "@/types/unit";

interface UnitListProps {
  units: Unit[];
  onUpdateUnit: (id: string, data: Partial<Unit>) => void;
  onAddResident: (unitId: string, resident: Resident) => void;
  onUpdateResident: (
    unitId: string,
    residentId: string,
    data: Partial<Resident>,
  ) => void;
  onAddVehicle: (unitId: string, residentId: string, vehicle: Vehicle) => void;
  onUpdateVehicle: (
    unitId: string,
    residentId: string,
    vehicleId: string,
    data: Partial<Vehicle>,
  ) => void;
  onDeleteUnit: (id: string) => void;
  onDeleteResident: (unitId: string, residentId: string) => void;
  onDeleteVehicle: (
    unitId: string,
    residentId: string,
    vehicleId: string,
  ) => void;
  setEditingUnit: (unit: Unit | null) => void;
  setEditingResident: (resident: EditingResident | null) => void;
  setEditingVehicle: (vehicle: EditingVehicle | null) => void;
}

const UnitList: React.FC<UnitListProps> = ({
  units,
  onDeleteUnit,
  onDeleteResident,
  onDeleteVehicle,
  setEditingUnit,
  setEditingResident,
  setEditingVehicle,
}) => {

  const handleDeleteUnit = (id: string) => {
    onDeleteUnit(id);
  };

  const handleDeleteResident = (unitId: string, residentId: string) => {
    onDeleteResident(unitId, residentId);
  };

  const handleDeleteVehicle = (
    unitId: string,
    residentId: string,
    vehicleId: string,
  ) => {
    onDeleteVehicle(unitId, residentId, vehicleId);
  };

  return (
    <div>
      {units.map((unit) => (
        <div key={unit.id} className="mb-4 rounded border p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{`Unit ${unit.number}`}</h3>
            <div>
              <Button onClick={() => setEditingUnit(unit)} className="mr-2">
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteUnit(unit.id)}
              >
                Delete
              </Button>
            </div>
          </div>
          {unit.residents.map((resident) => (
            <div key={resident.id} className="mb-2 rounded border p-2">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-md font-semibold">{resident.name}</h4>
                <div>
                  <Button
                    onClick={() =>
                      setEditingResident({
                        unitId: unit.id,
                        residentId: resident.id,
                      })
                    }
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteResident(unit.id, resident.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p>{`Phone: ${resident.phone}`}</p>
              {resident.vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p>
                      License Plate:
                      <span
                        className={getPlateColor(
                          vehicle.vehicleType || "personal",
                        )}
                        style={{ fontWeight: "bold", marginLeft: "4px" }}
                      >
                        {vehicle.licensePlate}
                      </span>
                      {vehicle.vehicleType &&
                        vehicle.vehicleType !== "personal" && (
                          <span className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">
                            {vehicle.vehicleType.replace("_", " ")}
                          </span>
                        )}
                    </p>
                    <p>{`Model: ${vehicle.model}`}</p>
                  </div>
                  <div>
                    <Button
                      onClick={() =>
                        setEditingVehicle({
                          unitId: unit.id,
                          residentId: resident.id,
                          vehicleId: vehicle.id,
                        })
                      }
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        handleDeleteVehicle(unit.id, resident.id, vehicle.id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UnitList;
