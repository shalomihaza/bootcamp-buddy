import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Sizes } from "@/src/constants/Sizes";
import { useSearchParams } from "expo-router/build/hooks";
import { useGetPostById } from "@/src/hook/usePost";
import Colors from "@/src/constants/Colors";
import { Fonts } from "@/src/constants/Fonts";
import { formatDistanceToNow } from "date-fns";
import WebView from "react-native-webview";
import { getFullViewHTML, getPreviewHTML } from "@/src/constants/Html";
import RichTextContent from "@/src/components/RichTextContent";

const PostDetail = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const { data, isFetching } = useGetPostById(postId!);

  if (isFetching || !data) {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Sizes.padding.small,
        backgroundColor:Colors.light.white,
        paddingHorizontal: Sizes.padding.medium,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: Sizes.margin.small,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: data?.user.avatar,
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Medium,
              fontSize: Sizes.font.medium,
            }}
          >
            {data?.user.fullName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Regular,
                fontSize: Sizes.font.small,
              }}
            >
              r/Blog
            </Text>
            <Text style={{
              fontFamily: Fonts.Regular,
              fontSize: Sizes.font.small,
              color: Colors.light.darkGrey,
            }}> {formatDistanceToNow(new Date(data?.createdAt!))}</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        {/* Title */}
        <Text style={styles.postTitle}>{data.title}</Text>

        {/* Image (if present) */}
        {data?.coverImage && (
          <Image
            source={{ uri: data.coverImage }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}

        {/* Rich Text Content */}
        {data.content ? (
          <RichTextContent content={data.content} />
        ) : (
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: Sizes.font.small,
              color: Colors.light.text,
            }}
          >
            Content not available.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  postTitle: {
    fontSize: Sizes.font.large,
    fontFamily: Fonts.Medium,
    marginVertical: 8,
    color: Colors.light.text,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
  richTextContainer: {
    marginBottom: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  richTextWebView: {
    backgroundColor: "transparent",
  },
});
