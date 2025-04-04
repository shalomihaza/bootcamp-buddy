import { useTheme } from "@/src/components/context/Theme";
import Colors from "@/src/constants/Colors";
import { Fonts } from "@/src/constants/Fonts";
import { Sizes } from "@/src/constants/Sizes";
import { accountSetupSchema } from "@/src/services/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useImage from "@/src/hook/useImage";
import { useUpdateUser } from "@/src/hook/useUser";
import { z } from "zod";
import { auth } from "@/src/services/firebase";
import UserService from "@/src/services/UserService";

const AccountSetUp = () => {

  const { dark } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const [emailFocused, setEmailFocused] = useState(false);
  const { image, pickImage, loading } = useImage();
  const { mutate, isPending } = useUpdateUser();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(accountSetupSchema),
    defaultValues: {
      fullName: "",
      image: "",
      role: "instructor",
    },
  });

  useEffect(() => {
    if (image) {
      setValue("image", image);
    }
  }, [image]);

  const onSubmit = async (values: z.infer<typeof accountSetupSchema>) => {
    console.log(values);
    mutate({
      avatar: values.image,
      fullName: values.fullName,
      role: values.role,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: bottom,
        paddingHorizontal: Sizes.padding.medium,
      }}
    >
      <View style={{ flex: 2 }}>
        <View
          style={{
            marginTop: Sizes.margin.medium,
            gap: Sizes.padding.small,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.SemiBold,
              fontSize: Sizes.font.large,
            }}
          >
            Create Your Profile
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: Sizes.font.medium,
              color: Colors.light.darkGrey,
            }}
          >
            Congratulations on taking the first step towards feeling more
            organized!
          </Text>
        </View>

        <View
          style={{
            marginTop: Sizes.margin.large,
            borderColor: Colors.light.grey,
            borderRadius: Sizes.radius.medium,
            borderWidth: 1,
            padding: Sizes.padding.medium,
          }}
        >
          <View
            style={{
              height: 250,
              width: "100%",
              gap: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 150,
                    backgroundColor: image
                      ? Colors.light.white
                      : Colors.light.grey,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.light.primary} />
                  ) : image ? (
                    <Image
                      source={{ uri: image }}
                      alt="Upload"
                      style={{
                        borderRadius: 70,
                        height: 140,
                        width: 140,
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/images/upload.png")}
                      alt="Upload"
                      style={{
                        height: 100,
                        width: 100,
                      }}
                    />
                  )}
                </View>
              )}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={{
                padding: Sizes.padding.medium,
                borderRadius: Sizes.padding.large,
                borderWidth: 1,
                borderColor: Colors.light.primary,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.Medium,
                  fontSize: Sizes.font.medium,
                  color: Colors.light.primary,
                }}
              >
                Upload Photo
              </Text>
            </TouchableOpacity>
            {errors.image && (
              <Text
                style={{
                  marginTop: Sizes.margin.small,
                  fontSize: Sizes.font.small,
                  color: Colors.dark.primary,
                }}
              >
                {errors.image?.message}
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
              Fullname
            </Text>
            <Controller
              name="fullName"
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
                  keyboardType="default"
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
                  placeholder="e.g Adediji Abdulquadri"
                  placeholderTextColor={
                    dark ? Colors.dark.grey : Colors.light.darkGrey
                  }
                />
              )}
            />
            {errors.fullName && (
              <Text
                style={{
                  marginTop: Sizes.margin.small,
                  fontSize: Sizes.font.small,
                  color: Colors.dark.primary,
                }}
              >
                {errors.fullName?.message}
              </Text>
            )}
          </View>
          <View
            style={{
              marginTop: Sizes.margin.medium,
            }}
          >
            <Text
              style={{
                color: dark ? Colors.dark.text : Colors.light.text,
                fontSize: Sizes.font.medium,
                fontFamily: Fonts.Regular,
              }}
            >
              Who are you?
            </Text>
            <Controller
              name="role"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    gap: Sizes.margin.large,
                  }}
                >
                  <Pressable
                    onPress={() => onChange("instructor")}
                    style={{
                      flexDirection: "row",
                      gap: Sizes.margin.small,
                      marginTop: Sizes.margin.medium,
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          borderColor: Colors.light.primary,
                          borderWidth: 1,
                          padding: 2,
                          height: 16,
                          width: 16,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "100%",
                        }}
                      >
                        {value === "instructor" && (
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 7,
                              backgroundColor: Colors.light.primary,
                            }}
                          />
                        )}
                      </View>
                    </View>
                    <Text
                      style={{
                        fontFamily: Fonts.Regular,
                        fontSize: Sizes.font.medium,
                      }}
                    >
                      As Instructor
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => onChange("student")}
                    style={{
                      flexDirection: "row",
                      gap: Sizes.margin.small,
                      marginTop: Sizes.margin.medium,
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          borderColor: Colors.light.primary,
                          borderWidth: 1,
                          padding: 2,
                          height: 16,
                          width: 16,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "100%",
                        }}
                      >
                        {value === "student" && (
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 7,
                              backgroundColor: Colors.light.primary,
                            }}
                          />
                        )}
                      </View>
                    </View>
                    <Text
                      style={{
                        fontFamily: Fonts.Regular,
                        fontSize: Sizes.font.medium,
                      }}
                    >
                      As Student
                    </Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          marginBottom: Sizes.margin.medium,
        }}
      >
        <PrimaryButton
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
          title="Complete Setup"
        />
      </View>
    </View>
  );
};

export default AccountSetUp;
