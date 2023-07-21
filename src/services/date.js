export const getMostRecentTimestamp = (boss) => {
  if (boss?.checks && boss?.checks.length > 0) {
    const sortedChecks = boss?.checks.sort((a, b) => {
      if (!a?.timestamp && !b?.timestamp) {
        return 0;
      } else if (!a?.timestamp) {
        return 1;
      } else if (!b?.timestamp) {
        return -1;
      } else {
        return (b?.timestamp?.seconds || 0) - (a?.timestamp?.seconds || 0);
      }
    });
    const mostRecentCheck = sortedChecks[0];
    const date = mostRecentCheck?.timestamp?.toDate();
    return date?.toLocaleString('pt-BR') || '-';
  } else {
    return '-';
  }
};



export const formatTimeDifference = (timestamp) => {
  const currentTime = new Date();
  const minutes = Math.floor((currentTime - timestamp?.toDate()) / (1000 * 60));

  if (minutes < 60) {
      return `${minutes} minuto${minutes !== 1 ? 's' : ''} atrás`;
  } else if (minutes >= 60 && minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hora${hours !== 1 ? 's' : ''} e ${remainingMinutes} minuto${remainingMinutes !== 1 ? 's' : ''} atrás`;
  } else {
      const days = Math.floor(minutes / 1440);
      const remainingMinutes = minutes % 1440;
      return `${days} dia${days !== 1 ? 's' : ''} e ${remainingMinutes} minuto${remainingMinutes !== 1 ? 's' : ''} atrás`;
  }
};


// Helper function to check if a given date is today
export const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// Helper function to check if a given date is yesterday
export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};