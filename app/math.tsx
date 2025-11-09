import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MathScreen() {
  const equacoes = ["10x^2 - 4x + 2 = 0", "log(3x + 1) = 5"];

  const htmlContent = equacoes.map(eq => `
    <p style="font-size:20px;">\\(${eq}\\)</p>
  `).join('');

  const html = `
    <html>
      <head>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js"></script>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
