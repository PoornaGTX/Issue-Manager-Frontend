import { OptionType, SelectStyles } from './types';
export const APP_NAME = 'Issue Manager';
export const LOG_OUT = 'LogOut';
export const CREATE_ISSUE = 'create_issue';
export const VIEW_ISSUE = 'view_issue';
export const OPEN = 'Open';
export const IN_PROGRESS = 'In Progress';
export const TESTING = 'Testing';
export const LOW = 'Low';
export const MEDIUM = 'Medium';
export const HIGH = 'High';
export const EDIT = 'edit';
export const DELETE = 'delete';

export const statusOptionsMapping: Record<string, OptionType> = {
  Open: { value: 'Open', label: '🟢 Open' },
  'In Progress': { value: 'In Progress', label: '🔵 In Progress' },
  Testing: { value: 'Testing', label: '🔴 Testing' },
};

export const priorityOptionsMapping: Record<string, OptionType> = {
  Low: { value: 'Low', label: '🟨 Low' },
  Medium: { value: 'Medium', label: '🟦 Medium' },
  High: { value: 'High', label: '🟥 High' },
};

export const optionsStatus: OptionType[] = [
  { value: 'Open', label: '🟢 Open' },
  { value: 'In Progress', label: '🔵 In Progress ' },
  { value: 'Testing', label: '🔴 Testing' },
];

export const optionsPriority: OptionType[] = [
  { value: 'Low', label: '🟨 Low' },
  { value: 'Medium', label: '🟦 Medium' },
  { value: 'High', label: '🟥 High' },
];

export const options: OptionType[] = [
  { value: 'Company A', label: 'Company A' },
  { value: 'Company B', label: 'Company B' },
  { value: 'Company C', label: 'Company C' },
];

export const optionsPositions: OptionType[] = [
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'QA Engineer', label: 'QA Engineer' },
];

export const optionsIssueType: OptionType[] = [
  { value: 'Personal', label: 'Personal' },
  { value: 'Assigned To Me', label: 'Assigned To Me' },
];

export const optionsIssueTypePM: OptionType[] = [
  { value: 'Personal', label: 'Company Issues' },
  { value: 'Assigned To Me', label: 'Assigned To Me' },
];

export const optionsPriorityType: OptionType[] = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

export const selectStyles = {
  menuList: (styles: any) => {
    return {
      ...styles,
      maxHeight: 200,
    };
  },
};

// export const BASE_URL = 'http://localhost:5000/api/v1';
export const BASE_URL = 'https://issue-manager-backend.vercel.app/api/v1';

export const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
