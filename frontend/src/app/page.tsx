"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";

//TODO: use alias importing 
import { UserContext } from "../contexts/userContext";


import { EditBasicInfoModal, External, LanguageSwitcher } from "@/components";
export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { user } = useContext(UserContext);
  return (
    <div>
      <h1> Dashboard/Home </h1>
      <Link href="/login">go to login</Link>

    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {/* Added the LanguageSwitcher component */}
        <LanguageSwitcher />
        {user && (
          <p>
            {user.personal.firstName} {user.display.workEmail}
          </p>
        )}
        {/* External is my text component */}
        <External></External>
      </main>
        <button onClick={handleOpenModal}>Open Post Modal</button>
        {/* <DirectoryInfoModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
        <EditBasicInfoModal isOpen={isModalOpen} onClose={handleCloseModal} />
        {/* <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
      </div>
    </div>
  );
}
