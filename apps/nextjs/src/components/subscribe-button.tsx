"use client";

import React, { useState } from "react";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import type { Price, ProductWithPrice } from "@/types";
import { BounceLoader } from "react-spinners";

// import { toast } from "react-hot-toast";

import { Button } from "@acme/ui";

interface SubscribeModalProps {
  products: ProductWithPrice[];
  swimmerLevel: string;
  studentIdStripe: string;
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeButton: React.FC<SubscribeModalProps> = ({
  products,
  swimmerLevel,
  studentIdStripe,
}) => {
  const { user, isLoading, subscription } = useUser();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price, studentIdStripe },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  return (
    <>
      <div>
        {/* <BounceLoader color="#22c55e" size={40} /> */}
        {products.map((product, index) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }

          if (swimmerLevel === "beginner" && index === 0) {
            const price = product.prices[0];
            return (
              <Button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className="mb-4"
              >
                {`Subscribe ${formatPrice(price)} a ${price.interval}`}
              </Button>
            );
          }

          if (
            (swimmerLevel === "pro" && index === 1) ||
            (swimmerLevel === "advanced" && index === 1)
          ) {
            const price = product.prices[0];
            return (
              <Button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className="mb-4"
              >
                {`Subscribe ${formatPrice(price)} a ${price.interval}`}
              </Button>
            );
          }

          return null;
        })}
      </div>
    </>
  );
};

export default SubscribeButton;
