import { todasPerguntas } from "@/services/quizzes";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from 'expo-audio';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const somAcerto = require('@/assets/music.wav');

export default function QuizDiversao() {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [grupoAtual, setGrupoAtual] = useState<any[]>([]);
  const [indiceGrupo, setIndiceGrupo] = useState(0);
  const [selecionada, setSelecionada] = useState<string | null>(null);

  const mensagensSuper = [
    "🎉🎊 Uau! Você não é um robô! 🤖✨🪄",
    "💪🔥 Você é um super humano! 🦸‍♂️🦸‍♀️🚀",
    "🏆👑 Mestre absoluto! 👏🎯💫",
    "🕺💃 Dança da vitória! 🎶💥🥳",
    "🎇✨ Que incrível! Você acertou todas! 🌟🎉🤩",
    "🚀💥 Super humano em ação! 🦸‍♂️🦸‍♀️🎊",
  ];





  const player = useAudioPlayer(somAcerto);

  const embaralhar = (array: any[]) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const perguntasEmbaralhadas = embaralhar([...todasPerguntas]);
    const inicio = indiceGrupo * 5;
    setGrupoAtual(perguntasEmbaralhadas.slice(inicio, inicio + 5));
  }, [indiceGrupo]);

  const responder = (opcao: string) => {
    setSelecionada(opcao);

    const acertou = opcao === grupoAtual[indice].correta;
    if (acertou) setPontuacao(pontuacao + 1);

    setTimeout(() => {
      if (indice + 1 < grupoAtual.length) {
        setIndice(indice + 1);
        setSelecionada(null);
      } else {
        setFinalizado(true);
        setSelecionada(null);

        // Toca som se acertou todas
        if (acertou && pontuacao + 1 === grupoAtual.length) {
          player.play();
        }
      }
    }, 1500);
  };

  const proximoGrupo = () => {
    const proximoIndiceGrupo = indiceGrupo + 1;
    const inicio = proximoIndiceGrupo * 5;

    if (inicio < todasPerguntas.length) {
      setIndiceGrupo(proximoIndiceGrupo);
      setIndice(0);
      setPontuacao(0);
      setFinalizado(false);
    } else {
      alert("🎉 Você completou todas as perguntas disponíveis!");
      setIndiceGrupo(0);
      setIndice(0);
      setPontuacao(0);
      setFinalizado(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={28} color="#2563eb" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-blue-700">Quiz de Diversão 🎯</Text>
      </View>

{finalizado ? (
  <View className="items-center mt-10">
    {pontuacao === grupoAtual.length ? (
      <>
        {/* Toca o som de vitória */}
        {player.play()}
        <Text className="text-2xl font-bold mb-4">
          {mensagensSuper[Math.floor(Math.random() * mensagensSuper.length)]}
        </Text>
      </>
    ) : pontuacao >= 3 ? (
      <>
        <Text className="text-2xl font-bold mb-4">🎉 Parabéns!</Text>
        <Text className="text-lg text-gray-700 mb-6">
          Você acertou {pontuacao} de {grupoAtual.length} perguntas!
        </Text>
      </>
    ) : (
      <>
        <Text className="text-2xl font-bold mb-4">😅 Quase lá!</Text>
        <Text className="text-lg text-gray-700 mb-6">
          Você acertou {pontuacao} de {grupoAtual.length} perguntas.
        </Text>
      </>
    )}

    <TouchableOpacity
      className="bg-blue-600 px-6 py-3 rounded-full"
      onPress={proximoGrupo}
    >
      <Text className="text-white text-lg font-semibold">
        Próximas perguntas
      </Text>
    </TouchableOpacity>
  </View>

      ) : (
        <ScrollView>
          {grupoAtual.length > 0 && (
            <>
              <Text className="text-lg font-semibold mb-4">
                {indice + 1}. {grupoAtual[indice].pergunta}
              </Text>

              {grupoAtual[indice].opcoes.map((opcao: string, index: number) => {
                let bgColor = "bg-blue-100";
                let textColor = "text-blue-800";

                if (selecionada) {
                  if (opcao === grupoAtual[indice].correta) {
                    bgColor = "bg-green-300";
                    textColor = "text-green-900";
                  } else if (opcao === selecionada && opcao !== grupoAtual[indice].correta) {
                    bgColor = "bg-red-300";
                    textColor = "text-red-900";
                  }
                }

                return (
                  <TouchableOpacity
                    key={index}
                    className={`${bgColor} border border-blue-400 rounded-2xl py-3 px-4 mb-3`}
                    onPress={() => !selecionada && responder(opcao)}
                  >
                    <Text className={`${textColor} text-base`}>{opcao}</Text>
                  </TouchableOpacity>
                );
              })}

              <Text className="text-center text-gray-500 mt-6">
                Pergunta {indice + 1} de {grupoAtual.length}
              </Text>
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}
