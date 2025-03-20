import { Dimensions } from "react-native";

export const Sizes = {
  // Font Sizes
  font: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },

  // Padding Sizes
  padding: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },

  // Margin Sizes
  margin: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },

  // Icon Sizes
  icon: {
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 40,
  },

  //   // Border Radius
  radius: {
    small: 10,
    medium: 16,
    large: 20,
    xlarge: 24,
  },

  // Screen Sizes
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
