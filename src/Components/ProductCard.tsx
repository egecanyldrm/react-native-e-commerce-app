import React, { useCallback, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useColorScheme, } from 'nativewind';
import { TypeOfProduct } from '../products';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/reducer';
import Toast from 'react-native-toast-message';

const ProductCard = (props: TypeOfProduct) => {
    const { image, title, description, category, price } = props;
    const { colorScheme } = useColorScheme();

    // ** States 
    const [count, setCount] = useState<number>(0)

    // ** Store 
    const dispatch = useAppDispatch();

    // ** Handler Functions 
    const handleIncrease = useCallback(() => {
        setCount((prevState) => prevState + 1)
    }, [])
    const handleDecrease = useCallback(() => {
        setCount(prevState => prevState > 0 ? prevState - 1 : prevState)
    }, [])

    const addProductToCart = useCallback(() => {
        if (count === 0) return Toast.show({ type: 'error', text1: 'Increase product count!' })
        dispatch(addToCart({ product: props, quantity: count }))
    }, [count])

    return (
        <View className='bg-white dark:bg-gray-50/10 my-4 mx-4 px-5  rounded-2xl   '>
            <View className="bg-white rounded-lg">
                <Image source={{ uri: image }} className='w-full h-52' resizeMode='contain' />
            </View>
            <View className='my-2'>
                <Text className=" text-black/70  dark:text-white font-semibold text-md" > {category}</Text>
                <Text className='text-lg dark:text-white font-bold'> {title}</Text>
            </View>
            <View className='flex-row justify-between px-1 my-2'>
                <View className='flex-row align-center gap-3'>
                    <AntDesign onPress={handleDecrease} name="minuscircleo" size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
                    <Text className='font-bold text-xl dark:text-white'>{count}</Text>
                    <AntDesign onPress={handleIncrease} name="pluscircleo" size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
                </View>
                <Text className=" text-2xl font-extrabold dark:text-white ">${count > 0 ? (count * price).toFixed(2) : price}</Text>
            </View>
            <Text numberOfLines={3} className='text-sm text-black/60 dark:text-white' >{description}</Text>
            <TouchableOpacity onPress={addProductToCart} className='p-4  bg-black dark:bg-white  rounded-full my-3 '>
                <Text className='text-white dark:text-black text-center  font-bold'>Add To Card</Text>
            </TouchableOpacity>
        </View >
    )
}

export default ProductCard