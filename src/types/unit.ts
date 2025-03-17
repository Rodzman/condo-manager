export type Vehicle = {
  id: string
  licensePlate: string
  model: string
  vehicleType?:
  | "personal"
  | "commercial"
  | "taxi"
  | "driving_school"
  | "official"
  | "test"
  | "diplomatic"
  | "collection"
}

export type Resident = {
  id: string
  name: string
  cpf: string
  vehicles: Vehicle[]
  phone: string
  email: string
  birthdate: string
}

export type Unit = {
  id: string
  number: number
  floor: number
  tower: string
  rooms: number
  size: number
  ownerId: string
  residents: Resident[]
  createdAt: Date
  updatedAt: Date
}

export type EditingResident = {
  unitId: string
  residentId: string
}

export type EditingVehicle = {
  unitId: string
  residentId: string
  vehicleId: string
}

