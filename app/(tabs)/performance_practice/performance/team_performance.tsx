// app/performance_practice/performance/team_performance.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import game_record_data from "./game_records"; // Import the game records data

// Define a type for aggregated team stats
interface TeamStats {
  gameIds: any;
  gamesPlayed: number;
  totalPoints: number;
  totalMadeFG: number;
  totalAttemptFG: number;
  totalMade2PTS: number;
  totalAttempt2PTS: number;
  totalMade3PTS: number;
  totalAttempt3PTS: number;
  totalMadeFT: number;
  totalAttemptFT: number;
  totalOffRebound: number;
  totalDefRebound: number;
  totalAssists: number;
  totalSteals: number;
  totalBlocks: number;
  totalTurnovers: number;
  totalFouls: number;
}

export default function TeamPerformance() {
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);

  useEffect(() => {
    if (game_record_data.length === 0) {
      setTeamStats(null);
      return;
    }

    const aggregatedStats: TeamStats = game_record_data.reduce(
      (
        acc: {
          gameIds: { has: (arg0: any) => any; add: (arg0: any) => void };
          gamesPlayed: number;
          totalPoints: any;
          totalMadeFG: any;
          totalAttemptFG: any;
          totalMade2PTS: any;
          totalAttempt2PTS: any;
          totalMade3PTS: any;
          totalAttempt3PTS: any;
          totalMadeFT: any;
          totalAttemptFT: any;
          totalOffRebound: any;
          totalDefRebound: any;
          totalAssists: any;
          totalSteals: any;
          totalBlocks: any;
          totalTurnovers: any;
          totalFouls: any;
        },
        record: {
          game_id: any;
          points: any;
          madeFG: any;
          attemptFG: any;
          made2PTS: any;
          attempt2PTS: any;
          made3PTS: any;
          attempt3PTS: any;
          madeFT: any;
          attemptFT: any;
          offRebound: any;
          defRebound: any;
          assists: any;
          steals: any;
          blocks: any;
          turnovers: any;
          fouls: any;
        }
      ) => {
        // Track unique game IDs to count total games played
        if (!acc.gameIds.has(record.game_id)) {
          acc.gameIds.add(record.game_id);
        }

        acc.totalPoints += record.points;
        acc.totalMadeFG += record.madeFG;
        acc.totalAttemptFG += record.attemptFG;
        acc.totalMade2PTS += record.made2PTS;
        acc.totalAttempt2PTS += record.attempt2PTS;
        acc.totalMade3PTS += record.made3PTS;
        acc.totalAttempt3PTS += record.attempt3PTS;
        acc.totalMadeFT += record.madeFT;
        acc.totalAttemptFT += record.attemptFT;
        acc.totalOffRebound += record.offRebound;
        acc.totalDefRebound += record.defRebound;
        acc.totalAssists += record.assists;
        acc.totalSteals += record.steals;
        acc.totalBlocks += record.blocks;
        acc.totalTurnovers += record.turnovers;
        acc.totalFouls += record.fouls;

        return acc;
      },
      {
        gameIds: new Set<number>(), // Use a Set to count unique games
        totalPoints: 0,
        totalMadeFG: 0,
        totalAttemptFG: 0,
        totalMade2PTS: 0,
        totalAttempt2PTS: 0,
        totalMade3PTS: 0,
        totalAttempt3PTS: 0,
        totalMadeFT: 0,
        totalAttemptFT: 0,
        totalOffRebound: 0,
        totalDefRebound: 0,
        totalAssists: 0,
        totalSteals: 0,
        totalBlocks: 0,
        totalTurnovers: 0,
        totalFouls: 0,
      } as TeamStats & { gameIds: Set<number> } // Cast for initial accumulator type
    );

    setTeamStats({
      ...aggregatedStats,
      gamesPlayed: aggregatedStats.gameIds.size, // Get the count of unique games
    });
  }, []);

  const calculatePercentage = (made: number, attempt: number) => {
    return attempt > 0 ? ((made / attempt) * 100).toFixed(1) : "0.0";
  };

  if (!teamStats) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          No game records available for team performance.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Team Performance Summary</Text>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Games Played:</Text>
          <Text style={styles.statValue}>{teamStats.gamesPlayed}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Points:</Text>
          <Text style={styles.statValue}>{teamStats.totalPoints}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Rebounds:</Text>
          <Text style={styles.statValue}>
            {teamStats.totalOffRebound + teamStats.totalDefRebound}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Assists:</Text>
          <Text style={styles.statValue}>{teamStats.totalAssists}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Steals:</Text>
          <Text style={styles.statValue}>{teamStats.totalSteals}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Blocks:</Text>
          <Text style={styles.statValue}>{teamStats.totalBlocks}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Turnovers:</Text>
          <Text style={styles.statValue}>{teamStats.totalTurnovers}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Fouls:</Text>
          <Text style={styles.statValue}>{teamStats.totalFouls}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Shooting Percentages</Text>
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Field Goal %:</Text>
          <Text style={styles.statValue}>
            {calculatePercentage(
              teamStats.totalMadeFG,
              teamStats.totalAttemptFG
            )}
            %
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>2-Point %:</Text>
          <Text style={styles.statValue}>
            {calculatePercentage(
              teamStats.totalMade2PTS,
              teamStats.totalAttempt2PTS
            )}
            %
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>3-Point %:</Text>
          <Text style={styles.statValue}>
            {calculatePercentage(
              teamStats.totalMade3PTS,
              teamStats.totalAttempt3PTS
            )}
            %
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Free Throw %:</Text>
          <Text style={styles.statValue}>
            {calculatePercentage(
              teamStats.totalMadeFT,
              teamStats.totalAttemptFT
            )}
            %
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
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
    marginBottom: 15,
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
    flex: 2, // Take more space for label
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Less space for value
    textAlign: "right", // Align value to the right
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
});
