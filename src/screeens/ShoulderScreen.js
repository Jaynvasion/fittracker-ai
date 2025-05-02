import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

// GIFs and their corresponding titles
const gifs = [
  { src: require('../utils/assets/shoulder.gif'), title: 'Dumbbell shoulder press' },
  { src: require('../utils/assets/shoulder2.gif'), title: 'Seated dumbbell press' },
  { src: require('../utils/assets/shoulder3.gif'), title: 'Machine shoulder press' },
  { src: require('../utils/assets/shoulder4.gif'), title: 'Barbell front raise' },
  { src: require('../utils/assets/shoulder5.gif'), title: 'Dumbbell lateral raise' },
  { src: require('../utils/assets/shoulder6.gif'), title: 'Face pull over' },
];

export const ShoulderScreen = () => {
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
