import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default function Layout() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setLoading(false);
        console.log(data);
      });
  }, []);
  if (categories.length === 0 && !loading) {
    return (
      <View>
        <Text>Categories</Text>
        <Text>There are no categories to display.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <ThemedView>
        {loading && <Text>Loading...</Text>}
        <View style={styles.container}>
          {categories.map((category) => (
            <Link
              href={{
                pathname: `/[category]`,
                params: { category: category.strCategory },
              }}
              key={category.idCategory}
              style={styles.link}
            >
              <ThemedText style={styles.text}>
                {category.strCategory}
              </ThemedText>
            </Link>
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  link: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: "#f8f8f8",
  },
});
