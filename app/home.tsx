import { listarExames } from "@/services/exame";
import { obterUsuarioPorId } from "@/services/user";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [exames, setExames] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const carregarExames = async () => {
      try {
        const dados = await listarExames();
        setExames(dados);
      } catch (error) {
        console.error("Erro ao carregar exames:", error);
      }
    };

    const carregarDadosPerfil = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          Alert.alert("Erro", "Token de autenticação não encontrado.");
          return;
        }

        const dadosUsuario = await obterUsuarioPorId(token);
        setUsuario(dadosUsuario);
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
      }
    };

    carregarExames();
    carregarDadosPerfil();
  }, []);

  const examesFiltrados = exames.filter((exame) =>
    exame.titulo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background-light px-4 py-4">
       <StatusBar backgroundColor="#2563eb" style="light" />
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-text-light">
          Bem-vindo ao AprovAqui!
        </Text>

        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            className="bg-background-light p-2 rounded-full shadow-md shadow-gray-300"
            onPress={() => router.push("/perfil")}
          >
           <Text style={{ fontSize: 28 }}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-background-light p-2 rounded-full ml-2 shadow-md shadow-gray-300"
            onPress={() => router.push("/")}
          >
            <Text style={{ fontSize: 28 }}>🔒</Text>
          </TouchableOpacity>
          {/* Exibir botão extra se o usuário for admin */}
          {usuario?.tipo === "admin" && (
            <TouchableOpacity
              className="bg-white p-2 rounded-full shadow-md shadow-gray-300"
              onPress={() => router.push("/exame")}
            >
              <Ionicons name="settings-outline" size={28} color="#1f2937" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Barra de pesquisa */}
      <TextInput
        placeholder="Pesquisar exame..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        className="border border-gray-300 rounded-3xl px-4 py-3 mb-4 bg-white shadow-sm shadow-gray-200"
      />


      {/* Lista de exames em formato de cards lado a lado */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {examesFiltrados.map((exame) => (
            <TouchableOpacity
              key={exame.id}
              className="w-[48%] bg-white rounded-3xl p-3 mb-4 shadow-lg shadow-gray-300 border border-gray-300"
              onPress={() =>
                router.push({ pathname: "/iniciar", params: { id: exame.id } })
              }
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3940/3940056.png",
                }}
                className="w-full h-28 rounded-2xl mb-2"
                resizeMode="cover"
              />
              <Text
                className="text-lg font-semibold text-gray-900 mb-1"
                numberOfLines={1}
              >
                {exame.titulo}
              </Text>
              <Text className="text-gray-700 text-sm" numberOfLines={2}>
                {exame.descricao}
              </Text>
              <Text className="text-xs text-gray-500 mt-1">
                {exame.numeroPerguntas} perguntas | {exame.estado}
              </Text>
            </TouchableOpacity>
          ))}

          {examesFiltrados.length === 0 && (
            <Text className="text-center text-gray-500 mt-10 w-full">
              Nenhum exame encontrado
            </Text>
          )}
        </View>
      </ScrollView>
            <TouchableOpacity
        className="bg-[#3e9bf2ff] rounded-full py-4 mt-6"
        onPress={() => router.push("/diversos")}
        activeOpacity={0.8}
      >
        <Text className="text-white text-center text-lg font-bold">
          Quer testar teus conhecimentos??
        </Text>
      </TouchableOpacity>
    </View>



  );
}
