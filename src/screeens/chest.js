import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

// GIFs and their corresponding titles
const gifs = [
  { src: require('../utils/assets/chest1.gif'), title: 'Butterfly' },
  { src: require('../utils/assets/chest2.gif'), title: 'Bench Press' },
  { src: require('../utils/assets/chest3.gif'), title: 'incline chest press' },
  { src: require('../utils/assets/chest4.gif'), title: 'decline chest press' },
  { src: require('../utils/assets/chest5.gif'), title: 'incline chest press' },
  { src: require('../utils/assets/chest6.gif'), title: ' cheest press' },
  { src: require('../utils/assets/chest7.gif'), title: 'chest pull over' },
];

export const Chest = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {gifs.map((item, index) => (
        <View key={index} style={styles.gifContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <WebView
            originWhitelist={['*']}
            source={{
              html: `
                <html>
                  <body style="margin:0;padding:0;">
                    <img src="${Image.resolveAssetSource(item.src).uri}" style="width:100%;height:100%;" />
                  </body>
                </html>
              `,
            }}
            style={styles.webview}
            scrollEnabled={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  gifContainer: {
    marginBottom: 30,
    width: screenWidth - 40,
    height: 280,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
    paddingTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  webview: {
    width: '100%',
    height: 250,
  },
});
