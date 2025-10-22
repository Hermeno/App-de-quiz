import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PerguntasScreen() {
  const router = useRouter();

  // Exemplo de perguntas — depois você pode carregar do banco de dados
  const perguntas = [
    {
      id: 1,
      pergunta: "Qual linguagem é usada para desenvolver apps em React Native?",
      opcoes: ["Python", "C++", "JavaScript", "Ruby"],
      correta: "JavaScript",
    },
    {
      id: 2,
      pergunta: "O que significa a sigla UX?",
      opcoes: ["User Xperience", "User Experience", "Unique XML", "Ultra Exchange"],
      correta: "User Experience",
    },
    {
      id: 3,
      pergunta: "O React Native foi criado por qual empresa?",
      opcoes: ["Google", "Microsoft", "Facebook", "Amazon"],
      correta: "Facebook",
    },
  ];

  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [pontuacao, setPontuacao] = useState(0);

  const perguntaAtual = perguntas[indice];
  const progresso = ((indice + 1) / perguntas.length) * 100;

  const handleResponder = (opcao: string) => {
    setSelecionada(opcao);
    if (opcao === perguntaAtual.correta) {
      setPontuacao(pontuacao + 1);
    }
  };

  const handleProxima = () => {
    if (indice < perguntas.length - 1) {
      setIndice(indice + 1);
      setSelecionada(null);
    } else {
      router.push({
        pathname: "/resultado",
        params: { pontuacao, total: perguntas.length },
      });
    }
  };

  return (
    <View className="flex-1 bg-background-light px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-semibold text-text-light">
          Pergunta {indice + 1} / {perguntas.length}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close-outline" size={28} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Barra de Progresso */}
      <View className="w-full h-3 bg-subtle-light rounded-full mb-8">
        <View
          className="h-3 bg-primary rounded-full"
          style={{ width: `${progresso}%` }}
        />
      </View>

      {/* Pergunta */}
      <Text className="text-xl font-bold text-text-light mb-8">
        {perguntaAtual.pergunta}
      </Text>

      {/* Opções */}
      {perguntaAtual.opcoes.map((opcao, index) => {
        const isSelected = selecionada === opcao;
        const isCorrect = perguntaAtual.correta === opcao;
        const bgColor =
          selecionada && isSelected
            ? isCorrect
              ? "bg-success"
              : "bg-red-400"
            : "bg-white";

        const borderColor = isSelected
          ? isCorrect
            ? "#10b981"
            : "#f87171"
          : "#e5e7eb";

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => !selecionada && handleResponder(opcao)}
            className={`w-full py-4 px-4 mb-4 rounded-xl border ${bgColor}`}
            style={{ borderColor }}
          >
            <Text
              className={`text-base ${
                isSelected ? "text-white font-semibold" : "text-text-light"
              }`}
            >
              {opcao}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Botão Próxima */}
      {selecionada && (
        <TouchableOpacity
          className="bg-primary py-4 rounded-2xl shadow-md shadow-primary/30 mt-4"
          onPress={handleProxima}
        >
          <Text className="text-white text-center text-lg font-bold">
            {indice < perguntas.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
