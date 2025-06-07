// app/performance_practice/performance/team_performance.tsx
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";

import game_record_data from "./game_records";

const screenWidth = Dimensions.get("window").width;
const CHART_GAMES_LIMIT = 5; // Limit charts to the most recent 5 games

// Define an interface for aggregated team game data
interface TeamGameStats {
  game_id: number;
  totalPoints: number;
  totalRebounds: number;
  totalAssists: number;
  totalSteals: number;
  totalBlocks: number;
  totalTurnovers: number;
  totalFouls: number;
  madeFG: number;
  attemptFG: number;
  made3PTS: number;
  attempt3PTS: number;
  madeFT: number;
  attemptFT: number;
}

export default function TeamPerformanceScreen() {
  const [teamGameStats, setTeamGameStats] = useState<TeamGameStats[]>([]);
  const [overallTeamStats, setOverallTeamStats] = useState({
    totalGames: 0,
    totalPoints: 0,
    totalRebounds: 0,
    totalAssists: 0,
    totalSteals: 0,
    totalBlocks: 0,
    totalTurnovers: 0,
    totalFouls: 0,
    totalMadeFG: 0,
    totalAttemptFG: 0,
    totalMade3PTS: 0,
    totalAttempt3PTS: 0,
    totalMadeFT: 0,
    totalAttemptFT: 0,
  });

  useEffect(() => {
    // Aggregate data by game_id
    const aggregatedGames: { [key: number]: TeamGameStats } = {};

    game_record_data.forEach((record) => {
      if (!aggregatedGames[record.game_id]) {
        aggregatedGames[record.game_id] = {
          game_id: record.game_id,
          totalPoints: 0,
          totalRebounds: 0,
          totalAssists: 0,
          totalSteals: 0,
          totalBlocks: 0,
          totalTurnovers: 0,
          totalFouls: 0,
          madeFG: 0,
          attemptFG: 0,
          made3PTS: 0,
          attempt3PTS: 0,
          madeFT: 0,
          attemptFT: 0,
        };
      }
      const game = aggregatedGames[record.game_id];
      game.totalPoints += record.points;
      game.totalRebounds += record.offRebound + record.defRebound;
      game.totalAssists += record.assists;
      game.totalSteals += record.steals;
      game.totalBlocks += record.blocks;
      game.totalTurnovers += record.turnovers;
      game.totalFouls += record.fouls;
      game.madeFG += record.madeFG;
      game.attemptFG += record.attemptFG;
      game.made3PTS += record.made3PTS;
      game.attempt3PTS += record.attempt3PTS;
      game.madeFT += record.madeFT;
      game.attemptFT += record.attemptFT;
    });

    const sortedTeamGames = Object.values(aggregatedGames).sort(
      (a, b) => b.game_id - a.game_id
    ); // Sort by most recent game
    setTeamGameStats(sortedTeamGames);

    // Calculate overall team stats
    const overallStats = sortedTeamGames.reduce(
      (acc, game) => {
        acc.totalPoints += game.totalPoints;
        acc.totalRebounds += game.totalRebounds;
        acc.totalAssists += game.totalAssists;
        acc.totalSteals += game.totalSteals;
        acc.totalBlocks += game.totalBlocks;
        acc.totalTurnovers += game.totalTurnovers;
        acc.totalFouls += game.totalFouls;
        acc.totalMadeFG += game.madeFG;
        acc.totalAttemptFG += game.attemptFG;
        acc.totalMade3PTS += game.made3PTS;
        acc.totalAttempt3PTS += game.attempt3PTS;
        acc.totalMadeFT += game.madeFT;
        acc.totalAttemptFT += game.attemptFT;
        return acc;
      },
      {
        totalGames: sortedTeamGames.length,
        totalPoints: 0,
        totalRebounds: 0,
        totalAssists: 0,
        totalSteals: 0,
        totalBlocks: 0,
        totalTurnovers: 0,
        totalFouls: 0,
        totalMadeFG: 0,
        totalAttemptFG: 0,
        totalMade3PTS: 0,
        totalAttempt3PTS: 0,
        totalMadeFT: 0,
        totalAttemptFT: 0,
      }
    );
    setOverallTeamStats(overallStats);
  }, []);

  const getTeamStatLineChartData = (
    statKey: keyof TeamGameStats,
    title: string
  ) => {
    // Get the most recent games, then reverse them for chronological display on the chart
    const recordsToChart = teamGameStats.slice(0, CHART_GAMES_LIMIT).reverse();

    const labels = recordsToChart.map((record) => `Game ${record.game_id}`);
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
      title: title,
    };
  };

  const getTeamShootingPercentagesData = () => {
    if (overallTeamStats.totalGames === 0) {
      return {
        labels: ["FG%", "3PT%", "FT%"],
        data: [0, 0, 0],
      };
    }

    const fgPercent =
      overallTeamStats.totalAttemptFG > 0
        ? overallTeamStats.totalMadeFG / overallTeamStats.totalAttemptFG
        : 0;
    const threePtPercent =
      overallTeamStats.totalAttempt3PTS > 0
        ? overallTeamStats.totalMade3PTS / overallTeamStats.totalAttempt3PTS
        : 0;
    const ftPercent =
      overallTeamStats.totalAttemptFT > 0
        ? overallTeamStats.totalMadeFT / overallTeamStats.totalAttemptFT
        : 0;

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

  const calculatePercentage = (made: number, attempt: number) => {
    return attempt > 0 ? ((made / attempt) * 100).toFixed(2) : "0.00";
  };

  const actualGamesCharted = Math.min(teamGameStats.length, CHART_GAMES_LIMIT);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Team Performance" }} />

      <Text style={styles.header}>Overall Team Performance</Text>

      {overallTeamStats.totalGames === 0 ? (
        <Text style={styles.noDataText}>
          No game records available for the team.
        </Text>
      ) : (
        <>
          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>
              Aggregated Team Stats ({overallTeamStats.totalGames} Games)
            </Text>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Points:</Text>
              <Text style={styles.statValue}>
                {overallTeamStats.totalPoints}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Rebounds:</Text>
              <Text style={styles.statValue}>
                {overallTeamStats.totalRebounds}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Assists:</Text>
              <Text style={styles.statValue}>
                {overallTeamStats.totalAssists}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Steals:</Text>
              <Text style={styles.statValue}>
                {overallTeamStats.totalSteals}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Blocks:</Text>
              <Text style={styles.statValue}>
                {overallTeamStats.totalBlocks}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Turnovers:</Text>
              <Text style={styles.statValue}>
                {overallTeamStats.totalTurnovers}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Fouls:</Text>
              <Text style={styles.statValue}>
                {overallTeamStats.totalFouls}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>FG%:</Text>
              <Text style={styles.statValue}>
                {calculatePercentage(
                  overallTeamStats.totalMadeFG,
                  overallTeamStats.totalAttemptFG
                )}
                %
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>3PT%:</Text>
              <Text style={styles.statValue}>
                {calculatePercentage(
                  overallTeamStats.totalMade3PTS,
                  overallTeamStats.totalAttempt3PTS
                )}
                %
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>FT%:</Text>
              <Text style={styles.statValue}>
                {calculatePercentage(
                  overallTeamStats.totalMadeFT,
                  overallTeamStats.totalAttemptFT
                )}
                %
              </Text>
            </View>
          </View>

          {/* Team Stat Line Charts */}
          {actualGamesCharted > 1 && (
            <>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Team Points Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getTeamStatLineChartData("totalPoints", "Team Points")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Team Rebounds Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getTeamStatLineChartData(
                    "totalRebounds",
                    "Team Rebounds"
                  )}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Team Assists Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getTeamStatLineChartData(
                    "totalAssists",
                    "Team Assists"
                  )}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Team Steals Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getTeamStatLineChartData("totalSteals", "Team Steals")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Team Blocks Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getTeamStatLineChartData("totalBlocks", "Team Blocks")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Team Turnovers Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getTeamStatLineChartData(
                    "totalTurnovers",
                    "Team Turnovers"
                  )}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  Team Fouls Per Game (Last {actualGamesCharted})
                </Text>
                <LineChart
                  data={getTeamStatLineChartData("totalFouls", "Team Fouls")}
                  width={screenWidth - 30}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>
            </>
          )}

          {/* Overall Team Shooting Percentages Progress Chart */}
          {overallTeamStats.totalGames > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>
                Overall Team Shooting Efficiency
              </Text>
              <ProgressChart
                data={getTeamShootingPercentagesData()}
                width={screenWidth - 30}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  decimalPlaces: 2, // Ensure 2 decimal places for percentages
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
  header: {
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
