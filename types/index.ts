import { MouseEventHandler } from "react";
import { Node } from "reactflow";

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface MockDataInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface FlowProps {
  data: Node[];
}