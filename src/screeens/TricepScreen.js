



import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

// GIFs and their corresponding titles
const gifs = [
  { src: require('../utils/assets/t1.gif'), title: 'EZ bar skullcrusher' },
  { src: require('../utils/assets/t2.gif'), title: 'Close grip bench press' },
  { src: require('../utils/assets/t3.gif'), title: 'Decline Press' },
  { src: require('../utils/assets/t4.gif'), title: 'Overhead tricep extension' },
  { src: require('../utils/assets/t5.gif'), title: 'Dips' },
  { src: require('../utils/assets/t6.gif'), title: 'Diamond pushup' },
  { src: require('../utils/assets/t7.gif'), title: 'Cable triceps pushaway' },
];

export const TricepScreen = () => {
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

