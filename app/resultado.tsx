import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ResultadosScreen() {
  const router = useRouter();
  const { acertos = 7, total = 10 } = useLocalSearchParams();

  const porcentagem = (acertos / total) * 100;
  const sucesso = porcentagem >= 60;

  return (
    <View className="flex-1 bg-background-light px-6 py-10 items-center">
      {/* Header */}
      <View className="flex-row justify-between items-center w-full mb-10">
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="arrow-back-outline" size={26} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-light">Resultado</Text>
        <View className="w-6" />
      </View>

      {/* Ícone principal */}
      <View className="items-center mb-6">
        <Ionicons
          name={sucesso ? "trophy-outline" : "sad-outline"}
          size={80}
          color={sucesso ? "#10b981" : "#ef4444"}
        />
        <Text
          className={`text-2xl font-bold mt-4 ${
            sucesso ? "text-success" : "text-red-500"
          }`}
        >
          {sucesso ? "Parabéns!" : "Continue tentando!"}
        </Text>
        <Text className="text-text-light text-base mt-2">
          Você acertou {acertos} de {total} perguntas
        </Text>
      </View>

      {/* Barra de progresso */}
      <View className="w-full bg-subtle-light h-4 rounded-full overflow-hidden mb-8">
        <View
          className={`h-4 rounded-full ${
            sucesso ? "bg-success" : "bg-red-500"
          }`}
          style={{ width: `${porcentagem}%` }}
        />
      </View>

      {/* Mensagem de feedback */}
      <View className="bg-white rounded-2xl p-6 border border-subtle-light mb-10">
        <Text className="text-text-light text-center text-base leading-6">
          {sucesso
            ? "Excelente desempenho! Continue assim e conquiste mais vitórias."
            : "Não desanime! Revise o conteúdo e tente novamente para melhorar sua pontuação."}
        </Text>
      </View>

      {/* Botões */}
      <View className="w-full">
        <TouchableOpacity
          className="bg-primary py-4 rounded-2xl shadow-md shadow-primary/30 mb-4"
          onPress={() => router.push("/perguntas")}
          activeOpacity={0.9}
        >
          <Text className="text-white text-center text-lg font-bold">
            Refazer Quiz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-primary py-4 rounded-2xl"
          onPress={() => router.push("/home")}
          activeOpacity={0.8}
        >
          <Text className="text-primary text-center text-lg font-semibold">
            Voltar à Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
