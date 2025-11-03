import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { listarExames } from "@/services/exame"; 
import { criarTentativa } from "@/services/tentativa";

export default function IniciarScreen() {
  const { id } = useLocalSearchParams(); // exameId
  const router = useRouter();
  const [exame, setExame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [iniciando, setIniciando] = useState(false); // loading ao iniciar avaliação

  useEffect(() => {
    const carregarExame = async () => {
      try {
        const exames = await listarExames();
        const selecionado = exames.find((e: any) => e.id === Number(id));
        setExame(selecionado);
      } catch (error) {
        console.error("Erro ao carregar exame:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarExame();
  }, [id]);

  const iniciarAvaliacao = async () => {
    if (!exame) return;
    setIniciando(true); // mostra loading apenas no botão
    try {
      // Cria nova tentativa
      const tentativa = await criarTentativa(Number(id));

      // Navega para PerguntasScreen passando exameId e tentativaId
      router.replace({
        pathname: "/perguntas",
        params: { id: id, tentativaId: tentativa.tentativaId },
      });
    } catch (error: any) {
      console.error("Erro ao iniciar avaliação:", error);
      alert(error?.response?.data?.error || "Não foi possível iniciar a avaliação.");
    } finally {
      setIniciando(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!exame) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light px-6">
        <Text className="text-lg text-text-light">Exame não encontrado.</Text>
        <TouchableOpacity
          className="bg-primary py-4 rounded-2xl mt-6 w-full"
          onPress={() => router.push("/home")}
        >
          <Text className="text-white text-center font-bold text-lg">Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-light px-6 py-10 justify-center">
      <Text className="text-2xl font-bold text-text-light mb-4">{exame.titulo}</Text>
      <Text className="text-base text-text-light mb-2">
        Número de perguntas: {exame.numeroPerguntas || 0}
      </Text>
      <Text className="text-base text-text-light mb-2">
        Tentativas disponíveis: 2
      </Text>
      <Text className="text-base text-text-light mb-6">
        Tempo disponível: {exame.tempo || "Não definido"} minutos
      </Text>

      <TouchableOpacity
        className="bg-primary py-4 rounded-2xl shadow-md shadow-primary/30 flex-row justify-center items-center"
        onPress={iniciarAvaliacao}
        disabled={iniciando}
      >
        {iniciando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center text-lg font-bold">Iniciar Avaliação</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
