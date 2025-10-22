import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background-light justify-center px-6"
    >
      {/* Header */}
      <View className="items-center mb-12">
        <Text className="text-4xl font-bold text-primary mb-2">AprovAqui</Text>
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
        onPress={() => router.push("/home")}
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
