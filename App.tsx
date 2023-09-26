import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';


const colours = (["lightseagreen", "firebrick", "lightpink", "maroon", "cornflowerblue", "burlywood", "darkslateblue", "lightcoral", "orange", "darksalmon"]);

const App = () => {
 // const [selectedColour, setSelectedColour] = useState("");
  const [colourList , setColourList] = useState<string[]>([]);
  const [historyHigh, setHistoryHigh] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(colourList.length);
  
  //calculate highest number of colours rendered and current number of colours
  useEffect(() => {
    setCurrentNumber(colourList.length);
    if (colourList.length > historyHigh) {
      setHistoryHigh(colourList.length);
    }
  }, [colourList]);

  //render random colors from the array of colors
  const handlePress = () => {
    const randomColour = Math.floor(Math.random() * colours.length);
    setColourList([...colourList, colours[randomColour]]);
  };

  //remove the last color that been pushed
  const handleRemove = () => {
    setColourList(colourList.slice(0, -1));
  };

  //Alert the colour name after the user selects the colour bar
  const handleColourBarPress = (colour: string) => {
    Alert.alert(
      'Colour',
      `This is ${colour} colour`,
    );
  };

  return (
      //main screen with colours
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.colourList}>
        {colourList.map((colour, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colourBox, { backgroundColor: colour }]}
            onPress={() => handleColourBarPress(colour)}>
            <Text style={styles.buttonText}>{colour}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* current number and highest number of view */}
      <View style={styles.textContainer}>
        <Text style={styles.textSpace}>Current : {currentNumber} item</Text>
        <Text style={styles.textSpace}>Largest : {historyHigh} item</Text>
      </View>

      {/* buttons handler view */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.colourBox3, { backgroundColor: 'lightcoral' }]}
            onPress={handleRemove} disabled={!colourList.length}>
            <Text style={styles.buttonText2}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.colourBox2, { backgroundColor: 'lightgreen' }]}
            onPress={handlePress}>
            <Text style={styles.buttonText2}>Push</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  buttonText: {
    marginVertical: 40,
    marginLeft:160,
    fontWeight:'bold',
    fontSize:14,
    color:'#ffffff'
  },
  buttonText2: {
    marginVertical: 40,
    marginLeft:80,
    fontWeight:'bold',
    fontSize:18,
    color:'#ffffff',
    fontStyle:'italic'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpace: {
    marginHorizontal: 15
  },
  textSpace: {
    marginHorizontal: 25,
    fontSize:18,
    fontWeight:'bold',
    fontStyle:'italic'
  },
  textSpace2: {
    fontSize:18,
    fontWeight:'bold'
  },
  colourList: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  colourBox: {
    width: 500,
    height: 100,
    marginVertical: 1,
  },
  colourBox2: {
    width: 200,
    height: 100,
    marginVertical: 1,
  },
  colourBox3: {
    width: 200,
    height: 100,
    marginVertical: 1,
  },
});