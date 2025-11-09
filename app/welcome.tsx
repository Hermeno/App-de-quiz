import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-blue-600 items-center justify-center px-6">
      {/* Logo ou imagem de boas-vindas */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3940/3940056.png" }}
        className="w-32 h-32 mb-6"
        resizeMode="contain"
      />

      {/* Título */}
      <Text className="text-3xl font-bold text-white mb-4 text-center">
        Bem-vindo ao AprovAqui!
      </Text>

      {/* Descrição */}
      <Text className="text-white text-center text-lg mb-8">
        Treine seus conhecimentos, teste suas habilidades e divirta-se com nossos quizzes!
      </Text>

      {/* Botão para iniciar */}
      <TouchableOpacity
        className="bg-white px-8 py-4 rounded-full shadow-lg"
        onPress={() => router.push("/")}
      >
        <Text className="text-blue-600 font-bold text-lg">Começar</Text>
      </TouchableOpacity>
    </View>
  );
}
