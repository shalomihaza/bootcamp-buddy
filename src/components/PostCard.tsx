import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { Sizes } from "../constants/Sizes";
import { Post } from "../types/Post";
import WebView from "react-native-webview";
import { getPreviewHTML } from "../constants/Html";
import { Ionicons } from "@expo/vector-icons";
import { formatNumber } from "../utils";
import { useDownVote, useUpVote } from "../hook/usePost";

const PostCard = ({ item }: { item: Post }) => {
  const windowDimensions = useWindowDimensions();

  const { mutate: upVoteMutate } = useUpVote();
  const { mutate: downVoteMutate } = useDownVote();

  return (
    <View style={styles.postCard}>
      {/* Vote Column */}

      {/* Content Column */}
      <View style={styles.contentColumn}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <Text style={styles.subreddit}>r/blog</Text>
          <Text style={styles.postDetails}>
            • Posted by u/{item.user?.fullName} •
            {/* {formatDistanceToNow(new Date(item.createdAt!))} */}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.postTitle}>{item.title}</Text>

        {/* Image (if present) */}
        {item.coverImage && (
          <Image
            source={{ uri: item.coverImage }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}

        {/* Rich Text Content */}
        <View
          style={{
            height: "auto",
          }}
        >
          <WebView
            originWhitelist={["*"]}
            source={{ html: getPreviewHTML(item.content) }}
            // scrollEnabled={isExpanded}
            style={[
              styles.richTextWebView,
              { width: windowDimensions.width }, // Account for vote column and padding
            ]}
          />
        </View>

        <View style={styles.postActions}>
          <View style={styles.voteColumn}>
            <TouchableOpacity onPress={() => upVoteMutate({ postId: item.id })}>
              <Ionicons name="arrow-up" size={24} color="#FF4500" />
            </TouchableOpacity>
            <Text style={styles.voteCount}>{formatNumber(item.voteCount)}</Text>
            <TouchableOpacity
              onPress={() => downVoteMutate({ postId: item.id })}
            >
              <Ionicons name="arrow-down" size={24} color="#7193FF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#878A8C" />
            <Text style={styles.actionText}>
              {formatNumber(item.commentCount)} Comments
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  postCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: Sizes.padding.medium,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  voteColumn: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 8,
  },
  voteCount: {
    fontWeight: "700",
    marginVertical: 4,
  },
  contentColumn: {
    flex: 1,
    padding: 8,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  subreddit: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1c1c1c",
  },
  postDetails: {
    fontSize: 12,
    color: "#787C7E",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#222222",
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
  collapsedRichText: {
    height: 80,
  },
  expandedRichText: {
    minHeight: 80,
    maxHeight: 400,
  },
  richTextWebView: {
    backgroundColor: "transparent",
  },
  expandButton: {
    paddingVertical: 6,
  },
  expandButtonText: {
    color: "#0079D3",
    fontWeight: "500",
    fontSize: 12,
  },
  postActions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    paddingVertical: 4,
  },
  actionText: {
    color: "#878A8C",
    fontSize: 12,
    marginLeft: 4,
  },
});
