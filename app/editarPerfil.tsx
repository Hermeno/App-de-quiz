import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { obterUsuarioPorId } from "@/services/user";
import { atualizarPerfilUsuario } from "@/services/user";

export default function EditarPerfilScreen() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("+258");
  const [cidade, setCidade] = useState("");
  const [classe, setClasse] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function carregarDadosPerfil() {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        Alert.alert("Erro", "Token de autenticação não encontrado.");
        setLoading(false);
        return;
      }

      const dadosUsuario = await obterUsuarioPorId(token);
      setNome(dadosUsuario.nome || "");
      setEmail(dadosUsuario.email || "");
      setNumero(dadosUsuario.numero || "+258-");
      setCidade(dadosUsuario.cidade || "");
      setClasse(dadosUsuario.classe || "");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
    } finally {
      setLoading(false);
    }
  }

  const handleSalvarAlteracoes = async () => {
    if (!nome || !email) {
      Alert.alert("Atenção", "Nome e email não podem estar vazios.");
      return;
    }

    try {
      setSaving(true);
      
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        Alert.alert("Erro", "Token de autenticação não encontrado");
        return;
      }

      await atualizarPerfilUsuario(token, {
        nome,
        email,
        numero,
        cidade,
        classe
      });

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      setNome("");
      setEmail("");
      setNumero("+258");
      setCidade("");
      setClasse("");
      router.back();
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      const mensagem = error?.message || "Não foi possível atualizar o perfil";
      Alert.alert("Erro", mensagem);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    carregarDadosPerfil();
  }, []);

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
      <View className="flex-row items-center mb-8">
        <TouchableOpacity onPress={() => router.back()} className="mr-3 p-2 rounded-full bg-subtle-light">
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
          <Text className="text-primary text-sm ml-1 font-medium">Alterar foto</Text>
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

      <View className="mb-6">
        <Text className="text-text-light mb-1 font-semibold">Número de Celular</Text>
        <TextInput
          className="bg-white border border-subtle-light rounded-xl px-4 py-5 text-text-light"
          value={numero}
          onChangeText={(text) => {
            if (text.startsWith("+258-")) setNumero(text);
          }}
          keyboardType="phone-pad"
        />
      </View>

    {/* adicionar  cidade e classe */}

     <View className="mb-6">
        <Text className="text-text-light mb-1 font-semibold">Cidade</Text>
        <TextInput
          className="bg-white border border-subtle-light rounded-xl px-4 py-5 text-text-light"
          value={cidade}
          onChangeText={setCidade}
        />
      </View>

      <View className="mb-6">
        <Text className="text-text-light mb-1 font-semibold">Classe</Text>
        <TextInput
          className="bg-white border border-subtle-light rounded-xl px-4 py-5 text-text-light"
          value={classe}
          onChangeText={setClasse}
        />
      </View>

       

      {/* Botão de salvar */}
      <TouchableOpacity
        className="bg-primary py-4 rounded-2xl shadow-md shadow-primary/30"
        onPress={handleSalvarAlteracoes}
        activeOpacity={0.9}
        disabled={saving}
      >
        <Text className="text-white text-center text-lg font-bold">
          {saving ? "Salvando..." : "Salvar Alterações"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
