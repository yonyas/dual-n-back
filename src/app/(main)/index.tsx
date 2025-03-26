"use client";
import Footer from "../Footer";
import Header from "../Header";
import { useModalContext } from "@/context/ModalContext";
import ConfigModal from "@/components/ConfigModal";

export default function Main({ children }: { children: React.ReactNode }) {
  const { isModalOpen } = useModalContext();

  return (
    <>
      <Header />
      <div style={{ flex: 1, display: "flex" }}>{children}</div>
      <Footer />
      {isModalOpen && <ConfigModal />}
    </>
  );
}
