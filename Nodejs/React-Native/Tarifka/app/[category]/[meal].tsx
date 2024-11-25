import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";

interface MeatDetail {
  [key: string]: any;
}

export default function Meat() {
  const { width } = Dimensions.get('window');
  const [meat, setMeat] = useState<MeatDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const { meal } = useLocalSearchParams<{ meal: string }>();
  const [ingrediants, setIngrediants] = useState<any[]>([]);
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal)
      .then((response) => response.json())
      .then((data) => {
        setMeat(data.meals[0]);
        setIngrediants(ingrediantHandler(data.meals[0]));
        setTags(tagHandler(data.meals[0].strTags));
        setLoading(false);
      });
  }, []);

  if (!meat || loading) {
    return (
      <View>
        <Text>There is no meat to display.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: meat.strMeal }} />
        <ThemedText style={styles.text}>
          {meat.strCategory} from {meat.strArea}
        </ThemedText>
        <ThemedText style={styles.text}>{meat.strInstructions}</ThemedText>
        {tags.length > 0 && (
          <ThemedText style={styles.text}>{tags}</ThemedText>
        )}
        {ingrediants.length > 0 && (
          <FlatList
            data={ingrediants}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => (
              <View style={styles.ingredientContainer}>
                <ThemedText style={styles.ingredientText}>{item[0]}</ThemedText>
                <ThemedText style={styles.ingredientText}>{item[1]}</ThemedText>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
        <View style={styles.video}>
          <iframe
            width="100%"
            height={width > 768 ? 500 : 200} 
            src={meat.strYoutube.replace("watch?v=", "embed/")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={styles.iframe}
          ></iframe>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: "#f8f8f8",
    marginVertical: 5,
  },
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 5,
    marginVertical: 5,
  },
  ingredientText: {
    fontSize: 14,
    color: "#f8f8f8",
  },
  listContent: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  video: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  iframe: {
    borderRadius: 5,
  },
});

const ingrediantHandler = (meat: MeatDetail) => {
  let ingrediants = [];
  for (let i = 1; i <= 20; i++) {
    if (meat[`strIngredient${i}`] != "" && meat[`strIngredient${i}`] != null) {
      ingrediants.push([meat[`strIngredient${i}`], meat[`strMeasure${i}`]]);
    }
  }
  return ingrediants;
};

const tagHandler = (tags: string | null) => {
  if (tags === null) {
    return "";
  }
  return tags.split(",").map(tag => `#${tag}`).join(" ");
};
