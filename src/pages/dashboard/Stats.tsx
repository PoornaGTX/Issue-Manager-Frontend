import { useEffect } from 'react';
import AdminBarChart from '../../components/BarChart';
import { getStats } from '../../features/issue/IssueSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppHook';

const Stats = () => {
  const { stats } = useAppSelector((state) => state.Issue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return (
    <div>
      <AdminBarChart data={stats} />
    </div>
  );
};

export default Stats;
