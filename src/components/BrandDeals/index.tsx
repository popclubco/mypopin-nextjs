'use client'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Manrope } from 'next/font/google'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation'

const manrope = Manrope({
    subsets: ['latin'],
    weight: ['400', '700']
})

interface IBrandDeals {
    secondaryColor: string
    textColor: string
    discountPercentage: any
}

function BrandDeals({ secondaryColor, textColor, discountPercentage }: IBrandDeals) {
    const [productImagesData, setProductImagesData] = useState<any>();
    const router = useRouter()
    const pathname = usePathname()
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        fetch(`https://mypop-dashboard.popclub.co.in/api/new-product-images?filters[storeuuid][$eq]=${pathname.split("/")[2]}`).then((res) => res.json()).then((data) => setProductImagesData(data?.data))
    }, [])

    const handleProductLink = (itm: any) => {
        router.push(`${itm?.attributes?.product_link}`)
        console.log(itm?.attributes?.product_link)
    }

    console.log({ productImagesData })

    // let productDiscountPercentage
    // if (originalPrice) {
    //     productDiscountPercentage = (Math.floor((originalPrice - mrp - burnCoins) / originalPrice)).toString()
    // }
    // else {
    //     productDiscountPercentage = (Math.floor(((burnCoins / mrp) * 100))).toString()
    // }

    return (
        <>
            <div>
                <div className={`uppercase text-3xl text-center font-bold py-16`}>EXPLORE UNLIMITED DEALS</div>
                <div style={{ width: "100%" }}>
                    <Carousel
                        arrows={false}
                        autoPlay={true}
                        autoPlaySpeed={1800}
                        centerMode={false}
                        //   className=""
                        //   containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite={true}
                        itemClass="unlimiteddeals-item-class"
                        //   keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={responsive}
                        swipeable={true}
                    >
                        {/* //mapping */}
                        {productImagesData?.length > 0 && productImagesData?.map((itm: any, index: number) => (
                            <div key={index}>
                                <div onClick={() => handleProductLink(itm)} className="grid w-full justify-center justify-items-center">
                                    <div className="relative w-[266px] h-[276px] z-10 flex items-center justify-center">
                                        <img
                                            src={itm?.attributes?.product_image}
                                            alt="hgfd"
                                            className="h-[276px] w-[266px] object-cover rounded-3xl"
                                        />
                                        {discountPercentage === "-Infinity" ?
                                            <div>{null}</div> :
                                            <div style={{ backgroundColor: "black" }} className={`absolute top-8 right-0 p-2 pl-4 bg-red-500 text-white text-2xl ${manrope.className} font-bold rounded-l-full`}>
                                                {itm?.attributes?.product_mrp === null ?

                                                    (<div>

                                                        {(Math.trunc((((itm?.attributes?.product_price * discountPercentage) / itm?.attributes?.product_price)))).toString()}%

                                                    </div>)
                                                    : <div>
                                                       

                                                        {Math.trunc((((itm?.attributes?.product_mrp - itm?.attributes?.product_price) + (itm?.attributes?.product_price * discountPercentage / 100)) / itm?.attributes?.product_mrp) * 100)}%
                                                    </div>}
                                            </div>}
                                    </div>
                                    <div style={{ backgroundColor: secondaryColor, transform: "translateY(-8%)" }} className={`w-11/12 rounded-bl-3xl rounded-br-3xl font-bold ${manrope.className} z-5`}>
                                        <div className="text-center pt-3">{itm?.attributes?.product_name.slice(0, 20) + ".."}</div>
                                        <div className="text-center py-1">₹{itm?.attributes?.product_price}&nbsp;<span style={{ textDecoration: "line-through", color: "gray" }}>{itm?.attributes?.product_mrp ? <span> ₹{itm?.attributes?.product_mrp}</span> : null}  </span></div>
                                        <div className="flex items-center justify-center py-3">
                                            <div>or &nbsp;</div>
                                            <div>₹ {Math.trunc(itm?.attributes?.product_price - ((itm?.attributes?.product_price * discountPercentage) / 100))}</div>
                                            <div>+&nbsp;</div>
                                            <img width="20" height="20" src="/popcoin-icon.svg" />
                                            <div>{Math.trunc(itm?.attributes?.product_price * discountPercentage / 100)}</div>
                                        </div>
                                        {/* <div className="text-center pb-3">or ₹ {itm?.attributes?.price_with_coin}+ {itm?.attributes?.burn_coin}</div> */}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export { BrandDeals }