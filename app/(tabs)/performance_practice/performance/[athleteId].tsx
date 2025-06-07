// app/performance_practice/performance/[athleteId].tsx
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";

import athlete_list from "./athlete_list";
import game_record_data from "./game_records";
import { Athlete, GameRecord } from "./interfaces";

const screenWidth = Dimensions.get("window").width;
const CHART_GAMES_LIMIT = 5; // Game limit on charts

export default function AthleteDetailScreen() {
  const { athleteId } = useLocalSearchParams();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [athleteGameRecords, setAthleteGameRecords] = useState<GameRecord[]>(
    []
  );

  useEffect(() => {
    if (athleteId) {
      const id = parseInt(athleteId as string);
      const foundAthlete = athlete_list.find((a) => a.id === id);
      setAthlete(foundAthlete || null);

      const records = game_record_data.filter(
        (record) => record.player_id === id
      );
      // Sort by most recent game (descending game_id) first, then slice
      setAthleteGameRecords(records.sort((a, b) => b.game_id - a.game_id));
    }
  }, [athleteId]);

  // Helper to get chart data for a specific stat
  const getStatLineChartData = (statKey: keyof GameRecord, title: string) => {
    const recordsToChart = athleteGameRecords
      .slice(0, CHART_GAMES_LIMIT)
      .reverse();

    // Generate labels: "Game 1", "Game 2", etc. based on their order in the *sliced and reversed* array
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

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{ headerTitle: `${athlete.name}'s Performance` }}
      />

      <Text style={styles.playerName}>
        {athlete.name} (#{athlete.number})
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

          {/* --- Individual Stat Line Charts --- */}
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
        </>
      )}
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
});
