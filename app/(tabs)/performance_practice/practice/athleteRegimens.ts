const athleteRegimens = [
  {
    id: 1,
    // where the regimen is from
    fromRegimenId: 1,
    // which athlete is assigned to it
    assignedAthleteId: 1,
    // what drills the athlete has to do
    drills: [3, 7, 12, 15, 18, 21],
    // status of each drill, could maybe added to drills object instead
    status: {
      3: "completed",
      7: "pending",
      12: "pending",
      15: "pending",
      18: "not_started",
      21: "not_started",
    },
  },
  {
    id: 2,
    fromRegimenId: 2,
    assignedAthleteId: 3,
    drills: [5, 8, 11, 14],
    status: {
      5: "completed",
      8: "completed",
      11: "pending",
      14: "not_started",
    },
  },
];

export default athleteRegimens;
