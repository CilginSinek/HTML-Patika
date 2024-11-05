import { useState } from "react";
import "./App.css";
import FormList from "./components/FormList";
import InputList from "./components/InputList";
import EditItem from "./components/EditItem";
import FormType from "./types/FormElement";
import PrevForm from "./components/PrevForm";

function App() {
  const [editItem, setEditItem] = useState<any>(null);
  const [formItems, setFormItems] = useState<FormType[]>([]);
  const [see, setSee] = useState<boolean>(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {editItem != null && <EditItem formItem={editItem} />}
      <FormList
        FormObjs={formItems}
        setFormObjs={setFormItems}
        setEditItem={setEditItem}
        setSee={setSee}
      />
      <InputList />
      {see && <PrevForm items={formItems} />}
    </div>
  );
}

export default App;
