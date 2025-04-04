export const editorHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 8px;
          font-size: 16px;
          line-height: 1.5;
          color: #333;
          min-height: 100%;
        }
        
        #editor {
          outline: none;
          width: 100%;
          min-height: 250px;
        }
        
        blockquote {
          border-left: 3px solid #ccc;
          margin-left: 5px;
          padding-left: 15px;
          color: #666;
        }
        
        h2 {
          font-size: 22px;
          font-weight: bold;
          margin: 10px 0;
        }
        
        ul, ol {
          margin-left: 15px;
        }
        
        /* Placeholder styles */
        .placeholder {
          color: #aaa;
        }
      </style>
    </head>
    <body>
      <div id="editor" contenteditable="true"></div>
      <script>
        // Initialize
        const editor = document.getElementById('editor');
        
        // Setup placeholder
        editor.innerHTML = '<span class="placeholder">Contribute to worlds knowledge...</span>';
        
        // Remove placeholder on focus
        editor.addEventListener('focus', function() {
          if (editor.innerHTML.includes('placeholder')) {
            editor.innerHTML = '';
          }
        });
        
        
        // Update content and height when changed
        function updateContent() {
          const height = Math.max(document.body.scrollHeight, 300);
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'content',
            content: editor.innerHTML,
            height: height
          }));
        }
        
        // Debounce function to avoid too many updates
        let timeout;
        editor.addEventListener('input', function() {
          clearTimeout(timeout);
          timeout = setTimeout(updateContent, 100);
        });
        
        // Commands from React Native
        window.executeCommand = function(command) {
          document.execCommand(command, false, null);
          updateContent();
        };
        
        window.formatBlock = function(blockType) {
          document.execCommand('formatBlock', false, blockType);
          updateContent();
        };
        
        window.insertImage = function(url) {
          document.execCommand('insertImage', false, url);
          updateContent();
        };
        
        // Initial height update
        setTimeout(updateContent, 100);
      </script>
    </body>
    </html>
  `;

export const getPreviewHTML = (content: string) => {
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
              overflow: hidden;
            }
            p { margin: 0 0 8px 0; }
            h2 { font-size: 16px; margin: 0 0 8px 0; }
            blockquote {
              border-left: 3px solid #ccc;
              margin-left: 0;
              margin-right: 0;
              padding-left: 8px;
              color: #666;
            }
            ul, ol { margin: 0 0 8px 16px; padding: 0; }
            li { margin-bottom: 4px; }
            a { color: #0079d3; text-decoration: none; }
            img { max-width: 100%; height: auto; }
            
          .content-container {
            position: relative;
            max-height: 80px;
            overflow: hidden;
          }
          .content-container::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(transparent, white);
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

export const getFullViewHTML = (content: string) => {
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
