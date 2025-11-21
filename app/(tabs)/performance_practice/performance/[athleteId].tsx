// app/performance_practice/performance/[athleteId].tsx
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";

// debugging algorithm
import drills_list from "../practice/drills_list";
import {
  buildForest,
  predictForestWeighted,
} from "../practice/randomForestAlgo";
import trainingSamples from "../practice/trainingSample";
// end of debug imports

// debug assignedregimen

import athlete_list from "./athlete_list";
import game_record_data from "./game_records";

import { Athlete, GameRecord } from "./interfaces";
import { analyzePlayerPerformance } from "./utils/performanceUtils";

const screenWidth = Dimensions.get("window").width;
const CHART_GAMES_LIMIT = 5; // Game limit on charts

export default function AthleteDetailScreen() {
  const { athleteId } = useLocalSearchParams();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [athleteGameRecords, setAthleteGameRecords] = useState<GameRecord[]>(
    []
  );
  // State to hold the currently selected game for detailed view
  const [selectedGame, setSelectedGame] = useState<GameRecord | null>(null);
  // state for modal visibility of specific game selection
  const [isGameSelectionModalVisible, setIsGameSelectionModalVisible] =
    useState(false);

  // State to hold the attention score results
  const [attentionPriorities, setAttentionPriorities] = useState<
    { stat: string; score: number }[]
  >([]);
  const [excellenceAreas, setExcellenceAreas] = useState<
    { stat: string; score: number }[]
  >([]);

  // holding drill ID for forest algo - DEBUGGING
  const statKeys = [
    "FG_PCT",
    "_2PTS_PCT",
    "_3PTS_PCT",
    "FT_PCT",
    "REB",
    "assists",
    "steals",
    "blocks",
    "turnovers",
    "points",
  ];
  const STAT_LABELS: { [key: string]: string } = {
    FG_PCT: "FG% Efficiency",
    _2PTS_PCT: "2PT% Efficiency",
    _3PTS_PCT: "3PT% Efficiency",
    FT_PCT: "FT% Efficiency",
    REB: "Rebounding (Total)",
    assists: "Assists",
    steals: "Steals (Defense)",
    blocks: "Blocks (Defense)",
    turnovers: "Turnovers",
    points: "Scoring (Points)",
  };

  const forest = buildForest(trainingSamples, statKeys);
  // Reverse STAT_LABELS to map display labels back to internal stat keys
  const reverseLabels = Object.fromEntries(
    Object.entries(STAT_LABELS).map(([key, label]) => [label, key])
  );

  const attentionScores: { [key: string]: number } = {};
  attentionPriorities.forEach((item) => {
    const statKey = reverseLabels[item.stat];
    if (statKey) {
      attentionScores[statKey] = Math.abs(item.score);
    }
  });

  const predictedDrillIds = predictForestWeighted(
    forest,
    attentionScores,
    drills_list
  );

  useEffect(() => {
    if (athleteId) {
      const id = parseInt(athleteId as string);
      const foundAthlete = athlete_list.find((a) => a.athlete_no === id);
      setAthlete(foundAthlete || null);

      const records = game_record_data.filter(
        (record) => record.player_id === id
      );
      // Sort by most recent game (descending game_id)
      const sortedRecords = records.sort((a, b) => b.game_id - a.game_id);
      setAthleteGameRecords(sortedRecords);

      // Calculate Attention Scores (Uses all data, as the function handles the limit and filtering)
      const { attentionAreas, excellenceAreas } = analyzePlayerPerformance(
        id,
        game_record_data, // Pass all data for league average calculation
        CHART_GAMES_LIMIT // The N games to analyze
      );
      setAttentionPriorities(attentionAreas);
      setExcellenceAreas(excellenceAreas);

      // Set the most recent game as the default selected game
      if (sortedRecords.length > 0) {
        setSelectedGame(sortedRecords[0]);
      } else {
        setSelectedGame(null);
      }
    }
  }, [athleteId]);

  // Helper to get chart data for a specific stat
  const getStatLineChartData = (statKey: keyof GameRecord, title: string) => {
    const recordsToChart = athleteGameRecords
      .slice(0, CHART_GAMES_LIMIT)
      .reverse();

    // Generate labels: "Game 1", "Game 2", etc. based on their order in the array
    const labels = recordsToChart.map((_, index) => `Game ${index + 1}`);
    const data = recordsToChart.map((record) => record[statKey] as number);

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          color: (opacity = 1) => `rgba(236, 29, 37, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      title: title, // Pass title for chart rendering
    };
  };

  const getTotalReboundsPerGameData = () => {
    const recordsToChart = athleteGameRecords
      .slice(0, CHART_GAMES_LIMIT)
      .reverse();

    const labels = recordsToChart.map((_, index) => `Game ${index + 1}`);
    const data = recordsToChart.map(
      (record) => record.offRebound + record.defRebound
    );

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          color: (opacity = 1) => `rgba(236, 29, 37, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      title: "Total Rebounds",
    };
  };

  const getShootingPercentagesData = () => {
    if (athleteGameRecords.length === 0) {
      return {
        labels: ["FG%", "3PT%", "FT%"],
        data: [0, 0, 0],
      };
    }

    const totalMadeFG = athleteGameRecords.reduce(
      (sum, r) => sum + r.madeFG,
      0
    );
    const totalAttemptFG = athleteGameRecords.reduce(
      (sum, r) => sum + r.attemptFG,
      0
    );
    const totalMade3PTS = athleteGameRecords.reduce(
      (sum, r) => sum + r.made3PTS,
      0
    );
    const totalAttempt3PTS = athleteGameRecords.reduce(
      (sum, r) => sum + r.attempt3PTS,
      0
    );
    const totalMadeFT = athleteGameRecords.reduce(
      (sum, r) => sum + r.madeFT,
      0
    );
    const totalAttemptFT = athleteGameRecords.reduce(
      (sum, r) => sum + r.attemptFT,
      0
    );

    const fgPercent = totalAttemptFG > 0 ? totalMadeFG / totalAttemptFG : 0;
    const threePtPercent =
      totalAttempt3PTS > 0 ? totalMade3PTS / totalAttempt3PTS : 0;
    const ftPercent = totalAttemptFT > 0 ? totalMadeFT / totalAttemptFT : 0;

    return {
      labels: ["FG%", "3PT%", "FT%"],
      data: [fgPercent, threePtPercent, ftPercent],
    };
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fefefe",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // Default to 0 decimal places for counting stats
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#EC1D25",
    },
    fillShadowGradientFrom: "#EC1D25",
    fillShadowGradientTo: "#FFFFFF",
    fillShadowGradientFromOpacity: 0.5,
    fillShadowGradientToOpacity: 0.1,
  };
  if (!athlete) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Athlete not found.</Text>
      </View>
    );
  }

  // Calculate aggregated stats for the athletes
  const totalGamesPlayed = athleteGameRecords.length;
  const totalPoints = athleteGameRecords.reduce(
    (sum, record) => sum + record.points,
    0
  );
  const totalRebounds = athleteGameRecords.reduce(
    (sum, record) => sum + record.offRebound + record.defRebound,
    0
  );
  const totalAssists = athleteGameRecords.reduce(
    (sum, record) => sum + record.assists,
    0
  );
  const totalSteals = athleteGameRecords.reduce(
    (sum, record) => sum + record.steals,
    0
  );
  const totalBlocks = athleteGameRecords.reduce(
    (sum, record) => sum + record.blocks,
    0
  );
  const totalTurnovers = athleteGameRecords.reduce(
    (sum, record) => sum + record.turnovers,
    0
  );
  const totalFouls = athleteGameRecords.reduce(
    (sum, record) => sum + record.fouls,
    0
  );

  const calculatePercentage = (made: number, attempt: number) => {
    return attempt > 0 ? ((made / attempt) * 100).toFixed(2) : "0.0";
  };

  const totalMadeFG = athleteGameRecords.reduce((sum, r) => sum + r.madeFG, 0);
  const totalAttemptFG = athleteGameRecords.reduce(
    (sum, r) => sum + r.attemptFG,
    0
  );
  const totalMade3PTS = athleteGameRecords.reduce(
    (sum, r) => sum + r.made3PTS,
    0
  );
  const totalAttempt3PTS = athleteGameRecords.reduce(
    (sum, r) => sum + r.attempt3PTS,
    0
  );
  const totalMadeFT = athleteGameRecords.reduce((sum, r) => sum + r.madeFT, 0);
  const totalAttemptFT = athleteGameRecords.reduce(
    (sum, r) => sum + r.attemptFT,
    0
  );

  // Determine the actual number of games being charted (limit is 5 but can be less if not enough data)
  const actualGamesCharted = Math.min(
    athleteGameRecords.length,
    CHART_GAMES_LIMIT
  );

  // Render function for each game item in the FlatList
  const renderGameItem = ({ item }: { item: GameRecord }) => (
    <TouchableOpacity
      style={styles.gameItem}
      onPress={() => {
        setSelectedGame(item);
        setIsGameSelectionModalVisible(false); // Close modal on selection
      }}
    >
      <Text style={styles.gameItemText}>
        {/* (vs {item.opponent}, {item.game_date}) could be added, check Piad's module */}
        Game {item.game_id}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${athlete.first_name} ${athlete.second_name}'s Performance`,
        }}
      />

      <Text style={styles.playerName}>
        {athlete.first_name} {athlete.second_name} (#{athlete.player_no})
      </Text>

      {totalGamesPlayed === 0 ? (
        <Text style={styles.noDataText}>
          No game records available for this athlete.
        </Text>
      ) : (
        <>
          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>
              Overall Stats ({totalGamesPlayed} Games)
            </Text>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Points:</Text>
              <Text style={styles.statValue}>{totalPoints}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Rebounds:</Text>
              <Text style={styles.statValue}>{totalRebounds}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Assists:</Text>
              <Text style={styles.statValue}>{totalAssists}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Steals:</Text>
              <Text style={styles.statValue}>{totalSteals}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Blocks:</Text>
              <Text style={styles.statValue}>{totalBlocks}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Turnovers:</Text>
              <Text style={styles.statValue}>{totalTurnovers}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Fouls:</Text>
              <Text style={styles.statValue}>{totalFouls}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>FG%:</Text>
              <Text style={styles.statValue}>
                {calculatePercentage(totalMadeFG, totalAttemptFG)}%
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>3PT%:</Text>
              <Text style={styles.statValue}>
                {calculatePercentage(totalMade3PTS, totalAttempt3PTS)}%
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>FT%:</Text>
              <Text style={styles.statValue}>
                {calculatePercentage(totalMadeFT, totalAttemptFT)}%
              </Text>
            </View>
          </View>

          {/*  Stats for Specific Game Section */}
          {totalGamesPlayed > 0 && (
            <View style={styles.statsCard}>
              <Text style={styles.sectionTitle}>Stats for Specific Game</Text>
              <Text style={styles.subTitle}>Currently Viewing:</Text>
              <TouchableOpacity
                style={styles.selectGameButton}
                onPress={() => setIsGameSelectionModalVisible(true)}
              >
                <Text style={styles.selectGameButtonText}>
                  {selectedGame
                    ? // (vs ${selectedGame.opponent}, ${selectedGame.game_date}) could be added
                      `Game ${selectedGame.game_id}`
                    : "Select a Game"}
                </Text>
              </TouchableOpacity>

              {selectedGame ? (
                <View style={styles.specificGameStats}>
                  <Text style={styles.gameDetailHeader}>
                    Game ID: {selectedGame.game_id}
                  </Text>
                  {/* removed for now, could be added later
                  <Text style={styles.gameDetailHeader}>
                    Opponent: {selectedGame.opponent}
                  </Text>
                  <Text style={styles.gameDetailHeader}>
                    Date: {selectedGame.game_date}
                  </Text>
                   */}
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Points:</Text>
                    <Text style={styles.statValue}>{selectedGame.points}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Total Rebounds:</Text>
                    <Text style={styles.statValue}>
                      {selectedGame.offRebound + selectedGame.defRebound}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Assists:</Text>
                    <Text style={styles.statValue}>{selectedGame.assists}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Steals:</Text>
                    <Text style={styles.statValue}>{selectedGame.steals}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Blocks:</Text>
                    <Text style={styles.statValue}>{selectedGame.blocks}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Turnovers:</Text>
                    <Text style={styles.statValue}>
                      {selectedGame.turnovers}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Fouls:</Text>
                    <Text style={styles.statValue}>{selectedGame.fouls}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>FG%:</Text>
                    <Text style={styles.statValue}>
                      {calculatePercentage(
                        selectedGame.madeFG,
                        selectedGame.attemptFG
                      )}
                      %
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>3PT%:</Text>
                    <Text style={styles.statValue}>
                      {calculatePercentage(
                        selectedGame.made3PTS,
                        selectedGame.attempt3PTS
                      )}
                      %
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>FT%:</Text>
                    <Text style={styles.statValue}>
                      {calculatePercentage(
                        selectedGame.madeFT,
                        selectedGame.attemptFT
                      )}
                      %
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.noDataText}>
                  No game selected or available data.
                </Text>
              )}
            </View>
          )}

          {/* Game Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isGameSelectionModalVisible}
            onRequestClose={() => {
              setIsGameSelectionModalVisible(!isGameSelectionModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Select a Game</Text>
                {athleteGameRecords.length > 0 ? (
                  <FlatList
                    data={athleteGameRecords}
                    keyExtractor={(item: GameRecord) => item.game_id.toString()}
                    renderItem={renderGameItem}
                    style={styles.modalList}
                  />
                ) : (
                  <Text style={styles.noDataText}>No games available.</Text>
                )}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>
                    setIsGameSelectionModalVisible(!isGameSelectionModalVisible)
                  }
                >
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Individual Stat Line Charts */}
          {actualGamesCharted > 1 && ( // Need at least 2 data points for a line chart
            <>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Points Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getStatLineChartData("points", "Points")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Total Rebounds Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getTotalReboundsPerGameData()}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Assists Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getStatLineChartData("assists", "Assists")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Steals Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getStatLineChartData("steals", "Steals")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Blocks Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getStatLineChartData("blocks", "Blocks")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Turnovers Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getStatLineChartData("turnovers", "Turnovers")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Fouls Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getStatLineChartData("fouls", "Fouls")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>
            </>
          )}

          {/* Shooting Percentages Progress Chart */}
          {athleteGameRecords.length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Overall Shooting Efficiency</Text>
              <ProgressChart
                data={getShootingPercentagesData()}
                width={screenWidth - 30}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  decimalPlaces: 2, // Override decimal places for percentages
                  color: (opacity = 1) => `rgba(236, 29, 37, ${opacity})`,
                }}
                hideLegend={false}
                style={styles.chartStyle}
              />
            </View>
          )}

          {/* Excelling at... */}
          <View style={[styles.statsCard, styles.excellenceCard]}>
            <Text style={[styles.sectionTitle, { color: "#387B45" }]}>
              ⭐ Current Strengths
            </Text>
            <Text style={[styles.sectionText]}>
              This was generated from the last {actualGamesCharted} games.
            </Text>
            {excellenceAreas.length > 0 ? (
              excellenceAreas.map((item, index) => (
                <View key={index} style={styles.priorityItem}>
                  <Text style={styles.priorityText}>
                    {index + 1}.{" "}
                    <Text style={styles.excellenceCardText}>{item.stat}</Text>
                  </Text>
                  <Text style={{ color: "#387B45", fontWeight: "bold" }}>
                    +{item.score.toFixed(2)} *
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>
                No stand-out strengths found in this period (performing close to
                the average). Check again after a few games!
              </Text>
            )}
            <Text>
              *Based on standardized comparison to team averages (z-score) over
              last {actualGamesCharted} games
            </Text>
          </View>

          {/* Priority List / Needs Attention */}
          <View style={[styles.statsCard, styles.attentionCard]}>
            <Text style={[styles.sectionTitle, { color: "#EC1D25" }]}>
              🚨 Needs Attention
            </Text>
            <Text style={[styles.sectionText]}>
              This was generated from the last {actualGamesCharted} games.
            </Text>
            {attentionPriorities.length > 0 ? (
              attentionPriorities.map((item, index) => (
                <View key={index} style={styles.priorityItem}>
                  <Text style={styles.priorityText}>
                    {index + 1}.{" "}
                    <Text style={styles.priorityStat}>{item.stat}</Text>
                  </Text>
                  <Text>{item.score.toFixed(2)} *</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>
                No significant areas needing attention found (performing at or
                above the average). 🎉
              </Text>
            )}
            <Text>
              *Based on standardized comparison to team averages (z-score) over
              last {actualGamesCharted} games
            </Text>
          </View>

          {/* Drill Recommendations - debugging purposes */}

          {attentionPriorities.length > 0 ? (
            <>
              <View style={{ marginTop: 10, paddingBottom: 50 }}>
                <Text style={{ fontWeight: "bold", color: "#555" }}>
                  Predicted Drill IDs (debug):
                </Text>
                <Text>{predictedDrillIds.join(", ")}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.noDataText}>
              No significant areas needing attention found (performing at or
              above the average). 🎉
            </Text>
          )}
        </>
      )}
      {/* 
      <Pressable>My Assigned Regimens</Pressable>
      <AthleteTrainingRegimens athleteId={parseInt(athleteId as string)} />
      */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  playerName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  sectionText: {
    fontSize: 16,
  },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
    flex: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },

  subTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: "#777",
  },
  selectGameButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  selectGameButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  specificGameStats: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  gameDetailHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)", // Darken backgoround
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalList: {
    width: "100%",
    marginBottom: 15,
  },
  gameItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
  },
  gameItemText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
  },
  buttonClose: {
    backgroundColor: "#EC1D25",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  attentionCard: {
    borderColor: "#EC1D25",
    borderWidth: 2,
    padding: 15,
    marginTop: 15,
    marginBottom: 30,
  },
  excellenceCard: {
    borderColor: "#387B45",
    borderWidth: 2,
    padding: 15,
    marginTop: 15,
    marginBottom: 30,
  },
  excellenceCardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#387B45",
  },
  priorityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  priorityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  priorityStat: {
    color: "#EC1D25",
    fontWeight: "700",
  },
});
