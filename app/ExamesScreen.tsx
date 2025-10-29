import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {FlatList,Modal,Pressable,Text,TextInput,TouchableOpacity,View,} from "react-native";
import {cadastroExame, listarExames} from '@/services/exame';


export default function ExamesScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [exames, setExames] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [duracao, setDuracao] = useState("");
  const [preco, setPreco] = useState("");
  const [numeroPerguntas, setNumeroPerguntas] = useState("");
  const [estado, setEstado] = useState("ativo");
  const [criadorId, setCriadorId] = useState(1);

  useEffect(() => {
    loadExames();
  }, []);

  const loadExames = async () => {
    try {
      const response = await listarExames();
      setExames(response);
    } catch (error) {
      console.error("Erro ao carregar exames:", error);
    }
  };

      const handleCadastro = async () => {
        try {
          const novoExame = {
            titulo,
            descricao,
            duracao,
            preco,
            numeroPerguntas,
            estado,
            criadorId
          };
          const response = await cadastroExame(novoExame);
          console.log("Exame cadastrado com sucesso:", response);
          setModalVisible(false);
          await loadExames();
        } catch (error) {
          console.error("Erro ao cadastrar exame:", error);
        }
      };







  return (
    <View className="flex-1 bg-background-light p-4">
      {/* Cabeçalho */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-text-light">Exames</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-primary px-4 py-2 rounded-2xl"
        >
          <Text className="text-white font-semibold">+ Novo</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Exames */}
      <FlatList
        data={exames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/PerguntasScreen?Id=${item.id}`)}
            className="bg-white p-4 mb-3 rounded-2xl shadow m-2"
          >
            <Text className="text-lg font-semibold text-text-light">
              {item.titulo}
            </Text>
            <Text className="text-subtle-dark">Descrição: {item.descricao}</Text>
            <Text className="text-subtle-dark">preco: {item.preco} MT</Text>
            <Text className="text-subtle-dark">Duração: {item.duracao} min</Text>
            <Text className="text-subtle-dark">
              Nº Perguntas: {item.numeroPerguntas}
            </Text>
            <Text className="text-subtle-dark">Estado: {item.estado}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal para novo exame */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center bg-black/40 px-6">
          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <Text className="text-xl font-bold mb-4 text-text-light">
              Novo Exame
            </Text>

            <TextInput
              placeholder="Título"
              className="border border-subtle-light rounded-xl px-4 py-3 mb-3"
              onChangeText={setTitulo}
            />
            <TextInput
              placeholder="Descrição"
              className="border border-subtle-light rounded-xl px-4 py-3 mb-3"
              onChangeText={setDescricao}
            />
            <TextInput
              placeholder="Duração (minutos)"
              className="border border-subtle-light rounded-xl px-4 py-3 mb-3"
              keyboardType="numeric"
              onChangeText={setDuracao}
            />
            <TextInput
              placeholder="preco (MT)"
              className="border border-subtle-light rounded-xl px-4 py-3 mb-3"
              keyboardType="numeric"
              onChangeText={setPreco}
            />
            <TextInput
              placeholder="Número de Perguntas"
              className="border border-subtle-light rounded-xl px-4 py-3 mb-3"
              keyboardType="numeric"
              onChangeText={setNumeroPerguntas}
            />

            <View className="flex-row justify-end mt-4">
              <Pressable
                className="bg-subtle-light px-4 py-2 rounded-2xl mr-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-text-light font-semibold">Cancelar</Text>
              </Pressable>
              <Pressable
                className="bg-primary px-4 py-2 rounded-2xl"
                onPress={handleCadastro}> 
                <Text className="text-white font-semibold">Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
