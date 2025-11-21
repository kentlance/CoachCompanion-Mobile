import React from "react";
import { View } from "react-native";
import regimens from "../regimens";
import RegimenCard from "./regimen_card";

const TrainingRegimens = () => {
  // Dummy handlers for placeholder buttons
  const handleEdit = (id: number) => {
    console.log("Edit Regimen:", id);
    // TODO: Implement actual edit logic
  };

  const handleDelete = (id: number, name: string) => {
    console.log("Delete Regimen:", id, name);
    // implement delete logic later
  };

  return (
    <View>
      {regimens.map((item) => (
        <RegimenCard
          key={item.id.toString()}
          item={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </View>
  );
};

export default TrainingRegimens;
