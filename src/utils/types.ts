import { ReactNode, PropsWithChildren } from 'react';

export interface MenuItem {
  id: number;
  text: string;
  path: string;
  icon: ReactNode;
  roles: string[];
}

export interface OptionType {
  value?: string;
  label?: string;
}

export interface modalTypes {
  type: string;
  issue?: issue;
}

export interface ModalTypes extends PropsWithChildren {
  open: boolean;
  modalData: modalTypes;
  closeHandler: () => void;
}

export interface UserType {
  email: string;
  name: string;
  company: string;
}

export interface ErrorResponse {
  msg: string;
}

type user = {
  email: string;
  name: string;
  company: string;
};

export type issue = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  startDate: string;
  dueDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface IssueSliceType {
  issues: issue[];
  issue: issue;
  type?: string;
  search?: string;
  filter?: string;
  isLoading: boolean;
  alertText: string;
  alertType: string;
  showAlert: boolean;
  errorMsg: any;
  statuses: any[];
  priorities: any[];
}

export interface UserSlice extends IssueSliceType {
  token: string;
  user: user;
}

export interface confirmationModal {
  open: boolean;
  alertText?: string;
  alertType?: string;
  closeHandler: () => void;
  issueDeleteHandler: () => void;
}

export interface loginSelect {
  label: string;
  options: any;
  value: any;
  handleSelectChange: any;
  htmlFor: string;
}

export type UsersType = {
  _id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface usersSlice {
  users: UsersType | any;
  isLoading: boolean;
  alertText: string;
  alertType: string;
  showAlert: boolean;
  errorMsg: any;
}

export interface DropDownType {
  options: any;
  value: any;
  handleSelectChange: any;
  isDisabled?: boolean;
  htmlFor: string;
  labelText: string;
}

export interface ButtonType {
  hasFormChanged?: any;
  isLoading?: boolean;
  permission?: boolean;
  title: string;
  submitHandler?: any;
  pram?: string;
  close?: boolean;
}

export interface DropDownLargeType {
  title: string;
  options: any;
  value: any;
  handleAssigneeChange: any;
  styles: any;
}

export interface SelectStyles {
  menuList: (styles: any) => React.CSSProperties;
}

export interface InputRowType {
  name: string;
  labelText: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | HTMLTextAreaElement) => void;
  readonly?: boolean;
  disabled?: boolean;
  type?: string;
}

export interface InputRowMultiLine {
  labelText: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Adjusted type here
  disabled?: boolean;
}

export interface LoginInputTypes {
  label: string;
  id: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isHidden?: boolean;
  type: string;
  htmlFor: string;
}

export interface PasswordInputTypes {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  isHidden?: boolean;
  showPassword: boolean;
}
