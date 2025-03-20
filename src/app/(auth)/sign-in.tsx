import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/src/constants/Colors";
import { useTheme } from "@/src/components/context/Theme";
import { Sizes } from "@/src/constants/Sizes";
import { Fonts } from "@/src/constants/Fonts";
// import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import {
  signInWithEmailPassword,
  signUpWithEmailPassword,
} from "@/src/services/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/src/services/schema/auth";
import { z } from "zod";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useMMKVString } from "react-native-mmkv";

const SignIn = () => {
  const { dark } = useTheme();
  const [emailFocused, setEmailFocused] = useState(false);
  const [secure, setSecure] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { screen } = useLocalSearchParams<{ screen: string }>();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useMMKVString("token");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    setLoading(true);
    screen === "signin"
      ? await signInWithEmailPassword({
          email: values.email,
          password: values.password,
        })
          .then((result) => {
            setToken(result);
            console.log("RESULT",result)
            return router.replace("/");
          })
          .finally(() => {
            setLoading(false);
          })
      : await signUpWithEmailPassword({
          email: values.email,
          password: values.password,
        })
          .then(() => {
            return router.setParams({ screen: "signin" });
          })
          .finally(() => {
            setLoading(false);
          });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark
          ? Colors.dark.background
          : Colors.light.background,
        paddingHorizontal: Sizes.padding.medium,
      }}
    >
      <View style={{}}>
        <Text
          style={{
            color: dark ? Colors.dark.text : Colors.light.text,
            fontSize: Sizes.font.xlarge * 1.3,
            fontFamily: Fonts.SemiBold,
          }}
        >
          {screen === "signin" ? "Sign In" : "Sign Up"}
        </Text>

        <Text
          style={{
            color: dark ? Colors.dark.text : Colors.light.text,
            fontSize: Sizes.font.medium,
            fontFamily: Fonts.Regular,
          }}
        >
          Add your email and password to{" "}
          {screen === "signin" ? "sign in" : "sign up"}
        </Text>
      </View>
      <View
        style={{
          marginTop: Sizes.margin.xlarge,
          gap: Sizes.margin.medium,
        }}
      >
        <View>
          <Text
            style={{
              color: dark ? Colors.dark.text : Colors.light.text,
              fontSize: Sizes.font.medium,
              fontFamily: Fonts.Regular,
            }}
          >
            Email
          </Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                selectionColor={
                  dark ? Colors.dark.primary : Colors.light.primary
                }
                onFocus={() => {
                  setEmailFocused(true);
                }}
                autoCapitalize="none"
                onBlur={() => {
                  setEmailFocused(false);
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                style={{
                  borderWidth: 1,
                  fontSize: Sizes.font.medium,
                  borderColor: emailFocused
                    ? Colors.dark.primary
                    : Colors.light.muted,
                  color: dark ? Colors.dark.text : Colors.light.text,
                  borderRadius: Sizes.radius.small,
                  padding: Sizes.padding.medium,
                  marginTop: Sizes.margin.small,
                }}
                placeholder="Your personal email or work email"
                placeholderTextColor={
                  dark ? Colors.dark.text : Colors.light.text
                }
              />
            )}
          />
          {errors.email && (
            <Text
              style={{
                marginTop: Sizes.margin.small,
                fontSize: Sizes.font.small,
                color: Colors.dark.primary,
              }}
            >
              {errors.email?.message}
            </Text>
          )}
        </View>
        <View>
          <Text
            style={{
              color: dark ? Colors.dark.text : Colors.light.text,
              fontSize: Sizes.font.medium,
              fontFamily: Fonts.Regular,
            }}
          >
            Password
          </Text>

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: Sizes.radius.small,
                  marginTop: Sizes.margin.small,
                  borderWidth: 1,
                  borderColor: passwordFocused
                    ? Colors.dark.primary
                    : Colors.light.muted,
                }}
              >
                <TextInput
                  selectionColor={
                    dark ? Colors.dark.primary : Colors.light.primary
                  }
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => {
                    setPasswordFocused(false), onBlur();
                  }}
                  value={value}
                  onChangeText={onChange}
                  style={{
                    flex: 1,
                    padding: Sizes.padding.medium,
                    fontSize: Sizes.font.medium,
                    color: dark ? Colors.dark.text : Colors.light.text,
                  }}
                  secureTextEntry={secure}
                  placeholder="Your password"
                  placeholderTextColor={
                    dark ? Colors.dark.text : Colors.light.text
                  }
                />
                <TouchableOpacity
                  onPress={() => setSecure(!secure)}
                  style={{
                    padding: Sizes.padding.small,
                  }}
                >
                  <Ionicons
                    name={secure ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={dark ? Colors.dark.muted : Colors.light.muted}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <Text
            style={{
              marginTop: Sizes.margin.small,
              fontSize: Sizes.font.small,
              color: Colors.dark.primary,
            }}
          >
            {errors.password?.message}
          </Text>
        </View>
        {/* <PrimaryButton
          loading={loading}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          // onPress={() => signInWithEmailPassword()}
          title={screen === "signin" ? "Sign In" : "Sign Up"}
          style={{
            marginTop: Sizes.margin.large,
          }}
        /> */}
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
