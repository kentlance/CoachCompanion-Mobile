const regimens = [
  {
    id: 1,
    name: "October Skill Focus",
    duration: 45, // in minutes
    // date when regimen is due
    due_date: "2025-10-20",
    assigned_athletes: {
      1: true,
      2: true,
    },
    // athleteSpecific or practiceCategory
    focus: "athleteSpecific",
    // how many drills per athlete limit (min 1 max 6 default 3)
    limitDrills: 3,
  },
  {
    id: 2,
    name: "Team Shooting Session",
    duration: 60,
    due_date: "2025-10-22",
    assigned_athletes: {
      1: true,
      3: true,
      4: true,
    },
    focus: {
      type: "practiceCategory",
      category: "Shooting",
    },
    limitDrills: 3,
  },
];

export default regimens;
