import { HourlyVital } from "./types";

const generateHourlyVitals = (patientId: string, base: { hr: number; sys: number; dia: number; temp: number; o2: number; rr: number }, variance: { hr: number; sys: number; dia: number; temp: number; o2: number; rr: number }): HourlyVital[] => {
  const hours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
  return hours.map((hour, i) => {
    const rand = () => (Math.random() - 0.5) * 2;
    return {
      patientId,
      timestamp: `2026-03-19 ${hour}`,
      heartRate: Math.round(base.hr + rand() * variance.hr),
      systolicBP: Math.round(base.sys + rand() * variance.sys),
      diastolicBP: Math.round(base.dia + rand() * variance.dia),
      temperature: +(base.temp + rand() * variance.temp).toFixed(1),
      oxygenSaturation: Math.min(100, Math.max(70, Math.round(base.o2 + rand() * variance.o2))),
      respiratoryRate: Math.round(base.rr + rand() * variance.rr),
    };
  });
};

export const hourlyVitals: HourlyVital[] = [
  ...generateHourlyVitals("P001", { hr: 112, sys: 180, dia: 110, temp: 39.2, o2: 88, rr: 28 }, { hr: 8, sys: 15, dia: 8, temp: 0.5, o2: 3, rr: 4 }),
  ...generateHourlyVitals("P002", { hr: 92, sys: 150, dia: 95, temp: 37.4, o2: 94, rr: 20 }, { hr: 5, sys: 10, dia: 5, temp: 0.3, o2: 2, rr: 2 }),
  ...generateHourlyVitals("P003", { hr: 72, sys: 120, dia: 80, temp: 36.8, o2: 98, rr: 16 }, { hr: 3, sys: 5, dia: 3, temp: 0.2, o2: 1, rr: 1 }),
  ...generateHourlyVitals("P004", { hr: 130, sys: 90, dia: 60, temp: 38.8, o2: 85, rr: 32 }, { hr: 10, sys: 12, dia: 8, temp: 0.6, o2: 4, rr: 5 }),
  ...generateHourlyVitals("P005", { hr: 88, sys: 140, dia: 90, temp: 37.1, o2: 96, rr: 18 }, { hr: 4, sys: 8, dia: 4, temp: 0.2, o2: 1, rr: 2 }),
  ...generateHourlyVitals("P007", { hr: 145, sys: 200, dia: 120, temp: 38.5, o2: 87, rr: 30 }, { hr: 12, sys: 20, dia: 10, temp: 0.4, o2: 3, rr: 4 }),
  ...generateHourlyVitals("P010", { hr: 52, sys: 85, dia: 55, temp: 36.4, o2: 89, rr: 26 }, { hr: 6, sys: 10, dia: 5, temp: 0.3, o2: 3, rr: 3 }),
  ...generateHourlyVitals("P015", { hr: 118, sys: 95, dia: 62, temp: 37.8, o2: 91, rr: 34 }, { hr: 7, sys: 8, dia: 5, temp: 0.4, o2: 2, rr: 3 }),
];
