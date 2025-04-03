import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  StatusBar,
} from "react-native";
import FloatingAction from "@/src/components/FloatingAction";
import { useGetPosts } from "@/src/hook/usePost";
import PostCard from "@/src/components/PostCard";

const Page = () => {
  const { data, refetch, isFetching } = useGetPosts();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList
        data={data}
        renderItem={({ item, index }) => <PostCard key={index} item={item} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />
        }
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <FloatingAction />
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 12,
  },
  createPostButton: {
    backgroundColor: "#FF4500",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingVertical: 8,
  },
  awardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    height: 8,
  },
});
