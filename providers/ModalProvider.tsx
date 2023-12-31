"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";
import MenuModal from "@/components/MenuModal";
import ChangePasswordModal from "@/components/ChangePasswordModal";



interface ModalProviderProps{

  products:ProductWithPrice[];
}


const ModalProvider:React.FC<ModalProviderProps> = ({products}) => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products}/>
      <MenuModal />
      <ChangePasswordModal />
    </>
  );
};

export default ModalProvider;
