import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import feathers from '@feathersjs/feathers';
import localstorage from 'feathers-localstorage';
import {ownnetWrapper} from '@feathersjs-offline/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

const app = feathers();

app.use('/messages', localstorage({storage: AsyncStorage}));

const messages = app.service('messages');

ownnetWrapper(app, '/messages');

messages.on('created', function (message) {
  console.log('Someone created a message', message);
});

messages.create({
  text: 'Message from React Native',
});

console.log(global.localStorage);

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.dummyText}>Create your first React Native App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '40%',
  },
  dummyText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
