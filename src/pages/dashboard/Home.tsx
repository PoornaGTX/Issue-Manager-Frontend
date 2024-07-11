import { useState, useEffect, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppHook';
import Modal from '../../components/Modals/Modal';
import {
  CREATE_ISSUE,
  OPEN,
  IN_PROGRESS,
  TESTING,
  VIEW_ISSUE,
  optionsIssueType,
  optionsIssueTypePM,
  override,
  LOW,
  MEDIUM,
  HIGH,
  optionsPriorityType,
} from '../../utils/consts';
import { OptionType } from '../../utils/types';
import { getAllIssues, searchType, searchParam, searchFilter } from '../../features/issue/IssueSlice';
import { issue } from '../../utils/types';
import Select, { SingleValue } from 'react-select';
import PropagateLoader from 'react-spinners/PulseLoader';

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, issues } = useAppSelector((state) => state.Issue);
  const { user } = useAppSelector((state) => state.Auth);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ type: string; issue: issue | undefined }>({ type: '', issue: undefined });
  const [searchText, setSearchText] = useState('');

  const defaultOption: OptionType = optionsIssueType[1];
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(defaultOption);
  const [selectedOptionPriority, setSelectedOptionPriority] = useState<OptionType | null>();

  const modalhandler = (type: string, issue: issue | undefined = undefined) => {
    setModalData({ type, issue });
    if (type === VIEW_ISSUE && issue) {
    }
    setIssueModalOpen(true);
  };

  const closeModalHandler = () => {
    setIssueModalOpen(false);
  };

  const handleSelectChange = (selected: SingleValue<OptionType>) => {
    dispatch(searchType({ type: selected?.value }));
    setSelectedOption(selected);
  };

  const handleSelectFilter = (selected: SingleValue<OptionType>) => {
    dispatch(searchFilter({ searchFilter: selected?.value }));
    setSelectedOptionPriority(selected);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    dispatch(searchParam({ searchParam: e.target.value }));
  };

  const resetDropdown = () => {
    dispatch(searchFilter({ searchFilter: 'all' }));
    setSelectedOptionPriority(null);
  };

  useEffect(() => {
    dispatch(getAllIssues());
  }, [selectedOption, searchText, selectedOptionPriority]);

  return (
    <div>
      <div className="mb-4">
        <input
          className="w-full py-2 px-2 border  rounded-md text-black"
          type="text"
          placeholder="Search Here"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex justify-end gap-x-4 gap-y-3 flex-col sm:flex-row mb-3">
        <div className="sm:min-w-[150px]">
          <Select options={optionsPriorityType} value={selectedOptionPriority} onChange={handleSelectFilter} placeholder={'Priority Type'} />
        </div>

        {user.position === 'Project Manager' && (
          <div className="sm:min-w-[150px]">
            <Select options={optionsIssueTypePM} value={selectedOption} onChange={handleSelectChange} />
          </div>
        )}

        {user.position !== 'Project Manager' && (
          <div className="sm:min-w-[150px]">
            <Select options={optionsIssueType} value={selectedOption} onChange={handleSelectChange} />
          </div>
        )}

        <button className="bg-primary text-white font-semibold p-1 px-3 rounded-md" onClick={resetDropdown}>
          Reset
        </button>

        <button className="bg-primary p-1 rounded-md text-white font-semibold" onClick={() => modalhandler(CREATE_ISSUE)}>
          + Add New Issue
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <PropagateLoader color="#209CEE" loading={isLoading} cssOverride={override} size={15} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : (
        <>
          {issues?.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issues?.map((issue) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={issue._id}>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="ps-3">
                            <div className="text-base font-semibold">{issue.title}</div>
                          </div>
                        </th>
                        <td className="px-6 py-4">{issue.startDate}</td>
                        <td className="px-6 py-4">{issue.dueDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${issue.status === OPEN && 'bg-green-500'} ${
                                issue.status === IN_PROGRESS && 'bg-blue-600'
                              } ${issue.status === TESTING && 'bg-red-600'} me-2`}
                            ></div>{' '}
                            {issue.status}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${issue.priority === LOW && 'bg-yellow-400'} ${
                                issue.priority === MEDIUM && 'bg-blue-600'
                              } ${issue.priority === HIGH && 'bg-red-600'} me-2`}
                            ></div>{' '}
                            {issue.priority}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                            onClick={() => modalhandler(VIEW_ISSUE, issue)}
                          >
                            View Issue
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-center text-xl font-semibold">No Data Found </h2>
          )}
        </>
      )}

      <Modal open={issueModalOpen} closeHandler={closeModalHandler} modalData={modalData} />
    </div>
  );
};

export default Home;
