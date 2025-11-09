import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { listarPerguntasPorExame } from "@/services/perguntas";
import { salvarResposta } from "@/services/respostas";
import { WebView } from 'react-native-webview';

export default function PerguntasScreen() {
  // const params = useLocalSearchParams();
  const router = useRouter();
  const { id, tentativaId } = useLocalSearchParams<{ id: string; tentativaId?: string }>();
 console.log('id recebido:', id);
 console.log('tentativaId recebido:', tentativaId);

  const [perguntas, setPerguntas] = useState<any[]>([]);
  const [indice, setIndice] = useState(0);
  const [selecionadas, setSelecionadas] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Timer: 60 minutos (em segundos)
  const [tempoRestante, setTempoRestante] = useState(60 * 60); // 3600 segundos

  // Formata mm:ss
  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${String(minutos).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
  };
  // --- fim Timer

  const perguntaAtual = perguntas[indice];
  const eUltima = indice === perguntas.length - 1;

  useEffect(() => {
    const carregarPerguntas = async () => {
      if (!id) {
        setError("ID do exame inválido");
        setLoading(false);
        return;
      }

      try {
        const data = await listarPerguntasPorExame(id);
        setPerguntas(data);
        setError(null);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
        setError("Erro ao carregar perguntas. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    carregarPerguntas();
  }, [id]);

  // Timer de 60 minutos (segundo efeito: só roda uma vez)
  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // chama handleFinalizar quando o tempo terminar
          // usamos setTimeout 0 para garantir que o fluxo atual de renderização termine antes de executar a finalização
          setTimeout(() => {
            handleFinalizar();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelecionarOpcao = (opcao: string) => {
    setSelecionadas({ ...selecionadas, [perguntaAtual.id]: opcao });
  };

  const handleProxima = () => {
    setIndice(indice + 1);
  };

  const handleFinalizar = async () => {
    try {
      // Salvar todas respostas de uma vez
      for (const pergunta of perguntas) {
        const resposta = selecionadas[pergunta.id];
        if (resposta) {
          await salvarResposta(pergunta.id, resposta, tentativaId); 
        }
      }

      // Navegar para resultado
      router.replace({
        pathname: "/resultado",
        params: { id: id, tentativaId: tentativaId },
      });
    } catch (error) {
      console.error("Erro ao salvar respostas:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!perguntaAtual) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light px-6">
        <Text className="text-lg text-text-light">Nenhuma pergunta disponível.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background-light px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-semibold text-text-light">
          Pergunta {indice + 1} / {perguntas.length}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close-outline" size={28} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Timer */}
      <View className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm items-center">
        <Text className="text-lg font-bold text-red-500">
          Tempo restante: {formatarTempo(tempoRestante)}
        </Text>
      </View>

      {/* Pergunta */}
      {/* <Text className="text-xl font-bold text-text-light mb-8">
        {perguntaAtual.pergunta}
      </Text> */}




{/* Pergunta */}
    <View style={{ height: 100, marginBottom: 16 }}>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
            <html>
              <head>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js"></script>
              </head>
              <body>
                <p style="font-size:50px;">\\(${perguntaAtual.pergunta}\\)</p>
              </body>
            </html>
          `,
        }}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        scrollEnabled={false}
      />
    </View>







      {/* Opções */}
      {["opcaoA", "opcaoB", "opcaoC", "opcaoD", "opcaoE"].map((opcao) => {
        if (!perguntaAtual[opcao]) return null;

        const isSelected = selecionadas[perguntaAtual.id] === opcao;

        return (
          <TouchableOpacity
            key={opcao}
            activeOpacity={0.9}
            onPress={() => handleSelecionarOpcao(opcao)}
            className={`w-full py-4 px-4 mb-4 rounded-xl border ${
              isSelected ? "bg-gray-200" : "bg-white"
            }`}
            style={{ borderColor: isSelected ? "#6b7280" : "#e5e7eb" }}
          >
            <Text
              className={`text-base ${
                isSelected ? "text-gray-900 font-semibold" : "text-text-light"
              }`}
            >
              {perguntaAtual[opcao]}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Botão Próxima ou Finalizar */}
      {selecionadas[perguntaAtual.id] && (
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-2xl shadow-md shadow-primary/30 mt-4"
          onPress={eUltima ? handleFinalizar : handleProxima}
        >
          <Text className="text-white text-center text-lg font-bold">
            {eUltima ? "Finalizar exame" : "Próxima"}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
