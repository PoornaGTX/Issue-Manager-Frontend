import { useState, useEffect, useCallback } from 'react';
import { SingleValue } from 'react-select';
import { OptionType, ErrorResponse } from '../../utils/types';
import {
  CREATE_ISSUE,
  VIEW_ISSUE,
  statusOptionsMapping,
  priorityOptionsMapping,
  optionsStatus,
  optionsPriority,
  EDIT,
  DELETE,
  selectStyles,
  CLOSE,
} from '../../utils/consts';
import { createIssue, updateIssue, deleteIssue } from '../../features/issue/IssueSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppHook';
import { toast } from 'react-toastify';
import { IssueSchema } from '../../schema/IssueSchema';
import { z } from 'zod';
import { AxiosError } from 'axios';
import ResponseModal from './ConfirmationModal';
import { getUsers } from '../../features/user/UsersSlice';
import { InputRow, InputRowMultiLine, DropDown, Button, CreateButton, DropDownLarge } from '../index';
import PropagateLoader from 'react-spinners/PulseLoader';
import { override } from '../../utils/consts';

const IssueModal = ({ modalDetails, closeHandler }: any) => {
  const { type, issue } = modalDetails;
  const dispatch = useAppDispatch();
  const { isLoading, alertText } = useAppSelector((state) => state.Issue);
  const { user } = useAppSelector((state) => state.Auth);
  const { users } = useAppSelector((state) => state.Users);

  const [selectedOptions, setSelectedOptions] = useState<{ status: OptionType | null; priority: OptionType | null }>({
    status: issue?.status ? statusOptionsMapping[issue.status] : null,
    priority: issue?.priority ? priorityOptionsMapping[issue.priority] : null,
  });

  const permission = user.position !== 'Project Manager' && !!issue?.assignee;

  const [confirmationModalOpen, setConfirmationModal] = useState(false);

  const [formData, setFormData] = useState({
    title: issue?.title || '',
    description: issue?.description || '',
    startDate: issue?.startDate || '',
    dueDate: issue?.dueDate || '',
    status: issue?.status || '',
    priority: issue?.priority || '',
    assignee: { id: '', name: '' },
  });

  const [initialFormData] = useState(formData);

  const hasFormChanged = useCallback(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  }, [formData, initialFormData]);

  const handleSelectChange = (key: keyof typeof selectedOptions) => (selectedOption: SingleValue<OptionType>) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [key]: selectedOption,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: selectedOption?.value ?? '',
    }));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formRest = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      dueDate: '',
      status: '',
      priority: '',
      assignee: { id: '', name: '' },
    });
  };

  const issueDeleteHandler = async () => {
    try {
      await dispatch(deleteIssue(issue._id));
      setConfirmationModal(false);
      closeHandler();
      toast.success('Issue deleted successfully!');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data.msg ?? 'An error occurred';
      toast.error(alertText || errorMessage);
    }
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>, action: string) => {
    e.preventDefault();
    const { title, description, startDate, dueDate, status, priority, assignee } = formData;

    try {
      if (type === CREATE_ISSUE) {
        IssueSchema.parse(formData);
        await dispatch(
          createIssue({
            title,
            description,
            startDate,
            dueDate,
            status,
            priority,
            assignee: user.position === 'Project Manager' ? assignee.id : null,
          })
        ).unwrap();
        formRest();
        toast.success('Issue created successfully!');
      }

      if (type === VIEW_ISSUE && action === EDIT) {
        IssueSchema.parse(formData);
        await dispatch(updateIssue({ id: issue._id, title, description, startDate, dueDate, status, priority })).unwrap();
        toast.success('Issue updated successfully!');
      }

      if (type === VIEW_ISSUE && action === DELETE) {
        setConfirmationModal(true);
        IssueSchema.parse(formData);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        console.log('error axios');
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError.response?.data.msg ?? 'An error occurred';
        toast.error(alertText || errorMessage);
      }
    }
  };

  useEffect(() => {
    dispatch(getUsers(user.company));
  }, []);

  const ModalCloseHandler = () => {
    setConfirmationModal(false);
  };

  const handleAssigneeChange = (selectedOption: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      assignee: { id: selectedOption.value, name: selectedOption.label },
    }));
  };

  return (
    <>
      <ResponseModal open={confirmationModalOpen} closeHandler={ModalCloseHandler} issueDeleteHandler={issueDeleteHandler} />

      <h2 className="text-center text-2xl font-semibold mb-2 rounded-sm bg-gray-500 text-white">
        {type === CREATE_ISSUE ? 'Create a Issue' : `Issue ID - ${issue?._id} `}
      </h2>

      <InputRow
        name="title"
        labelText="Title"
        value={formData.title}
        handleChange={handleInputChange}
        disabled={permission || issue?.status === CLOSE}
      />

      <InputRowMultiLine
        name="description"
        labelText="Description"
        value={formData.description}
        handleChange={handleInputChange}
        disabled={permission || issue?.status === CLOSE}
      />

      {user.position === 'Project Manager' && (
        <DropDownLarge
          title="Assignee"
          options={users.map((user: any) => ({ value: user._id, label: user.name }))}
          value={formData.assignee ? { value: formData.assignee.name, label: formData.assignee.name } : null}
          handleAssigneeChange={handleAssigneeChange}
          styles={selectStyles}
        />
      )}

      <div className="flex justify-between w-full gap-x-4">
        <DropDown
          htmlFor="Status"
          labelText="Status"
          options={optionsStatus}
          value={selectedOptions.status}
          handleSelectChange={handleSelectChange('status')}
          isDisabled={permission || issue?.status === CLOSE}
        />

        <DropDown
          htmlFor="Priority"
          labelText="Priority"
          options={optionsPriority}
          value={selectedOptions.priority}
          handleSelectChange={handleSelectChange('priority')}
          isDisabled={permission || issue?.status === CLOSE}
        />
      </div>

      <div className="flex justify-between w-full gap-x-4">
        <InputRow
          name="startDate"
          type="date"
          labelText="Start Date"
          value={formData.startDate}
          handleChange={handleInputChange}
          readonly={permission || issue?.status === CLOSE}
        />

        <InputRow
          name="dueDate"
          type="date"
          labelText="Due Date"
          value={formData.dueDate}
          handleChange={handleInputChange}
          readonly={permission || issue?.status === CLOSE}
        />
      </div>

      <br />
      {type === VIEW_ISSUE && (
        <div className="flex gap-x-2">
          <Button title="Delete" submitHandler={submitHandler} isLoading={isLoading} permission={permission} pram={DELETE} />

          <Button
            title="Edit"
            submitHandler={submitHandler}
            hasFormChanged={hasFormChanged}
            isLoading={isLoading}
            permission={permission}
            pram={EDIT}
            close={issue?.status === CLOSE}
          />
        </div>
      )}

      {type === CREATE_ISSUE && <CreateButton title="Create Issue" isLoading={isLoading} submitHandler={submitHandler} />}
    </>
  );
};

export default IssueModal;
