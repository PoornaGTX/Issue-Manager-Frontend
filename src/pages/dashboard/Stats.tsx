import { useState, useEffect } from 'react';
import AdminBarChart from '../../components/BarChart';
import { getStats } from '../../features/issue/IssueSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppHook';
import Select from 'react-select';
import { OptionType } from '../../utils/types';

const Stats = () => {
  const { statuses, priorities } = useAppSelector((state) => state.Issue);
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const optionsIssueType: OptionType[] = [
    { value: 'Issue Statistics by Priority', label: 'Issue Statistics by Priority' },
    { value: 'Issue Statistics by Statuses', label: 'Issue Statistics by Statuses' },
  ];

  const handleChange = (selectedOption: OptionType | null) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return (
    <div>
      <h2 className="text-center font-semibold text-lg sm:text-xl">Issue Statistics</h2>
      <div className="flex justify-center mt-3">
        <Select options={optionsIssueType} value={selectedOption} onChange={handleChange} placeholder="Select Statistics Type" />
      </div>
      {selectedOption?.value === 'Issue Statistics by Priority' ? (
        <AdminBarChart data={priorities} dataKey={'priority'} />
      ) : (
        <AdminBarChart data={statuses} dataKey={'status'} />
      )}
    </div>
  );
};

export default Stats;
