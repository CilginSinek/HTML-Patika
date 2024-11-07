import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import List from "@/components/toDo/List";
import InputArea from "@/components/toDo/InputArea";
import { useEffect, useState } from "react";
import { Text, View, VirtualizedList } from "react-native";
import type ToDoItem from "@/constants/Type";

export default function Index() {
  const [list, setList] = useState<ToDoItem[]>([]);

  const addTask = (task: string) => {
    setList([...list, { id: Math.random(), task, checked: false }]);
  };

  const checkTask = (id: number) => {
    setList(
      list.map((e: ToDoItem) => {
        if (e.id === id) {
          e.checked = !e.checked;
        }
        return e;
      })
    );
  };

  const deleteTask = (id: number) => {
    setList(list.filter((e: ToDoItem) => e.id !== id));
  };

  return (
    <ThemedView style={{display:"flex"}}>
      <View>
        <ThemedText style={{ display:"flex", justifyContent:"flex-end"}}>
          Yapilacak Isler{" "}
          {list.filter((e: ToDoItem) => e.checked !== true).length}
        </ThemedText>
      </View>
      <List ToDoItems={list} changeTask={checkTask} deleteTask={deleteTask} />
      <InputArea addTask={addTask} />
    </ThemedView>
  );
}
