import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { obterUsuarioPorId } from "@/services/user";

export default function PerfilScreen() {
  const router = useRouter();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    avatar: "",
    tipo: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);

  async function getUsuario() {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        console.error("Token não encontrado");
        setLoading(false);
        return;
      }

      const dadosUsuario = await obterUsuarioPorId(token);
      setUsuario({
        nome: dadosUsuario.nome ?? "",
        email: dadosUsuario.email ?? "",
        avatar: dadosUsuario.avatar ?? "",
        tipo: dadosUsuario.tipo ?? "",
        id: dadosUsuario.id ?? "",
      });
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      router.replace("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light">
        <ActivityIndicator size="large" color="#1f2937" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-light px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={26} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-light">Perfil</Text>
        <View className="w-6" />
      </View>

      {/* Avatar */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri:
              usuario.avatar && usuario.avatar.length > 0
                ? usuario.avatar
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          className="w-28 h-28 rounded-full mb-4 border-4 border-primary/30"
        />
        <Text className="text-2xl font-bold text-text-light">{usuario.nome || "Usuário"}</Text>
        <Text className="text-base text-text-light opacity-70">{usuario.email || ""}</Text>
      </View>

      {/* Botões de ação */}
      <View className="mt-10 space-y-4">
        <TouchableOpacity
          className="flex-row items-center bg-white border border-subtle-light rounded-2xl py-4 px-5 active:bg-primary/10"
          onPress={() => router.push("/editarPerfil?id=" + usuario.id)}
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
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={22} color="#ef4444" />
          <Text className="ml-3 text-red-500 text-base font-medium">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
