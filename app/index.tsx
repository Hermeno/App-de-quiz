import { loginUsuario } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const data = await loginUsuario({ email, password });
      if (data && data.token) {
        await SecureStore.setItemAsync("token", data.token);
        if (data.nome) {
          await SecureStore.setItemAsync("nome", data.nome);
        }
        router.replace("/home");
      } else {
        alert("Falha no login: token não recebido.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Falha no login. Verifique suas credenciais.");
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background-light justify-center px-6"
    >
      {/* Header */}
      <View className="items-center mb-12">
        <Image
          source={require("../assets/images/ccc.png")}
          className="w-48 h-48 mb-2"
          resizeMode="contain"
        />
        <Text className="text-text-light text-base opacity-70">Bem-vindo de volta 👋</Text>
      </View>

      {/* Inputs */}
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

      <View className="w-full mb-8">
        <Text className="text-text-light mb-2 font-semibold">Senha</Text>
        <View className="flex-row items-center border border-subtle-light bg-white rounded-xl px-4">
          <TextInput
            className="flex-1 py-5 text-text-light"
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
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

      {/* Button */}
      <TouchableOpacity
        className="bg-primary py-3.5 rounded-xl mb-4 shadow-md shadow-primary/30"
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-bold text-lg">Entrar</Text>
      </TouchableOpacity>

      {/* Links */}
      <TouchableOpacity className="mb-4" onPress={() => router.push("/recuperarSenha")}>
        <Text className="text-center text-primary font-medium">Esqueceu a senha?</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-text-light">Ainda não tem conta? </Text>
        <TouchableOpacity onPress={() => router.push("/cadastro")}>
          <Text className="text-primary font-semibold">Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
