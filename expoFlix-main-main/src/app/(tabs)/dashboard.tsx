import { MovieCard } from "@/components/movieCard";
import { StatusBar } from "expo-status-bar";
import { getPopularMovies, Movies } from "@/services/movie";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie.type";


export default function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiMovies = await getPopularMovies();
      setMovies(apiMovies);
    } catch (err) {
      console.error("Erro ao buscar filmes da API:", err);
      setMovies(Movies); // Fallback para dados estáticos
      setError("Usando dados em cache. Verifique sua conexão e chave de API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Filmes</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#86A16C" />
          <Text style={styles.loadingText}>Carregando filmes...</Text>
        </View>
        <StatusBar style="auto" hidden />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filmes</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard item={item} />}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19244B",
    padding: 8,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "#F5482F",
    fontSize: 14,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
