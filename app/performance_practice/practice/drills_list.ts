// practices.ts
var drills_list = [
  {
    id: 1,
    from_id: 1,
    name: "Three Point Shooting",
    description: "Drill to improve three point shooting.",
    steps: [
      "1. Start at three point lane.",
      "2. Count succesful shots within one minute.",
    ],
  },
  {
    id: 2,
    from_id: 2,
    name: "Stationary Dribbling Drill",
    description: "Drill to improve ball control and hand-eye coordination.",
    steps: [
      "1. Stand with feet shoulder-width apart.",
      "2. Dribble the ball with one hand, focusing on keeping the head up and staying low.",
      "3. Switch hands and repeat for 30 seconds.",
      "4. Gradually increase speed and difficulty by adding crossovers, behind-the-back dribbles, and between-the-legs dribbles.",
    ],
  },
  {
    id: 3,
    from_id: 2,
    name: "Figure-Eight Drill",
    description: "Drill to improve ball control and hand-eye coordination.",
    steps: [
      "1. Set up cones in a figure-eight pattern.",
      "2. Weave through the cones using different parts of the hand (e.g., fingertips, palms, and wrists).",
      "3. Focus on keeping the head up and staying low.",
      "4. Gradually increase speed and difficulty by adding crossovers, behind-the-back dribbles, and between-the-legs dribbles.",
    ],
  },
  {
    id: 4,
    from_id: 2,
    name: "Cone Drill",
    description: "Drill to improve speed and agility.",
    steps: [
      "1. Set up cones in a straight line.",
      "2. Dribble through the cones using different speeds and moves (e.g., crossovers, behind-the-back dribbles, and between-the-legs dribbles).",
      "3. Focus on keeping the head up and staying low.",
      "4. Gradually increase speed and difficulty by adding more cones or decreasing the space between them.",
    ],
  },
  {
    id: 5,
    from_id: 3,
    name: "Partner Passing Drill",
    description: "Drill to improve passing accuracy and teamwork.",
    steps: [
      "1. Find a partner and stand 10 feet apart.",
      "2. Pass the ball back and forth, focusing on accuracy and speed.",
      "3. Gradually increase distance and difficulty by adding movement and obstacles.",
      "4. Switch roles and repeat for 30 seconds.",
    ],
  },
  {
    id: 6,
    from_id: 3,
    name: "Wall Passing Drill",
    description: "Drill to improve passing accuracy and strength.",
    steps: [
      "1. Stand 5 feet away from a wall.",
      "2. Pass the ball against the wall, focusing on accuracy and power.",
      "3. Gradually increase speed and difficulty by adding movement and obstacles.",
      "4. Switch hands and repeat for 30 seconds.",
    ],
  },
  {
    id: 7,
    from_id: 3,
    name: "Weave Passing Drill",
    description: "Drill to improve passing accuracy and agility.",
    steps: [
      "1. Set up cones in a zig-zag pattern.",
      "2. Weave through the cones while passing the ball to a partner or a wall.",
      "3. Focus on keeping the head up and staying low.",
      "4. Gradually increase speed and difficulty by adding more cones or decreasing the space between them.",
    ],
  },
  {
    id: 8,
    from_id: 4,
    name: "Ladder Drill",
    description: "Drill to improve foot speed and agility.",
    steps: [
      "1. Set up a ladder on the ground.",
      "2. Perform different footwork patterns through the ladder (e.g., high knees, lateral shuffles, and carioca drills).",
      "3. Focus on quick feet and explosive movements.",
      "4. Gradually increase speed and difficulty by adding more complex patterns and decreasing rest time.",
    ],
  },
  {
    id: 9,
    from_id: 4,
    name: "Carioca Drill",
    description: "Drill to improve foot speed and agility.",
    steps: [
      "1. Set up cones in a zig-zag pattern.",
      "2. Weave through the cones while performing carioca drills (e.g., lateral shuffles and crossovers).",
      "3. Focus on quick feet and explosive movements.",
      "4. Gradually increase speed and difficulty by adding more complex patterns and decreasing rest time.",
    ],
  },
  {
    id: 10,
    from_id: 4,
    name: "Box Jump Drill",
    description: "Drill to improve explosiveness and power.",
    steps: [
      "1. Set up a box or bench.",
      "2. Jump up onto the box and immediately jump back down.",
      "3. Repeat for 30 seconds, focusing on quick turnaround and explosive movements.",
      "4. Gradually increase height and difficulty by adding more boxes or increasing the distance between them.",
    ],
  },
  {
    id: 11,
    from_id: 1,
    name: "Free Throw Shooting Drill",
    description: "Drill to improve shooting accuracy and technique.",
    steps: [
      "1. Stand at the free throw line.",
      "2. Shoot 10 free throws, focusing on proper shooting form and follow-through.",
      "3. Take a 30-second break and repeat for 3 sets.",
      "4. Gradually increase difficulty by adding movement and obstacles.",
    ],
  },
  {
    id: 12,
    from_id: 1,
    name: "Catch-and-Shoot Drill",
    description: "Drill to improve shooting accuracy and quick release.",
    steps: [
      "1. Stand 10 feet away from the basket.",
      "2. Have a partner pass you the ball.",
      "3. Catch the ball and immediately shoot, focusing on quick release and proper shooting form.",
      "4. Repeat for 30 seconds, then switch roles and repeat.",
    ],
  },
  {
    id: 13,
    from_id: 1,
    name: "Shooting Off the Dribble Drill",
    description: "Drill to improve shooting accuracy and ball handling.",
    steps: [
      "1. Stand 10 feet away from the basket.",
      "2. Dribble the ball while moving towards the basket.",
      "3. Pull up for a jump shot, focusing on proper shooting form and follow-through.",
      "4. Repeat for 30 seconds, then switch roles and repeat.",
    ],
  },
];

export default drills_list;
