import { useEffect, useState } from 'react';
import axiosInstance from '../utils/AuthFetch';
import { BASE_URL } from '../utils/consts';

export const useFetchIssue = (id: string | undefined) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`${BASE_URL}/issue/${id}`);
        setData(response.data.issue);
      } catch (error) {
        console.error('Error fetching issue:', error);
        setError('Error fetching issue. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, loading, error };
};
