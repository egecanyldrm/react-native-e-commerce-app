import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useAppSelector } from '../store'
import CartItem from './CartItem'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from 'nativewind';

interface Props {
    toggleModal: () => void
}
const Cart = ({ toggleModal }: Props) => {
    // ** States & Hooks 
    const [total, setTotal] = useState<string>();
    const state = useAppSelector(state => state.cart.cart);
    const { colorScheme } = useColorScheme()

    // ** Side Effects 
    useEffect(() => {
        let priceTotal = 0;
        state.map(product => priceTotal += product.product.price * product.quantity)
        setTotal(priceTotal.toFixed(2))
    }, [state])



    return (
        <SafeAreaView className='flex-1  dark:bg-black/90 ' >
            <View className='border-b-2  border-gray-300 flex-row align-center  justify-between'>
                <View><Text className=' text-4xl  pl-4 py-3 dark:text-white'>Cart</Text></View>
                <TouchableOpacity className=' justify-center align-center mr-4  rounded-full'>
                    <AntDesign name='close' size={35} color={colorScheme === 'dark' ? 'white' : 'black'} onPress={toggleModal} />
                </TouchableOpacity>
            </View>
            <FlatList
                contentContainerStyle={{ flex: 3 }}
                data={state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CartItem {...item} />}
            />
            <View>
                <Text className='text-2xl font-semibold pl-4 mb-4 dark:text-white'> Total : {total} $</Text>
            </View>
        </SafeAreaView>
    )
}

export default Cart