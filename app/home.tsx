import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { listarExames } from "@/services/exame";

export default function HomeScreen() {
  const router = useRouter();
  const [exames, setExames] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const carregarExames = async () => {
      try {
        const dados = await listarExames();
        setExames(dados);
      } catch (error) {
        console.error("Erro ao carregar exames:", error);
      }
    };
    carregarExames();
  }, []);

  const examesFiltrados = exames.filter((exame) =>
    exame.titulo?.toLowerCase().includes(search.toLowerCase())
  );

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
        <TouchableOpacity onPress={() => router.push("/ExamesScreen")}>
          <Ionicons name="home" size={28} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Barra de pesquisa */}
      <TextInput
        placeholder="Pesquisar exame..."
        value={search}
        onChangeText={setSearch}
        className="border border-gray-300 rounded-xl px-4 py-2 mb-4 bg-white"
      />

      {/* Lista de exames em formato de cards lado a lado */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {examesFiltrados.map((exame) => (
            <TouchableOpacity
              key={exame.id}
              className="w-[48%] bg-white rounded-2xl p-3 mb-4 shadow-md shadow-gray-200"
              onPress={() => router.push(`/perguntas?id=${exame.id}`)}
            >
              {/* Imagem temporária (depois pode mudar) */}
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3940/3940056.png",
                }}
                className="w-full h-28 rounded-xl mb-2"
                resizeMode="cover"
              />
              <Text className="text-lg font-bold text-gray-800 mb-1" numberOfLines={1}>
                {exame.titulo}
              </Text>
              <Text className="text-gray-500 text-sm" numberOfLines={2}>
                {exame.descricao}
              </Text>
              <Text className="text-xs text-gray-400 mt-1">
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
    </View>
  );
}
