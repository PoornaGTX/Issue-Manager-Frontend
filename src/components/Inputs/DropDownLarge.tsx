import Select from 'react-select';
import { DropDownLargeType } from '../../utils/types';

const DropDownLarge = ({ title, options, value, handleAssigneeChange, styles }: DropDownLargeType) => {
  return (
    <div className="mb-3 w-full">
      <label htmlFor="Assignee" className="block mb-2">
        {title}
      </label>
      <Select options={options} value={value} onChange={handleAssigneeChange} styles={styles} />
    </div>
  );
};

export default DropDownLarge;
