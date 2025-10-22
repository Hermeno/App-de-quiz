import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditarPerfilScreen() {
  const router = useRouter();
  const [nome, setNome] = useState("Hermínio Macamo");
  const [email, setEmail] = useState("herminio@exemplo.com");
  const [senha, setSenha] = useState("");

  return (
    <View className="flex-1 bg-background-light px-6 py-10">
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 p-2 rounded-full bg-subtle-light"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-light">Editar Perfil</Text>
      </View>

      {/* Foto de perfil */}
      <View className="items-center mb-8">
        <View className="w-28 h-28 rounded-full bg-subtle-light items-center justify-center overflow-hidden">
          <Image
            source={require("../assets/avatar.webp")}
            className="w-28 h-28"
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity
          className="mt-3 flex-row items-center"
          onPress={() => console.log("Alterar foto")}
        >
          <Ionicons name="camera-outline" size={18} color="#13a4ec" />
          <Text className="text-primary text-sm ml-1 font-medium">
            Alterar foto
          </Text>
        </TouchableOpacity>
      </View>

      {/* Campos */}
      <View className="mb-6">
        <Text className="text-text-light mb-1 font-semibold">Nome</Text>
        <TextInput
          className="bg-white border border-subtle-light rounded-xl px-4 py-5 text-text-light"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View className="mb-6">
        <Text className="text-text-light mb-1 font-semibold">Email</Text>
        <TextInput
          className="bg-white border border-subtle-light rounded-xl px-4 py-5 text-text-light"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View className="mb-10">
        <Text className="text-text-light mb-1 font-semibold">Senha</Text>
        <TextInput
          className="bg-white border border-subtle-light rounded-xl px-4 py-5 text-text-light"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="Digite uma nova senha"
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Botão de salvar */}
      <TouchableOpacity
        className="bg-primary py-4 rounded-2xl shadow-md shadow-primary/30"
        onPress={() => console.log("Alterações salvas!")}
        activeOpacity={0.9}
      >
        <Text className="text-white text-center text-lg font-bold">
          Salvar Alterações
        </Text>
      </TouchableOpacity>
    </View>
  );
}
