import React, { useCallback } from 'react'
import { Text, View, Image } from 'react-native'
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useColorScheme, } from 'nativewind';
import { useAppDispatch } from '../store';
import { decreaseQuantity, ICartProduct, increaseQuantity } from '../store/reducer';

const CartItem = (props: ICartProduct) => {
    // ** Hooks 
    const { colorScheme } = useColorScheme()
    const dispatch = useAppDispatch()

    // ** Handler Functions
    const handleIncreaseFromStore = useCallback(() => {
        dispatch(increaseQuantity({ id: props.product.id }))
    }, [])
    const handleDecreaseFromStore = useCallback(() => {
        dispatch(decreaseQuantity({ id: props.product.id }))
    }, [])
    return (
        <View
            className='flex-row my-2   border-b-2 border-b-slate-200 py-2' >
            <View className=' basis-4/12 ' >
                <Image source={{ uri: props.product.image }} className=' w-full   h-24 ' resizeMode='contain' />
            </View>
            <View className='basis-8/12 pl-3 flex-col justify-between'>
                <Text className=' text-md font-bold dark:text-white'> {props.product.title}</Text>
                <View className='flex-row justify-between  pl-3 pr-5 '>
                    <View className='flex-row align-center gap-3 '>
                        <AntDesign className='rounded-full' onPress={handleDecreaseFromStore} name="minuscircleo" size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
                        <Text className='font-bold text-xl dark:text-white'>{props.quantity}</Text>
                        <AntDesign onPress={handleIncreaseFromStore} name="pluscircleo" size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
                    </View>
                    <View>
                        <Text className=' font-bold text-xl dark:text-white'>{(props.product.price * props.quantity).toFixed(2)} $ </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartItem