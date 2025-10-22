import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PerfilScreen() {
  const router = useRouter();

  // Dados de exemplo — depois você pode puxar do banco (SQLite, AsyncStorage, API, etc.)
  const user = {
    nome: "Hermínio Macamo",
    email: "herminio@email.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  return (
    <View className="flex-1 bg-background-light px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={26} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-light">Perfil</Text>
        <View className="w-6" /> {/* Espaçamento para centralizar o título */}
      </View>

      {/* Avatar */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: user.avatar }}
          className="w-28 h-28 rounded-full mb-4 border-4 border-primary/30"
        />
        <Text className="text-2xl font-bold text-text-light">{user.nome}</Text>
        <Text className="text-base text-text-light opacity-70">{user.email}</Text>
      </View>

      {/* Botões de ação */}
      <View className="mt-10 space-y-4">
        <TouchableOpacity
          className="flex-row items-center bg-white border border-subtle-light rounded-2xl py-4 px-5 active:bg-primary/10"
          onPress={() => router.push("/editarPerfil")}
        >
          <Ionicons name="create-outline" size={22} color="#1f2937" />
          <Text className="ml-3 text-text-light text-base font-medium">Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center bg-white border border-subtle-light rounded-2xl py-4 px-5 active:bg-primary/10"
          onPress={() => router.push("/configuracoes")}
        >
          <Ionicons name="settings-outline" size={22} color="#1f2937" />
          <Text className="ml-3 text-text-light text-base font-medium">Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center bg-white border border-subtle-light rounded-2xl py-4 px-5 active:bg-primary/10"
          onPress={() => router.push("/")}
        >
          <MaterialIcons name="logout" size={22} color="#ef4444" />
          <Text className="ml-3 text-red-500 text-base font-medium">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
