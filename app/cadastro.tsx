import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CadastroScreen() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background-light"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 24, paddingVertical: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-4xl font-bold text-primary mb-2">Criar Conta</Text>
          <Text className="text-text-light text-base opacity-70">Preencha seus dados para continuar 🚀</Text>
        </View>

        {/* Nome */}
        <View className="w-full mb-6">
          <Text className="text-text-light mb-2 font-semibold">Nome completo</Text>
          <TextInput
            className="border border-subtle-light bg-white rounded-xl px-4 py-5 text-text-light focus:border-primary"
            placeholder="Seu nome completo"
            placeholderTextColor="#9ca3af"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Email */}
        <View className="w-full mb-6">
          <Text className="text-text-light mb-2 font-semibold">Email</Text>
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

        {/* Senha */}
        <View className="w-full mb-8">
          <Text className="text-text-light mb-2 font-semibold">Senha</Text>
          <View className="flex-row items-center border border-subtle-light bg-white rounded-xl px-4">
            <TextInput
              className="flex-1 py-5 text-text-light"
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#6b7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Cadastro */}
        <TouchableOpacity
          className="bg-primary py-3.5 rounded-xl mb-4 shadow-md shadow-primary/30"
          onPress={() => router.push("/home")}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-bold text-lg">Cadastrar</Text>
        </TouchableOpacity>

        {/* Voltar para Login */}
        <View className="flex-row justify-center mt-2">
          <Text className="text-text-light">Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text className="text-primary font-semibold">Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
