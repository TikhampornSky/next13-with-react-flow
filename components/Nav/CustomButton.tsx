"use client";
import React from 'react'
import { CustomButtonProps } from '@/types';

const CustomButton = ({ isDisabled, btnType, containerStyles, textStyles, title, handleClick }: CustomButtonProps) => {
  return (
    <button
    disabled={isDisabled}
    type={btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
  >
        <span className={`flex-1 ${textStyles}`}>{title}</span>
    </button>
  )
}

export default CustomButton