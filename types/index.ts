import { Dispatch, MouseEventHandler, SetStateAction } from "react";
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

export interface MockDetailInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface FlowProps {
  data: Node[];
}

export interface DialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string;
  setTitle: Dispatch<SetStateAction<string>>
  detail: MockDetailInterface
  setDetail: Dispatch<SetStateAction<MockDetailInterface>>
}