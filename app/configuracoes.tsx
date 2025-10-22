import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

export default function ConfiguracoesScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <View className="flex-1 bg-background-light px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={26} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-light">Configurações</Text>
        <View className="w-6" />
      </View>

      {/* Seção de Preferências */}
      <Text className="text-lg font-semibold text-text-light mb-4">Preferências</Text>

      <View className="bg-white rounded-2xl border border-subtle-light mb-6">
        {/* Tema escuro */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row justify-between items-center px-5 py-4 border-b border-subtle-light"
          onPress={() => setDarkMode(!darkMode)}
        >
          <View className="flex-row items-center space-x-3">
            <Ionicons name="moon-outline" size={22} color="#1f2937" />
            <Text className="text-text-light text-base font-medium">Modo Escuro</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#13a4ec" : "#f4f3f4"}
            trackColor={{ false: "#d1d5db", true: "#13a4ec66" }}
          />
        </TouchableOpacity>

        {/* Notificações */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row justify-between items-center px-5 py-4"
          onPress={() => setNotificacoes(!notificacoes)}
        >
          <View className="flex-row items-center space-x-3">
            <Ionicons name="notifications-outline" size={22} color="#1f2937" />
            <Text className="text-text-light text-base font-medium">Notificações</Text>
          </View>
          <Switch
            value={notificacoes}
            onValueChange={setNotificacoes}
            thumbColor={notificacoes ? "#13a4ec" : "#f4f3f4"}
            trackColor={{ false: "#d1d5db", true: "#13a4ec66" }}
          />
        </TouchableOpacity>
      </View>

      {/* Seção de Informações */}
      <Text className="text-lg font-semibold text-text-light mb-4">Informações</Text>

      <View className="bg-white rounded-2xl border border-subtle-light">
        <TouchableOpacity
          className="flex-row items-center justify-between px-5 py-4 border-b border-subtle-light"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center space-x-3">
            <Ionicons name="information-circle-outline" size={22} color="#1f2937" />
            <Text className="text-text-light text-base font-medium">Sobre o App</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between px-5 py-4"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center space-x-3">
            <Ionicons name="help-circle-outline" size={22} color="#1f2937" />
            <Text className="text-text-light text-base font-medium">Ajuda</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Voltar à Home */}
      <TouchableOpacity
        className="bg-primary py-4 rounded-2xl shadow-md shadow-primary/30 mt-10"
        onPress={() => router.push("/home")}
        activeOpacity={0.9}
      >
        <Text className="text-white text-center text-lg font-bold">Voltar à Home</Text>
      </TouchableOpacity>
    </View>
  );
}
