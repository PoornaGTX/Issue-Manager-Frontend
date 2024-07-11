export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('/');
  return `${year}-${month}-${day}`;
};
