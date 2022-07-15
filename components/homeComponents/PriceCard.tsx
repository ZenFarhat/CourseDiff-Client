import { useInView } from "framer-motion"
import Link from "next/link"
import React, { useRef } from "react"

interface PriceCardProps {
  plan: string
  price: string
  monthlyPriceText: string
  billingFrequency: string
  variant?: 1 | 2
}

const PriceCard = (props: PriceCardProps) => {
  const { plan, price, monthlyPriceText, billingFrequency, variant } = props
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  if (variant === 1) {
    return (
      <div
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-xl shadow-xl text-white md:w-2/6 flex-grow mx-2 my-2 h-fit"
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <div className="p-2 rounded-full bg-white bg-opacity-30 text-white md:w-32 text-center mb-2">
          <p className="text-xs font-bold">{plan}</p>
        </div>
        <div>
          <p className="font-bold text-3xl mb-2">{price}</p>
          <p className="font-bold text-2xl mb-2">{monthlyPriceText}</p>
          <p className="mb-2 italic">{billingFrequency}</p>
        </div>
        <Link href="/signup">
          <button className="bg-black py-2 px-5 rounded-xl ">Get Started</button>
        </Link>
      </div>
    )
  }

  if (variant === 2) {
    return (
      <div
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 rounded-xl shadow-xl text-white md:w-2/6 flex-grow mx-2 my-2 h-fit"
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateX(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <div className="p-2 rounded-full bg-white bg-opacity-30 text-white md:w-32 text-center mb-2">
          <p className="text-xs font-bold">{plan}</p>
        </div>
        <div>
          <p className="font-bold text-3xl mb-2">{price}</p>
          <p className="font-bold text-2xl mb-2">{monthlyPriceText}</p>
          <p className="mb-2 italic">{billingFrequency}</p>
        </div>
        <Link href="/signup">
          <button className="bg-black py-2 px-5 rounded-xl">Get Started</button>
        </Link>
      </div>
    )
  }

  return (
    <div
      className="bg-gray-800 p-4 rounded-xl shadow-xl text-white md:w-2/6 flex-grow mx-2 my-2 h-fit"
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      <div className="p-2 rounded-full bg-white bg-opacity-30 text-white md:w-32 text-center mb-2">
        <p className="text-xs font-bold">{plan}</p>
      </div>
      <div>
        <p className="font-bold text-3xl mb-2">{price}</p>
        <p className="font-bold text-2xl mb-2">{monthlyPriceText}</p>
        <p className="mb-2 italic">{billingFrequency}</p>
      </div>
      <Link href="/signup">
        <button className="bg-black py-2 px-5 rounded-xl ">Get Started</button>
      </Link>
    </div>
  )
}

export default PriceCard
