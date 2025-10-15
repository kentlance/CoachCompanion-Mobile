type StatKey = string;

type TrainingSample = {
  features: { [key in StatKey]: number }; // normalized attention scores
  labels: number[]; // drill IDs that worked well
};

type TreeNode = {
  feature?: StatKey;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  prediction?: number[]; // predicted drill IDs
};

function splitData(
  data: TrainingSample[],
  feature: StatKey,
  threshold: number
): { left: TrainingSample[]; right: TrainingSample[] } {
  const left = data.filter((d) => d.features[feature] <= threshold);
  const right = data.filter((d) => d.features[feature] > threshold);
  return { left, right };
}

function giniImpurity(samples: TrainingSample[]): number {
  const labelCounts: { [id: number]: number } = {};
  samples.forEach((s) => {
    s.labels.forEach((id) => {
      labelCounts[id] = (labelCounts[id] || 0) + 1;
    });
  });

  const total = samples.length;
  let impurity = 1;
  for (const count of Object.values(labelCounts)) {
    const prob = count / total;
    impurity -= prob * prob;
  }
  return impurity;
}

function findBestSplit(
  samples: TrainingSample[],
  features: StatKey[]
): {
  feature: StatKey;
  threshold: number;
  score: number;
} | null {
  let bestScore = Infinity;
  let bestFeature: StatKey | null = null;
  let bestThreshold = 0;

  for (const feature of features) {
    const thresholds = samples.map((s) => s.features[feature]);
    for (const t of thresholds) {
      const { left, right } = splitData(samples, feature, t);
      const score =
        (left.length / samples.length) * giniImpurity(left) +
        (right.length / samples.length) * giniImpurity(right);
      if (score < bestScore) {
        bestScore = score;
        bestFeature = feature;
        bestThreshold = t;
      }
    }
  }

  return bestFeature
    ? { feature: bestFeature, threshold: bestThreshold, score: bestScore }
    : null;
}

function buildTree(
  samples: TrainingSample[],
  features: StatKey[],
  depth: number = 0,
  maxDepth: number = 5
): TreeNode {
  if (depth >= maxDepth || samples.length <= 1) {
    const labelCounts: { [id: number]: number } = {};
    samples.forEach((s) => {
      s.labels.forEach((id) => {
        labelCounts[id] = (labelCounts[id] || 0) + 1;
      });
    });
    const sorted = Object.entries(labelCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => parseInt(id));
    return { prediction: sorted };
  }

  const split = findBestSplit(samples, features);
  if (!split) return buildTree(samples, features, maxDepth, maxDepth);

  const { left, right } = splitData(samples, split.feature, split.threshold);
  return {
    feature: split.feature,
    threshold: split.threshold,
    left: buildTree(left, features, depth + 1, maxDepth),
    right: buildTree(right, features, depth + 1, maxDepth),
  };
}
function predictTree(
  tree: TreeNode,
  input: { [key in StatKey]: number }
): number[] {
  if (tree.prediction) return tree.prediction;
  if (!tree.feature || tree.threshold === undefined) return [];

  const value = input[tree.feature] || 0;
  return value <= tree.threshold
    ? predictTree(tree.left!, input)
    : predictTree(tree.right!, input);
}

function buildForest(
  samples: TrainingSample[],
  features: StatKey[],
  numTrees = 10
): TreeNode[] {
  const forest: TreeNode[] = [];
  for (let i = 0; i < numTrees; i++) {
    const subset = samples
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(samples.length * 0.7));
    forest.push(buildTree(subset, features));
  }
  return forest;
}

function predictForest(
  forest: TreeNode[],
  input: { [key in StatKey]: number }
): number[] {
  const votes: { [id: number]: number } = {};
  forest.forEach((tree) => {
    predictTree(tree, input).forEach((id) => {
      votes[id] = (votes[id] || 0) + 1;
    });
  });

  return Object.entries(votes)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => parseInt(id));
}
