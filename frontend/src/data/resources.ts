import { Resource } from "./types";

export const resources: Resource[] = [
  { type: "ICU Beds", total: 12, occupied: 8, available: 4 },
  { type: "General Beds", total: 40, occupied: 28, available: 12 },
  { type: "Ventilators", total: 8, occupied: 5, available: 3 },
  { type: "Nurses on Shift", total: 24, occupied: 20, available: 4 },
  { type: "Doctors on Call", total: 8, occupied: 6, available: 2 },
  { type: "Cardiac Monitors", total: 15, occupied: 12, available: 3 },
  { type: "Infusion Pumps", total: 30, occupied: 22, available: 8 },
  { type: "Wheelchairs", total: 20, occupied: 8, available: 12 },
];
