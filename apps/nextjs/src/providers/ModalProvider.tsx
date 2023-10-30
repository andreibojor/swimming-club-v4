"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/auth-modal";
import SubscribeModal from "@/components/subscribe-modal";
// import UploadModal from "@/components/UploadModal";
import type { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <SubscribeModal products={products} />
      {/* <UploadModal /> */}
    </>
  );
};

export default ModalProvider;
