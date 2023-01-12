import React from 'react'
import ProductCard from './ProductCard'
import { products } from '../products'
import { FlashList } from '@shopify/flash-list'

const ProductList = () => {
    return (
        <FlashList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <ProductCard {...item} />}
            estimatedItemSize={470}
        />
    )
}

export default ProductList