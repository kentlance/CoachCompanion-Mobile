// this table is created when a new regimen entry is created; assigned to athletes

/**
 * id
 * regimenId (from regimens table foreign key)
 * assignedAthleteId (from athlete table)
 * assignedDrillsId (chosen drills by algorithm)
 * assignedDrillsStatus (completed, pending, not_started - respective to each assignedDrills)
 * regimenStatus (assigned, missing, done)
 */

const assignedRegimens = [
  {
    id: 1,
    regimenId: 1,
    assignedAthleteId: 1,
    assignedDrillsId: [1, 2, 3],
    assignedDrillsStatus: ["completed", "pending", "not_started"],
    regimenStatus: "assigned",
  },
  {
    id: 2,
    regimenId: 1,
    assignedAthleteId: 2,
    assignedDrillsId: [4, 5, 6],
    assignedDrillsStatus: ["completed", "pending", "not_started"],
    regimenStatus: "assigned",
  },
];

export default assignedRegimens;
