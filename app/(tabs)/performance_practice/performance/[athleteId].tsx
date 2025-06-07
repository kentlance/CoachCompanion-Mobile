// app/performance_practice/performance/athlete_overall_view.tsx
import { useLocalSearchParams } from "expo-router"; // To get route params
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import athlete_list from "./athlete_list";
import game_record_data from "./game_records"; // Renamed to avoid conflict
import { Athlete, GameRecord } from "./interfaces"; // Import interfaces

export default function AthleteOverallView() {
  const { athleteId } = useLocalSearchParams(); // Get athleteId from route params

  const [athlete, setAthlete] = useState<Athlete | undefined>(undefined);
  const [athleteGameRecords, setAthleteGameRecords] = useState<GameRecord[]>(
    []
  );

  useEffect(() => {
    if (athleteId) {
      // Find the athlete by ID
      const foundAthlete = athlete_list.find(
        (a) => a.id === parseInt(athleteId as string)
      );
      setAthlete(foundAthlete);

      // Filter game records for this athlete
      const records = game_record_data.filter(
        (record) => record.player_id === parseInt(athleteId as string)
      );
      setAthleteGameRecords(records);
    }
  }, [athleteId]);

  if (!athlete) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Athlete not found.</Text>
      </View>
    );
  }

  // Calculate overall performance metrics
  const totalStats = athleteGameRecords.reduce((acc, record) => {
    acc.gamesPlayed = (acc.gamesPlayed || 0) + 1;
    acc.madeFG = (acc.madeFG || 0) + record.madeFG;
    acc.attemptFG = (acc.attemptFG || 0) + record.attemptFG;
    acc.made2PTS = (acc.made2PTS || 0) + record.made2PTS;
    acc.attempt2PTS = (acc.attempt2PTS || 0) + record.attempt2PTS;
    acc.made3PTS = (acc.made3PTS || 0) + record.made3PTS;
    acc.attempt3PTS = (acc.attempt3PTS || 0) + record.attempt3PTS;
    acc.madeFT = (acc.madeFT || 0) + record.madeFT;
    acc.attemptFT = (acc.attemptFT || 0) + record.attemptFT;
    acc.offRebound = (acc.offRebound || 0) + record.offRebound;
    acc.defRebound = (acc.defRebound || 0) + record.defRebound;
    acc.assists = (acc.assists || 0) + record.assists;
    acc.steals = (acc.steals || 0) + record.steals;
    acc.blocks = (acc.blocks || 0) + record.blocks;
    acc.turnovers = (acc.turnovers || 0) + record.turnovers;
    acc.fouls = (acc.fouls || 0) + record.fouls;
    acc.points = (acc.points || 0) + record.points;
    return acc;
  }, {} as Partial<GameRecord> & { gamesPlayed: number }); // Use Partial<GameRecord> for accumulating, add gamesPlayed

  const calculatePercentage = (made: number, attempt: number) => {
    return attempt > 0 ? ((made / attempt) * 100).toFixed(1) : "0.0";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.athleteName}>
        {athlete.name} (#{athlete.number})
      </Text>
      <Text style={styles.sectionTitle}>Overall Performance</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Games Played:</Text>
          <Text style={styles.statValue}>{totalStats.gamesPlayed || 0}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Points:</Text>
          <Text style={styles.statValue}>{totalStats.points || 0}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>FG %:</Text>
          <Text style={styles.statValue}>
            {calculatePercentage(
              totalStats.madeFG || 0,
              totalStats.attemptFG || 0
            )}
            %
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>3PT %:</Text>
          <Text style={styles.statValue}>
            {calculatePercentage(
              totalStats.made3PTS || 0,
              totalStats.attempt3PTS || 0
            )}
            %
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>FT %:</Text>
          <Text style={styles.statValue}>
            {calculatePercentage(
              totalStats.madeFT || 0,
              totalStats.attemptFT || 0
            )}
            %
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Rebounds:</Text>
          <Text style={styles.statValue}>
            {(totalStats.offRebound || 0) + (totalStats.defRebound || 0)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Assists:</Text>
          <Text style={styles.statValue}>{totalStats.assists || 0}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Steals:</Text>
          <Text style={styles.statValue}>{totalStats.steals || 0}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Blocks:</Text>
          <Text style={styles.statValue}>{totalStats.blocks || 0}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Turnovers:</Text>
          <Text style={styles.statValue}>{totalStats.turnovers || 0}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Fouls:</Text>
          <Text style={styles.statValue}>{totalStats.fouls || 0}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Game by Game Records</Text>
      {athleteGameRecords.length > 0 ? (
        <FlatList
          data={athleteGameRecords}
          keyExtractor={(item: { id: { toString: () => any } }) =>
            item.id.toString()
          }
          renderItem={({ item: record }: { item: GameRecord }) => (
            <View style={styles.gameRecordCard}>
              <Text style={styles.gameHeader}>Game {record.game_id}</Text>
              <View style={styles.gameStatsRow}>
                <Text style={styles.gameStat}>PTS: {record.points}</Text>
                <Text style={styles.gameStat}>
                  FG: {record.madeFG}/{record.attemptFG}
                </Text>
                <Text style={styles.gameStat}>
                  3PT: {record.made3PTS}/{record.attempt3PTS}
                </Text>
                <Text style={styles.gameStat}>
                  FT: {record.madeFT}/{record.attemptFT}
                </Text>
              </View>
              <View style={styles.gameStatsRow}>
                <Text style={styles.gameStat}>
                  REB: {record.offRebound + record.defRebound}
                </Text>
                <Text style={styles.gameStat}>AST: {record.assists}</Text>
                <Text style={styles.gameStat}>STL: {record.steals}</Text>
                <Text style={styles.gameStat}>BLK: {record.blocks}</Text>
              </View>
              <View style={styles.gameStatsRow}>
                <Text style={styles.gameStat}>TO: {record.turnovers}</Text>
                <Text style={styles.gameStat}>PF: {record.fouls}</Text>
              </View>
            </View>
          )}
          // Set to false for FlatList inside ScrollView
          // Or maybe consider using SectionList if you have many games or virtualized lists - need to review
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noRecordsText}>
          No game records found for this athlete.
        </Text>
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  athleteName: {
    fontSize: 28,
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  statItem: {
    width: "48%", // Two items per row
    marginBottom: 10,
    padding: 5,
    flexDirection: "row", // For label and value on same line
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  gameRecordCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  gameHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#EC1D25",
  },
  gameStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  gameStat: {
    fontSize: 13,
    color: "#444",
    width: "45%",
    marginBottom: 5,
  },
  noRecordsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
