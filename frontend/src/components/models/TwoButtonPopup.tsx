"use client";
import Image from "next/image";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import styles from "./TwoButtonPopup.module.css";

import { Button } from "@/components";

export type TwoButtonPopupProps = {
  isOpen: boolean;
  variant?: "info" | "question" | "warning";
  confirmLabel?: string;
  onConfirm: () => void;
  cancelLabel?: string;
  onCancel: () => void;
  children: ReactNode;
};

export const TwoButtonPopup = ({
  isOpen,
  variant = "info",
  confirmLabel = "confirm",
  onConfirm,
  cancelLabel = "cancel",
  onCancel,
  children,
}: TwoButtonPopupProps) => {
  const { t } = useTranslation();

  const infoIcon = "/icons/info_icon.svg";
  const questionIcon = "/icons/question_icon.svg";
  const warningIcon = "/icons/warning_icon.svg";

  const icons = {
    info: infoIcon,
    question: questionIcon,
    warning: warningIcon,
  };

  const iconSrc = icons[variant];
  const iconAlt = `${variant} icon`;

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <Image src={iconSrc} alt={iconAlt} width={55} height={55} className={styles.icon} />

        {children}

        <div className={styles.buttonContainer}>
          <Button variant="secondary" onClick={onCancel} label={t(cancelLabel)} />
          <Button variant="primary" onClick={onConfirm} label={t(confirmLabel)} />
        </div>
      </div>
    </div>
  );
};
