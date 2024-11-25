import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Meat {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function Meats() {
  const [meats, setMeats] = useState<Meat[]>([]);
  const [loading, setLoading] = useState(false);

  const { category } = useLocalSearchParams<{ category: string }>();

  useEffect(() => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category)
      .then((response) => response.json())
      .then((data) => {
        setMeats(data.meals);
        setLoading(false);
      });
  }, []);

  if (meats === null && !loading) {
    return (
      <View>
        <Text>There are no meats to display.</Text>
      </View>
    );
  }

  return (
    <ThemedView>
      <Stack.Screen options={{ title: category }} />
      {loading && <Text>Loading...</Text>}
      <View style={styles.container}>
        {meats.map((meat) => (
          <Link
            href={{
              pathname: "/[category]/[meal]",
              params: { category: category, meal: meat.idMeal }
            }}
            key={meat.idMeal}
            style={styles.link}
          >
            <ThemedText style={styles.text}>
              {meat.strMeal}
            </ThemedText>
          </Link>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  link: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#f8f8f8',
  },
});