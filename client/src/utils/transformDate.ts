export const transformDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: any = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleString('en-US', options);
};

