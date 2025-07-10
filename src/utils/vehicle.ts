/**
 * Returns the CSS text color class corresponding to a given vehicle type.
 *
 * @param type - The vehicle type to map to a color class
 * @returns The CSS class name for the text color associated with the specified vehicle type
 */
export function getPlateColor(type: string): string {
  switch (type) {
    case "commercial":
    case "taxi":
    case "driving_school":
      return "text-red-600";
    case "official":
      return "text-blue-600";
    case "test":
      return "text-green-600";
    case "diplomatic":
      return "text-yellow-600";
    case "collection":
      return "text-gray-400";
    default:
      return "text-black";
  }
}
