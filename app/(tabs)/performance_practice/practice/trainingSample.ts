type StatKey = string;

type TrainingSample = {
  features: { [key in StatKey]: number }; // normalized attention scores -ranged from 0 to 1 nearest to 1 means more attention is needed
  labels: number[]; // drill IDs that worked well
};

const trainingSamples: TrainingSample[] = [
  {
    features: {
      FG_PCT: 0.9,
      _3PTS_PCT: 0.85,
      points: 0.8,
      turnovers: 0.2,
      assists: 0.3,
      REB: 0.4,
      steals: 0.1,
      blocks: 0.1,
      FT_PCT: 0.7,
      _2PTS_PCT: 0.6,
    },
    labels: [1, 11, 13], // Shooting-focused drills
  },
  {
    features: {
      turnovers: 0.9,
      assists: 0.6,
      FG_PCT: 0.3,
      points: 0.4,
      REB: 0.2,
      steals: 0.1,
      blocks: 0.1,
      FT_PCT: 0.5,
      _2PTS_PCT: 0.4,
      _3PTS_PCT: 0.3,
    },
    labels: [2, 3, 5], // Ball control and passing drills
  },
  {
    features: {
      steals: 0.85,
      blocks: 0.8,
      REB: 0.6,
      turnovers: 0.3,
      FG_PCT: 0.2,
      points: 0.2,
      assists: 0.3,
      FT_PCT: 0.4,
      _2PTS_PCT: 0.3,
      _3PTS_PCT: 0.2,
    },
    labels: [8, 9, 10], // Defensive agility and rebounding drills
  },
  {
    features: {
      assists: 0.9,
      turnovers: 0.7,
      FG_PCT: 0.6,
      points: 0.5,
      REB: 0.3,
      steals: 0.2,
      blocks: 0.2,
      FT_PCT: 0.4,
      _2PTS_PCT: 0.5,
      _3PTS_PCT: 0.4,
    },
    labels: [5, 6, 7], // Passing and movement drills
  },
];

export default trainingSamples;
