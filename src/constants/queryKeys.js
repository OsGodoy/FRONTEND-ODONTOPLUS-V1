export const queryKeys = {
  auth: ["authUser"],

  appointments: (filters) => ["appointments", filters],

  newAppointment: (appointment) => ["newAppointment", appointment],

  appointment: (id) => ["appointment", id],

  doctors: ["doctors"],

  patients: ["patients"],

  availableDoctors: (params) => [
    "available-doctors",
    params?.date,
    params?.start_time,
    params?.end_time,
  ],
};
