import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { useTheme } from "../../components/context/Theme";
import { Sizes } from "../../constants/Sizes";
import { Onboarding } from "../../constants/Data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Fonts } from "../../constants/Fonts";
import { Google } from "../../constants/Images";
import { Link, router } from "expo-router";
import { signInWithGoogle } from "../../services/auth";
// import {
//   Trigger,
//   Content,
//   Item,
//   ItemIcon,
//   Root,
//   ItemTitle,
// } from "zeego/dropdown-menu";

const OnboardingScreen = () => {
  const { dark } = useTheme();

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Function to update current index when scrolling
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  };
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < Onboarding.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      } else {
        flatListRef.current?.scrollToIndex({ index: 0, animated: true });
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark
          ? Colors.dark.background
          : Colors.light.background,
      }}
    >
      <View
        style={{
          marginTop: Sizes.padding.xlarge * 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={Onboarding}
          horizontal
          ref={flatListRef}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                // flex:1,
                alignItems: "center",
                padding: Sizes.padding.medium,
                width: Sizes.width,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: Sizes.width * 0.8,
                  height: Sizes.height * 0.3,
                  resizeMode: "cover",
                }}
              />
              <Text
                style={{
                  color: dark ? Colors.dark.text : Colors.light.text,
                  fontSize: Sizes.font.xlarge,
                  fontFamily: Fonts.Bold,
                  textAlign: "center",
                  marginTop: Sizes.margin.medium,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: dark ? Colors.dark.text : Colors.light.text,
                  fontSize: Sizes.font.medium,
                  fontFamily: Fonts.Regular,
                  textAlign: "center",
                  marginTop: Sizes.margin.small,
                }}
              >
                {item.description}
              </Text>
            </View>
          )}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {Onboarding.map((_, index) => (
            <View
              key={index}
              style={{
                backgroundColor:
                  currentIndex === index
                    ? Colors.light.primary
                    : Colors.light.muted,
                width: currentIndex === index ? 10 : 8,
                height: currentIndex === index ? 10 : 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          gap: Sizes.margin.medium,
          paddingBottom: Sizes.margin.medium,
        }}
      >
        <TouchableOpacity
          onPress={() => signInWithGoogle()}
          style={{
            borderWidth: 1,
            borderColor: Colors.dark.muted,
            padding: Sizes.padding.medium,
            borderRadius: Sizes.radius.xlarge,
            marginHorizontal: Sizes.margin.medium,
            flexDirection: "row",
            alignItems: "center",
            gap: Sizes.margin.small,
            justifyContent: "center",
          }}
        >
          <Image
            source={Google}
            style={{
              width: Sizes.icon.medium,
              height: Sizes.icon.medium,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: dark ? Colors.dark.text : Colors.light.text,
              fontSize: Sizes.font.medium,
              fontFamily: Fonts.Medium,
            }}
          >
            Continue with google
          </Text>
        </TouchableOpacity>
        {/* <Root>
          <Trigger>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: Colors.dark.muted,
                padding: Sizes.padding.medium,
                borderRadius: Sizes.radius.xlarge,
                marginHorizontal: Sizes.margin.medium,
                flexDirection: "row",
                alignItems: "center",
                gap: Sizes.margin.small,
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="mail"
                size={24}
                color={dark ? Colors.dark.text : Colors.light.text}
              />
              <Text
                style={{
                  color: dark ? Colors.dark.text : Colors.light.text,
                  fontSize: Sizes.font.medium,
                  fontFamily: Fonts.Medium,
                }}
              >
                Continue with Email
              </Text>
            </TouchableOpacity>
          </Trigger>
          <Content
            style={{
              width: Sizes.width * 0.8,
            }}
          >
            <Item
              onSelect={() => {
                router.push("/(auth)/sign-in");
                router.setParams({ screen: "signin" });
              }}
              key="SignIn"
            >
              <ItemTitle
                style={{
                  fontFamily: Fonts.Medium,
                }}
              >
                Login with Email
              </ItemTitle>
              <ItemIcon
                ios={{
                  name: "pencil",
                  pointSize: 20,
                  weight: "bold",
                }}
                // androidIconName="edit_text"
              />
            </Item>
            <Item
              onSelect={() => {
                router.push("/(auth)/sign-in");
                router.setParams({ screen: "signup" });
              }}
              key="SignUp"
            >
              <ItemIcon
                ios={{
                  name: "envelope",
                  pointSize: 20,
                }}
              />
              <ItemTitle
                style={{
                  fontFamily: Fonts.Medium,
                }}
              >
                SignUp with Email
              </ItemTitle>
            </Item>
          </Content>
        </Root> */}
        <Text
          style={{
            color: dark ? Colors.dark.text : Colors.light.text,
            fontSize: Sizes.font.small,
            padding: Sizes.padding.medium,
            fontFamily: Fonts.Regular,
            textAlign: "center",
          }}
        >
          By continuing, you agree to our{" "}
          <Link
            href={"/"}
            style={{
              textDecorationLine: "underline",
              color: dark ? Colors.dark.text : Colors.light.text,
            }}
          >
            Terms of Service
          </Link>{" "}
          and Privacy Policy
          <Link
            href={"/"}
            style={{
              textDecorationLine: "underline",
              color: dark ? Colors.dark.text : Colors.light.text,
            }}
          >
            Privacy Policy
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
