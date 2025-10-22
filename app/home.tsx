import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  // Lista de vídeos de exemplo
  const videos = [
    {
      id: 1,
      title: "Aula de Matemática",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
    },
    {
      id: 2,
      title: "Química Básica",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg",
    },
    {
      id: 3,
      title: "História Moderna",
      thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
    },
  ];

  return (
    <View className="flex-1 bg-background-light px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-bold text-text-light">
          Bem-vindo ao AprovAqui!
        </Text>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Ionicons name="person-circle-outline" size={28} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Sessão de vídeos */}
      <Text className="text-lg font-semibold text-text-light mb-4">
        Vídeos Recentes
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {videos.map((video) => (
          <TouchableOpacity
            key={video.id}
            className="mr-4 w-56 rounded-2xl overflow-hidden shadow-md shadow-primary/20 bg-white"
            onPress={() => console.log("Abrir vídeo", video.id)}
          >
            <Image
              source={{ uri: video.thumbnail }}
              className="w-full h-32"
              resizeMode="cover"
            />
            <View className="p-3">
              <Text className="text-text-light font-semibold">{video.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botão para quiz */}
      <TouchableOpacity
        className="bg-primary py-4 rounded-2xl shadow-md shadow-primary/30 mt-10"
        onPress={() => router.push("/perguntas")}
      >
        <Text className="text-white text-center text-lg font-bold">
          Ir para Quiz
        </Text>
      </TouchableOpacity>
    </View>
  );
}
