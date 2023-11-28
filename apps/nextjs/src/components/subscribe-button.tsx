"use client";

import React, { useState } from "react";
import { useStudentId, type StudentIdInterface } from "@/hooks/useStudentId";
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
  professionalStudent: boolean | undefined;
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
  professionalStudent,
}) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const { studentId, setStudentIdState }: StudentIdInterface = useStudentId();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
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

          if (professionalStudent === false && index === 0) {
            const price = product.prices[0];
            return (
              <Button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className="mb-4"
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            );
          }

          if (professionalStudent === true && index === 1) {
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
