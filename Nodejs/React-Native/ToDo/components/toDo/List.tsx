import { FlatList, Text } from "react-native";
import type ToDoType from "../../constants/Type";
import React from "react";

interface ListProps {
  ToDoItems: ToDoType[];
  changeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const List = ({
  ToDoItems,
  changeTask,
  deleteTask,
}: ListProps): JSX.Element => {
  return (
    <FlatList
      data={ToDoItems}
      renderItem={({ item }) => (
        <Text
        style={{backgroundColor: item.checked ? "green" : "red"}}
          onPress={() => {
            changeTask(item.id);
          }}
          onLongPress={() => {
            console.log("aa");
            deleteTask(item.id);
          }}
        >
          {item.task}
        </Text>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
export default List;