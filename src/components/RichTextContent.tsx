import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";

const RichTextContent = ({ content }: { content: string }) => {
  const [webViewHeight, setWebViewHeight] = useState(1);
  const webViewRef = useRef(null);

  // Inject JavaScript to measure content height and communicate it back to React Native
  const injectedJavaScript = `
    function updateHeight() {
      const height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'height', height: height }));
    }
    
    // Run once when loaded
    updateHeight();
    
    // Also run on any content change or window resize
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', updateHeight);
    
    true;
  `;

  const getFullViewHTML = (content: string) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 14px;
            line-height: 1.4;
            color: #1a1a1b;
            overflow-x: hidden;
            width: 100%;
          }
          p { margin: 0 0 12px 0; }
          h2 { font-size: 18px; margin: 16px 0 8px 0; }
          h3 { font-size: 16px; margin: 14px 0 6px 0; }
          blockquote {
            border-left: 3px solid #ccc;
            margin-left: 0;
            margin-right: 0;
            padding-left: 8px;
            color: #666;
          }
          ul, ol { margin: 0 0 12px 16px; padding: 0; }
          li { margin-bottom: 4px; }
          a { color: #0079d3; text-decoration: none; }
          img { max-width: 100%; height: auto; margin: 8px 0; }
          pre {
            background-color: #f6f7f8;
            border-radius: 4px;
            padding: 8px;
            overflow-x: auto;
            margin: 12px 0;
          }
          code {
            font-family: 'Courier New', monospace;
            font-size: 13px;
            background-color: #f6f7f8;
            padding: 1px 4px;
            border-radius: 3px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 12px 0;
          }
          th, td {
            border: 1px solid #edeff1;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f6f7f8;
          }
          hr {
            border: none;
            border-top: 1px solid #edeff1;
            margin: 16px 0;
          }
          .content-container {
            padding: 8px 0;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="content-container">
          ${content}
        </div>
      </body>
      </html>
    `;
  };

  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === "height") {
        // Add a small buffer to prevent scrolling
        setWebViewHeight(message.height + (Platform.OS === "ios" ? 10 : 20));
      }
    } catch (error) {
      console.error("Error parsing WebView message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: getFullViewHTML(content) }}
        style={[styles.webView, { height: webViewHeight }]}
        scrollEnabled={false}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        automaticallyAdjustContentInsets={true}
        onError={(error) => console.log("WebView error:", error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    backgroundColor: "transparent",
  },
  webView: {
    backgroundColor: "transparent",
    width: "100%",
  },
});

export default RichTextContent;

// Usage example:
// <RichTextContent content={data.content} />
