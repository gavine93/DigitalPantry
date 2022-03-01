import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingScreen from './ShoppingScreen';
import ListAddScreen from './ListAddScreen';
import ListEditDeleteScreen from './ListEditDeleteScreen';

const ListStack = createNativeStackNavigator();

const ListStackNav = () => { //navigator for list related screens
  return (
    <ListStack.Navigator initialRouteName="ShoppingScreen">
      <ListStack.Screen name="ShoppingScreen" component={ShoppingScreen} />
      <ListStack.Screen name="ListAddScreen" component={ListAddScreen} />
      <ListStack.Screen name="ListEditDeleteScreen" component={ListEditDeleteScreen} />
    </ListStack.Navigator>
  );
}

export default ListStackNav;