// this view shows regimens assigned to a specific athlete
// requires ID of athlete

// lists regimens assigned to athlete with that ID.
// assigned, missing, done collapsible flash-list

// regimen will be showed as list items [NAME] [DUE DATE] inside each regimen list item
/*
import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const RegimensList = ({ regimens, athleteId }) => {
  const [collapsed, setCollapsed] = useState({
    assigned: true,
    missing: true,
    done: true,
  });

  const toggleCollapse = (status) => {
    setCollapsed((prevCollapsed) => ({
      ...prevCollapsed,
      [status]: !prevCollapsed[status],
    }));
  };

  const renderItem = ({ item }) => {
    const {
      name,
      duration,
      due_date,
      assigned_athletes,
      focus,
      drills,
      status,
    } = item;

    const renderDrills = () => (
      <View style={{ padding: 10 }}>
        <Text>Drills:</Text>
        <FlatList
          data={drills}
          renderItem={({ item: drill }) => (
            <View style={{ padding: 10 }}>
              <Text>{drill.name}</Text>
              <Text>Status: {drill.status}</Text>
            </View>
          )}
          keyExtractor={(drill) => drill.id.toString()}
        />
      </View>
    );

    return (
      <TouchableOpacity onPress={() => toggleCollapse(status)}>
        <View style={{ padding: 10 }}>
          <Text>{name}</Text>
          {collapsed[status] && (
            <>
              <Text>Duration: {duration}</Text>
              <Text>Due Date: {due_date}</Text>
              <Text>Assigned Athletes: {assigned_athletes.join(", ")}</Text>
              <Text>Focus: {focus.join(", ")}</Text>
              {status === "assigned" && renderDrills()}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleCollapse("assigned")}>
        <Text>
          Assigned ({regimens.filter((r) => r.status === "assigned").length})
        </Text>
      </TouchableOpacity>
      <FlashList
        data={regimens.filter((r) => r.status === "assigned")}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <TouchableOpacity onPress={() => toggleCollapse("missing")}>
        <Text>
          Missing ({regimens.filter((r) => r.status === "missing").length})
        </Text>
      </TouchableOpacity>
      <FlashList
        data={regimens.filter((r) => r.status === "missing")}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <TouchableOpacity onPress={() => toggleCollapse("done")}>
        <Text>Done ({regimens.filter((r) => r.status === "done").length})</Text>
      </TouchableOpacity>
      <FlashList
        data={regimens.filter((r) => r.status === "done")}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default RegimensList;
*/
