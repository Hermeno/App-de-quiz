import React, { use, useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { cadastrarPergunta, listarPerguntasPorExame } from "@/services/perguntas"; // <-- importa seu intermediário

export default function PerguntasScreen() {
  const { Id, exameNome } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);
  const [tipo, setTipo] = useState("texto");
  const [pergunta, setPergunta] = useState("");
  const [imagemPergunta, setImagemPergunta] = useState<string | null>(null);
  const [correta, setCorreta] = useState("A");
  const [opcaoA, setOpcaoA] = useState("");
  const [opcaoB, setOpcaoB] = useState("");
  const [opcaoC, setOpcaoC] = useState("");
  const [opcaoD, setOpcaoD] = useState("");
  const [perguntas, setPerguntas] = useState([]); 
  useEffect(() => {
    loadPerguntas();
  }, []);
  
  const loadPerguntas = async () => {
    try {
      const response = await listarPerguntasPorExame(parseInt(Id as string, 10)); // Converte o Id para número
      setPerguntas(response);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
    }
  };

//  <TouchableOpacity
//             onPress={() => router.push(`/PerguntasScreen?id=${item.id}`)}
// how to capture this id to use it in handlecadastro 




  // const escolherImagem = async () => {
  //   const res = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     quality: 0.7,
  //     base64: true,
  //   });
  //   if (!res.canceled && res.assets?.length) {
  //     setImagemPergunta(res.assets[0].uri);
  //   }
  // };

  const handleCadastro = async () => {
  const exameId = parseInt(Id as string, 10); // Converte o Id para número
    try {
      await cadastrarPergunta({ pergunta, tipo, opcaoA, opcaoB, opcaoC, opcaoD, correta, exameId, // Inclui o exameId no cadastro
      });
      alert("Pergunta cadastrada com sucesso!");
      // Limpa os campos após o cadastro
      setPergunta("");
      setTipo("texto");
      setOpcaoA("");
      setOpcaoB("");
      setOpcaoC("");
      setOpcaoD("");
      setCorreta("A");
      // Recarrega a lista de perguntas
      loadPerguntas();
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao cadastrar pergunta:", error);
      alert("Erro ao cadastrar pergunta. Tente novamente.");
    }
  }

 

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold mb-3">Exame: {exameNome}</Text>

      <TouchableOpacity
        className="bg-blue-600 p-3 rounded-2xl mb-3"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center font-semibold">Adicionar Pergunta</Text>
      </TouchableOpacity>




{/* agora listar todas perguntas por exameId */}
      <ScrollView>
        
      {/* cria codigo de listagem de perguntas aqui */}
      <View className="mt-4">
        <Text className="text-lg font-bold mb-2">Perguntas do Exame:</Text>
        {perguntas.length === 0 ? (
          <Text className="text-gray-600">Nenhuma pergunta cadastrada.</Text>
        ) : (
          perguntas.map((perguntaItem: any, index: number) => (
            <View
              key={index}
              className="bg-white p-4 mb-3 rounded-2xl shadow"
            >
              <Text className="font-semibold mb-2">
                {index + 1}. {perguntaItem.pergunta}
              </Text>
              <Text>A) {perguntaItem.opcaoA}</Text>
              <Text>B) {perguntaItem.opcaoB}</Text>
              <Text>C) {perguntaItem.opcaoC}</Text>
              <Text>D) {perguntaItem.opcaoD}</Text>
              <Text className="mt-2 font-semibold">
                Resposta Correta: {perguntaItem.correta}
              </Text>
            </View>
          ))
        )}
      </View>
      </ScrollView>





      {/* Modal de cadastro */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView className="flex-1 bg-white p-4">
          <Text className="text-xl font-bold mb-3">Nova Pergunta</Text>

          <Text className="font-semibold mb-2">Tipo da Pergunta:</Text>
          <View className="flex-row mb-3">
            {["texto", "imagem", "equacao"].map((tipo) => (
              <TouchableOpacity
                key={tipo}
                className={`px-3 py-1 mr-2 rounded-full ${
                  tipo === tipo ? "bg-blue-600" : "bg-gray-300"
                }`}
                onPress={() => setTipo(tipo)}
              >
                <Text className="text-white capitalize">{tipo}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {tipo === "imagem" ? (
            <TouchableOpacity
              onPress={escolherImagem}
              className="bg-gray-200 p-3 rounded-xl mb-3"
            >
              <Text>Escolher imagem da pergunta</Text>
              {imagemPergunta && (
                <Image
                  source={{ uri: imagemPergunta }}
                  className="w-full h-40 mt-2 rounded-lg"
                />
              )}
            </TouchableOpacity>
          ) : (
            <TextInput
              placeholder="Digite a pergunta..."
              value={pergunta}
              onChangeText={setPergunta}
              className="bg-gray-200 p-3 rounded-xl mb-3 min-h-[80px] text-base"
              multiline
            />
          )}
          <Text className="" >Opção A:</Text>
          <TextInput
            placeholder="Digite a opção A..."
            value={opcaoA}
            onChangeText={setOpcaoA}
            className="bg-gray-200 p-3 rounded-xl mb-3 text-base"
          />
          <Text className="" >Opção B:</Text>
          <TextInput
            placeholder="Digite a opção B..."
            value={opcaoB}
            onChangeText={setOpcaoB}
            className="bg-gray-200 p-3 rounded-xl mb-3 text-base"
          />
          <Text className="" >Opção C:</Text>
          <TextInput
            placeholder="Digite a opção C..."
            value={opcaoC}
            onChangeText={setOpcaoC}
            className="bg-gray-200 p-3 rounded-xl mb-3 text-base"
          />
          <Text className="" >Opção D:</Text>
          <TextInput
            placeholder="Digite a opção D..."
            value={opcaoD}
            onChangeText={setOpcaoD}
            className="bg-gray-200 p-3 rounded-xl mb-3 text-base"
          />
          <Text className="font-semibold mb-2">Opção Correta:</Text>
          <View className="flex-row mb-3">
            {["A", "B", "C", "D"].map((letra) => (
              <TouchableOpacity
                key={letra}
                className={`px-3 py-1 mr-2 rounded-full ${
                  correta === letra ? "bg-green-600" : "bg-gray-300"
                }`}
                onPress={() => setCorreta(letra)}
              >
                <Text className="text-white">{letra}</Text>
              </TouchableOpacity>
            ))}
          </View>



          <TouchableOpacity
            onPress={handleCadastro}
            className="bg-blue-600 p-3 rounded-2xl mt-2"
          >
            <Text className="text-white text-center font-semibold">
              Salvar Pergunta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="bg-red-500 p-3 rounded-2xl mt-3"
          >
            <Text className="text-white text-center font-semibold">Fechar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}
