import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {

    const { products } = useContext(shopDataContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()

            // Filter by category
            productsCopy = productsCopy.filter((item) => category === item.category)

            // Further filter by subCategory if it exists
            if (subCategory) {
                productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            }

            // Exclude current product
            productsCopy = productsCopy.filter((item) => currentProductId !== item._id)

            setRelated(productsCopy.slice(0, 4))
        }
    }, [products, category, subCategory, currentProductId])

    if (related.length === 0) return null;

    return (
        <div className='w-full'>
            <div className='grid gap-x-6 max-md:gap-y-6 grid-cols-2 md:grid-cols-4 xl:gap-x-8'>
                {
                    related.map((item, index) => (
                        <Card
                            key={index}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            sellingPrice={item.sellingPrice}
                            image={item.image1}
                            originalPrice={item.originalPrice}
                            discount={item.discount}
                            rating={item.rating}
                            title={item.title}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProduct
