import "react-native-get-random-values";

import { v4 as uuidV4 } from "uuid";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { router } from "expo-router";
import useImage from "@/src/hook/useImage";
import { editorHTML } from "@/src/constants/Html";
import Colors from "@/src/constants/Colors";
import { Fonts } from "@/src/constants/Fonts";
import { useCreatePost } from "@/src/hook/usePost";
import AuthStorage from "@/src/services/AuthStorage";
import { CreatePostType } from "@/src/types/Post";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [editorHeight, setEditorHeight] = useState(300);
  const { mutate, isPending } = useCreatePost();

  const authStorage = new AuthStorage();

  // Rich text editor state
  const webViewRef = useRef<WebView>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHeading, setIsHeading] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [isList, setIsList] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  const { pickImage, image: coverImage, loading } = useImage();

  const handleEditorCommand = (command: any) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `executeCommand("${command}"); true;`
      );
    }

    // Toggle format states
    switch (command) {
      case "bold":
        setIsBold(!isBold);
        break;
      case "italic":
        setIsItalic(!isItalic);
        break;
      case "insertOrderedList":
      case "insertUnorderedList":
        setIsList(!isList);
        break;
    }
  };

  const handleFormatBlock = (blockType: any) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`formatBlock("${blockType}"); true;`);
    }
    // Toggle format states
    if (blockType === "<h2>") {
      setIsHeading(!isHeading);
      setIsQuote(false);
    } else if (blockType === "<blockquote>") {
      setIsQuote(!isQuote);
      setIsHeading(false);
    } else {
      setIsHeading(false);
      setIsQuote(false);
    }
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("Received message from WebView:", data);
      if (data.type === "content") {
        setHtmlContent(data.content);
        setEditorHeight(data.height);
      }
    } catch (error) {
      console.log("Error parsing WebView message:", error);
    }
  };

  const publishPost = () => {
    const postData = {
      id: uuidV4(),
      title,
      content: htmlContent,
      coverImage,
      commentCount: 0,
      voteCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: authStorage.getUser()?.uid,
    } as CreatePostType;


    mutate(postData, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  // Check if we have a valid post to publish
  const hasValidContent = () => {
    return (
      title.trim() !== "" &&
      htmlContent !== "" &&
      !htmlContent.includes("placeholder")
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="close-outline"
              size={28}
              color={Colors.light.darkGrey}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.publishButton,
              !hasValidContent() && styles.disabledButton,
            ]}
            disabled={!hasValidContent()}
            onPress={publishPost}
          >
            {isPending ? (
              <ActivityIndicator size="small" color={Colors.light.white} />
            ) : (
              <Text style={styles.publishButtonText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Cover Image Section */}
          <TouchableOpacity
            style={styles.coverImageContainer}
            onPress={pickImage}
          >
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={styles.coverImage} />
            ) : loading ? (
              <View style={styles.coverImagePlaceholder}>
                <ActivityIndicator size="small" color={Colors.light.primary} />
              </View>
            ) : (
              <>
                <View style={styles.coverImagePlaceholder}>
                  <Ionicons name="image-outline" size={32} color="#999" />
                  <Text style={styles.coverImageText}>Add a cover image</Text>
                </View>
              </>
            )}
          </TouchableOpacity>

          {/* Title Input */}
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor="#999"
            value={title}
            selectionColor={Colors.light.primary}
            onChangeText={setTitle}
            multiline
            maxLength={100}
          />

          {/* Rich Text Editor */}
          <View style={[styles.editorContainer, { height: editorHeight }]}>
            <WebView
              key={"default"}
              ref={webViewRef}
              originWhitelist={["*"]}
              source={{ html: editorHTML }}
              onMessage={handleMessage}
              scrollEnabled={false}
              hideKeyboardAccessoryView={true}
              keyboardDisplayRequiresUserAction={false}
              containerStyle={styles.webViewContainer}
            />
          </View>
        </ScrollView>

        {/* Rich Text Formatting toolbar */}
        <View style={styles.toolbar}>
          <TouchableOpacity
            style={[styles.toolbarButton, isBold && styles.activeToolbarButton]}
            onPress={() => handleEditorCommand("bold")}
          >
            <MaterialIcons
              name="format-bold"
              size={22}
              color={isBold ? Colors.light.primary : "#333"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toolbarButton,
              isItalic && styles.activeToolbarButton,
            ]}
            onPress={() => handleEditorCommand("italic")}
          >
            <MaterialIcons
              name="format-italic"
              size={22}
              color={isItalic ? Colors.light.primary : "#333"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toolbarButton,
              isHeading && styles.activeToolbarButton,
            ]}
            onPress={() => handleFormatBlock("<h2>")}
          >
            <MaterialIcons
              name="title"
              size={22}
              color={isHeading ? Colors.light.primary : "#333"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolbarButton, isList && styles.activeToolbarButton]}
            onPress={() => handleEditorCommand("insertUnorderedList")}
          >
            <MaterialIcons
              name="format-list-bulleted"
              size={22}
              color={isList ? Colors.light.primary : "#333"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toolbarButton,
              isQuote && styles.activeToolbarButton,
            ]}
            onPress={() => handleFormatBlock("<blockquote>")}
          >
            <MaterialIcons
              name="format-quote"
              size={22}
              color={isQuote ? Colors.light.primary : "#333"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => handleFormatBlock("<p>")}
          >
            <MaterialIcons name="format-clear" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  publishButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  publishButtonText: {
    color: "white",
    fontFamily: Fonts.Medium,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  coverImageContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f7f7f7",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverImagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  coverImageText: {
    marginTop: 8,
    color: "#999",
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  editorContainer: {
    borderWidth: 0,
    marginBottom: 20,
    minHeight: 300,
  },
  webViewContainer: {
    backgroundColor: "transparent",
  },
  tagsSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    marginRight: 4,
    color: "#666",
  },
  tagInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagTextInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  toolbarButton: {
    padding: 8,
    borderRadius: 4,
  },
  activeToolbarButton: {
    backgroundColor: "#e74c3c10",
  },
});
