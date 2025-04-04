import { View, Text, ScrollView } from "react-native";
import React from "react";
import SkeletonLoader from "./Skeleton";
import { Sizes } from "../constants/Sizes";

const PostLoader = () => {
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          marginTop: Sizes.margin.small,
          gap: Sizes.margin.small,
          paddingHorizontal: Sizes.padding.medium,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {[...Array(5)].map((item, index) => (
          <View
            key={index}
            style={{
              gap: Sizes.margin.small,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <SkeletonLoader height={25} width={25} borderRadius={13} />
              <SkeletonLoader height={25} width={140} borderRadius={13} />
              <SkeletonLoader height={25} width={140} borderRadius={13} />
            </View>

            <SkeletonLoader
              height={50}
              width={Sizes.width - Sizes.padding.medium * 2}
              borderRadius={13}
            />
            <SkeletonLoader
              height={100}
              width={Sizes.width - Sizes.padding.medium * 2}
              borderRadius={13}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PostLoader;
