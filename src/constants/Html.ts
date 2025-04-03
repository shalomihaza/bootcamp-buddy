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
        
        // Add placeholder on empty content
        editor.addEventListener('blur', function() {
          if (editor.innerHTML === '' || editor.innerHTML === '<br>') {
            editor.innerHTML = '<span class="placeholder">Tell your story...</span>';
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
          timeout = setTimeout(updateContent, 250);
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
            
            /* Hide overflow content with fade effect */
            .content-container {
              position: relative;
              max-height: 80px;
              background-color: red
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
