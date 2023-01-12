import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { Modal, Pressable, SafeAreaView, Switch, View } from 'react-native';
import ProductList from './Components/ProductList';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useCallback, useState } from 'react';
import Cart from './Components/Cart';

export default function App() {

  // ** States & Hooks 
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // ** Handler Functions 
  const toggleModal = useCallback(() => { setModalVisible(prevState => !prevState) }, [])

  return (
    <SafeAreaView className="flex-1 align-center justify-center bg-gray-200 dark:bg-black/90 ">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View className='flex-row  items-center  '>
        <View className=' flex-row   basis-10/12 justify-center pl-16'>
          <Feather name='sun' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
          <Switch className='mx-4' value={colorScheme === 'dark'} onChange={toggleColorScheme} />
          <Feather name='moon' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </View>
        <View className="basis-2/12 h-12 flex-row items-center" >
          <Pressable onPress={toggleModal} hitSlop={{ bottom: 40, top: 40, left: 40, right: 40 }} >
            <FontAwesome name='shopping-basket' size={28} color={colorScheme === 'dark' ? 'white' : 'black'} />
          </Pressable>
        </View>
      </View>
      <ProductList />
      <Modal animationType="slide" visible={modalVisible}>
        <Cart toggleModal={toggleModal} />
      </Modal>
    </SafeAreaView>
  );
}


