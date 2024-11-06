import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  VirtualizedList,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import data from "./json.js";
import { useEffect, useState } from "react";

interface itemType {
  id: number;
  title: string;
  imgURL: string;
  price: string;
  inStock: boolean;
}

interface ItemProps {
  item: itemType;
}

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [Products, setProducts] = useState<itemType[]>(data);

  useEffect(() => {
    const filteredProducts = data.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    setProducts(filteredProducts);
  }, [search]);

  return (
    <SafeAreaProvider style={{overflow:"scroll"}}>
      <SafeAreaView >
        <TextInput
          placeholder="Search"
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={setSearch}
          value={search}
        />
          <VirtualizedList
            initialNumToRender={4}
            renderItem={({ item }: { item: itemType }) => <Item item={item} />}
            keyExtractor={(item) => item.id.toString()}
            getItemCount={(_) => Products.length}
            getItem={(_, index) => Products[index]}
          />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Item = ({ item }: ItemProps) => {
  return (
    <View style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }} >
      <Image
        source={{ uri: item.imgURL }}
        style={{ width: 100, height: 100, resizeMode: "stretch" }}
      />
      <Text>{item.title}</Text>
      <Text>{item.price}</Text>
      {!item.inStock && <Text style={{ color: "red" }}>Out of Stock</Text>}
    </View>
  );
};
