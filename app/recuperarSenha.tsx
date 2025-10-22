import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RecuperarSenhaScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSend = () => {
    // Aqui depois você pode implementar o envio real do link por e-mail
    alert("Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.");
    router.push("/");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background-light justify-center px-6"
    >
      {/* Cabeçalho */}
      <View className="items-center mb-10">
        <Ionicons name="key-outline" size={64} color="#13a4ec" />
        <Text className="text-3xl font-bold text-primary mt-4 mb-2">Recuperar Senha</Text>
        <Text className="text-text-light text-center opacity-70">
          Digite seu e-mail e enviaremos um link para redefinir sua senha.
        </Text>
      </View>

      {/* Campo de Email */}
      <View className="mb-8">
        <Text className="text-text-light mb-2 font-semibold">E-mail</Text>
        <TextInput
          className="border border-subtle-light bg-white rounded-xl px-4 py-5 text-text-light focus:border-primary"
          placeholder="seu@email.com"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Botão Enviar */}
      <TouchableOpacity
        className="bg-primary py-3.5 rounded-xl mb-4 shadow-md shadow-primary/30"
        onPress={handleSend}
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-bold text-lg">Enviar Link</Text>
      </TouchableOpacity>

      {/* Voltar para Login */}
      <View className="flex-row justify-center mt-4">
        <Text className="text-text-light">Lembrou sua senha? </Text>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text className="text-primary font-semibold">Fazer login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
