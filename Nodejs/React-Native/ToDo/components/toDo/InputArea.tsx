import { useState } from "react";
import { Button, TextInput, View } from "react-native";

const InputArea = ({ addTask }: { addTask: (task: string) => void }) => {
  const [task, setTask] = useState<string>("");

  const onSubmit = () => {
    if(task === "") return;
    addTask(task);
    setTask("");
  };

  return (
    <View>
      <TextInput style={{color:"white"}} onChangeText={setTask} value={task} placeholder="Add a task" />
      <Button title="Add" onPress={onSubmit} />
    </View>
  );
};

export default InputArea;
