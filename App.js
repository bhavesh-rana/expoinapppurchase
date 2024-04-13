
import { LogBox, StyleSheet, View } from 'react-native';
import Test from './android/src/Test';

export default function App() {

  LogBox.ignoreAllLogs();
  return (
    <View style={styles.container}>
      <Test />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
