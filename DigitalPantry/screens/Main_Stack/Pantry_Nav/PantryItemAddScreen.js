import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Avatar, Button } from 'react-native-paper';
import { fetch_upc } from '../../../API/barcodeSpider';
import LoadingScreen from '../LoadingScreen';

const PantryItemAddScreen = ({ route, navigation }) => {

  const[name, setName] = React.useState("Unknown");
  const[key, setKey] =  React.useState("Unknown");
  const[unit, setUnit] =  React.useState("Unknown");
  const[amount, setAmount] =  React.useState("Unknown");
  const[imgURI, setImgURI] =  React.useState("Unknown");
  const[brand, setBrand] = React.useState("Unknown");
  const[desc, setDesc] = React.useState("Unknown");
  const[percentage, setPercentage] = React.useState("100");
  const[isLoaded, setIsLoaded] = React.useState(false);

  //Did mount:
  React.useEffect(() => {
    //Handle incoming data (either new data or edited data.)
    if(route.params !== undefined) {
      let { upc } = route.params; //Get data from route;

      //Connect to API here!
      fetch_upc(upc).then((itemAPIData) => {
 
        //Record data.
        setName(itemAPIData["item_attributes"].title);
        setKey(upc);
        setUnit("NA");
        setAmount("NA");
        setImgURI(itemAPIData["item_attributes"].image);
        if(itemAPIData["item_attributes"].brand !== "") setBrand(itemAPIData["item_attributes"].brand);
        if(itemAPIData["item_attributes"].description !== "") setDesc(itemAPIData["item_attributes"].description);
        setIsLoaded(true);
      });
    }
  }, []);

  //Handlers for navigating:
  const donePressHandler = () => {

    //Create new Item data.
    let data = {
      name: name,
      key: key,
      unit: unit,
      amount: amount,
      image: imgURI,
      brand: brand,
      description: desc,
      percentage: percentage
    }

    //Pass data as item.
    navigation.navigate('PantryScreen', {item:data});
  }

  const morePressHandler = () => {
    navigation.navigate('BarcodeScreen');
  }

  if (isLoaded) {
    return (
      <View style={styles.container}>
        <Avatar.Image size={128} style={{ alignSelf: 'center', marginBottom: 10 }} source={{uri:imgURI}} />
        {/*Container for text inputs*/}
        <View style={{ justifyContent: 'space-evenly' }}>
          <TextInput
            label="Add Item Name"
            defaultValue={name}
            onChangeText={name => setName(name)}
          />
          <TextInput
            label="Quantity"
            defaultValue={amount}
            onChangeText={amount => setAmount(amount)}
          />
          <TextInput
            label="Unit(s)"
            defaultValue={unit}
            onChangeText={unit => setUnit(unit)}
          />
        </View>
  
        {/*Container for buttons*/}
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Button icon="check" mode="contained" onPress={() => donePressHandler()}>
              Done
            </Button>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Button icon="camera" mode="contained" onPress={() => morePressHandler()}>
              Re-Scan
            </Button>
          </View>
        </View>
      </View>
    );
  }
  else {
    return(<LoadingScreen/>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },

  });

export default PantryItemAddScreen;