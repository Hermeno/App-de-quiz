import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { buscarMedia, totalCorrectas, totalErradas } from "@/services/media";

export default function ResultadoScreen() {
  const { id, tentativaId } = useLocalSearchParams();

  console.log('id recebido no resultado:', id);
  const router = useRouter();
  const [resultado, setResultado] = useState<{ totalRespostas: number; corretas: number; media: number } | null>(null);
  const [corretas, setCorretas] = useState<number>(0);
  const [erradas, setErradas] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarResultado = async () => {
      if (!id || !tentativaId) {
        console.error('ID do exame ou tentativa não fornecidos:', { id, tentativaId });
        setLoading(false);
        return;
      }

      try {
        console.log('Carregando resultado para:', { id, tentativaId });
        
        const [res, rCorretas, rErradas] = await Promise.all([
          buscarMedia(Number(id), Number(tentativaId)),
          totalCorrectas(Number(id), Number(tentativaId)),
          totalErradas(Number(id), Number(tentativaId))
        ]);

        console.log('Resultados obtidos:', { res, rCorretas, rErradas });
        
        setResultado(res);
        setCorretas(rCorretas);
        setErradas(rErradas);
      } catch (error) {
        console.error("Erro ao buscar média ou totais:", error);
        // Aqui você pode adicionar um estado para mostrar o erro na UI
        setResultado(null);
      } finally {
        setLoading(false);
      }
    };

    carregarResultado();
  }, [id, tentativaId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!resultado) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light px-6">
        <Text className="text-lg text-text-light">Nenhum resultado disponível.</Text>
        <TouchableOpacity
          className="bg-primary py-4 rounded-2xl mt-6 w-full"
          onPress={() => router.push("/home")}
        >
          <Text className="text-white text-center font-bold text-lg">Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const feedback =
    resultado.media >= 80
      ? "Excelente, continue assim!"
      : resultado.media >= 50
      ? "Bom trabalho, mas ainda pode melhorar."
      : "Você precisa estudar mais. Não desista!";

  return (
    <ScrollView className="flex-1 bg-background-light px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-bold text-text-light">Resultado do Exame</Text>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="close-outline" size={28} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Resultado */}
      <View className="bg-white rounded-2xl p-6 shadow-md shadow-primary/20 mb-6">
        <Text className="text-lg font-semibold text-text-light mb-2">Total de Respostas:</Text>
        <Text className="text-2xl font-bold text-primary mb-4">{resultado.totalRespostas}</Text>

        <Text className="text-lg font-semibold text-text-light mb-2">Corretas:</Text>
        <Text className="text-2xl font-bold text-primary mb-4">{corretas}</Text>

        <Text className="text-lg font-semibold text-text-light mb-2">Erradas:</Text>
        <Text className="text-2xl font-bold text-red-500 mb-4">{erradas}</Text>

        <Text className="text-lg font-semibold text-text-light mb-2">Média:</Text>
        <Text className="text-2xl font-bold text-primary mb-4">{resultado.media.toFixed(2)}%</Text>

        <Text className="text-base text-text-light">{feedback}</Text>
      </View>

      {/* Botão voltar para home */}
      <TouchableOpacity
        className="bg-primary py-4 rounded-2xl shadow-md shadow-primary/30 mt-4"
        onPress={() => router.push("/home")}
      >
        <Text className="text-white text-center text-lg font-bold">Voltar para Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
