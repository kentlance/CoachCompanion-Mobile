const drills_list = [
  {
    id: 1,
    from_id: 1,
    name: "Three Point Shooting",
    description: "Drill to improve three point shooting consistency and form.",
    steps: [
      "1. Start at the three-point line, on the wings or top of the key.",
      "2. Count successful shots within one minute.",
      "3. Focus on proper footwork and follow-through.",
    ],
    // Focus: How often they make 3-pointers
    good_for: ["_3PTS_PCT", "FG_PCT", "points"],
  },
  {
    id: 2,
    from_id: 2,
    name: "Stationary Dribbling Drill",
    description: "Drill to improve ball control and hand-eye coordination.",
    steps: [
      "1. Stand with feet shoulder-width apart.",
      "2. Dribble the ball with one hand, focusing on keeping the head up and staying low.",
      "3. Switch hands and repeat for 30 seconds per hand.",
    ],
    // Focus: Minimizing loss of control
    good_for: ["turnovers", "assists"],
  },
  {
    id: 3,
    from_id: 2,
    name: "Figure-Eight Drill",
    description: "Drill to improve ball control and agility around the legs.",
    steps: [
      "1. Dribble the ball in a figure-eight pattern around your legs.",
      "2. Maintain a low stance and focus on speed and control.",
      "3. Repeat rapidly without looking down.",
    ],
    // Focus: Maintaining possession under complex movement
    good_for: ["turnovers", "assists"],
  },
  {
    id: 4,
    from_id: 2,
    name: "Cone Drill",
    description:
      "Drill to improve ball control while moving and executing moves.",
    steps: [
      "1. Set up cones in a straight line or zig-zag pattern.",
      "2. Dribble through the cones using various moves (crossovers, behind-the-back).",
      "3. Focus on protecting the ball while moving quickly.",
    ],
    // Focus: Maintaining possession during aggressive offense
    good_for: ["turnovers", "assists"],
  },
  {
    id: 5,
    from_id: 3,
    name: "Partner Passing Drill",
    description: "Drill to improve passing accuracy and teamwork.",
    steps: [
      "1. Find a partner and stand 10 feet apart.",
      "2. Practice chest passes and bounce passes, focusing on timing and accuracy.",
      "3. Gradually increase distance or add movement.",
    ],
    // Focus: Improving passes that lead directly to scoring opportunities
    good_for: ["assists", "turnovers"],
  },
  {
    id: 6,
    from_id: 3,
    name: "Wall Passing Drill",
    description:
      "Drill to improve passing accuracy and strength in tight spaces.",
    steps: [
      "1. Stand 5 feet away from a wall.",
      "2. Pass the ball hard against the wall.",
      "3. Immediately catch the rebound and pass again. Repeat rapidly.",
    ],
    // Focus: Speed and accuracy of passes
    good_for: ["assists", "turnovers"],
  },
  {
    id: 7,
    from_id: 3,
    name: "Weave Passing Drill",
    description:
      "Drill to improve passing accuracy and agility during movement.",
    steps: [
      "1. Set up cones in a zig-zag pattern.",
      "2. Weave through the cones while passing the ball to a partner.",
      "3. Focus on sharp passes while running.",
    ],
    // Focus: Passes during game-speed movement
    good_for: ["assists", "FG_PCT"],
  },
  {
    id: 8,
    from_id: 4,
    name: "Ladder Drill",
    description: "Drill to improve foot speed and defensive quickness.",
    steps: [
      "1. Set up an agility ladder on the ground.",
      "2. Perform various footwork patterns through the ladder (e.g., lateral shuffles, high knees).",
      "3. Focus on quick, light steps and explosive movements.",
    ],
    // Focus: Improving reaction time for defense (leading to steals/blocks)
    good_for: ["steals", "blocks"],
  },
  {
    id: 9,
    from_id: 4,
    name: "Carioca Drill",
    description: "Drill to improve defensive lateral movement and agility.",
    steps: [
      "1. Set up cones in a zig-zag pattern.",
      "2. Perform carioca drills between the cones, maintaining a low defensive stance.",
      "3. Focus on quick changes in direction.",
    ],
    // Focus: Lateral speed and agility for defense
    good_for: ["steals", "blocks"],
  },
  {
    id: 10,
    from_id: 4,
    name: "Box Jump Drill",
    description:
      "Drill to improve explosiveness, vertical power, and conditioning.",
    steps: [
      "1. Set up a box or bench.",
      "2. Jump up onto the box and immediately step/jump back down.",
      "3. Repeat for 30 seconds, focusing on explosive lift.",
    ],
    // Focus: Vertical lift necessary for jump balls and rebounding
    good_for: ["REB", "blocks"],
  },
  {
    id: 11,
    from_id: 1,
    name: "Free Throw Shooting Drill",
    description:
      "Drill to improve shooting accuracy and technique from the free-throw line.",
    steps: [
      "1. Stand at the free throw line.",
      "2. Shoot 10 free throws, maintaining a consistent routine and form.",
      "3. Record your successful makes.",
    ],
    // Focus: Free Throw Percentage
    good_for: ["FT_PCT", "points"],
  },
  {
    id: 12,
    from_id: 1,
    name: "Catch-and-Shoot Drill",
    description:
      "Drill to improve shooting accuracy and quick release off a pass.",
    steps: [
      "1. Have a partner pass the ball to you at a key shooting spot (e.g., wing).",
      "2. Catch the ball in triple-threat position and shoot immediately.",
      "3. Focus on quick feet and a smooth transition to the shot.",
    ],
    // Focus: Overall Field Goal Percentage, which includes 2PT/3PT
    good_for: ["FG_PCT", "_2PTS_PCT", "_3PTS_PCT"],
  },
  {
    id: 13,
    from_id: 1,
    name: "Shooting Off the Dribble Drill",
    description:
      "Drill to improve shooting accuracy after creating separation.",
    steps: [
      "1. Take one or two dribbles towards the basket.",
      "2. Execute a jump stop and pull up for a jump shot (mid-range or 3PT).",
      "3. Focus on a smooth transition from dribble to shot.",
    ],
    // Focus: Improving scoring efficiency from various distances
    good_for: ["FG_PCT", "points", "assists"],
  },
];

export default drills_list;
