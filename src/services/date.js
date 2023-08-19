export const getMostRecentTimestampFormat = (boss) => {
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
    return mostRecentCheck?.timestamp;
  } else {
    return '-';
  }
};

export const getMostRecentKilledTimestamp = (boss) => {
  if (boss?.checks && boss?.checks.length > 0) {
    const killedChecks = boss?.checks.filter((check) => check?.killed);
    if (killedChecks.length === 0) {
      return '-';
    }
    
    const sortedChecks = killedChecks.sort((a, b) => {
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
    return mostRecentCheck?.timestamp;
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
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const fiveAM = new Date(today);
  fiveAM.setHours(5, 0, 0, 0);

  return (date.toDateString() === today.toDateString()) ||
         (date.toDateString() === yesterday.toDateString() && date <= fiveAM);
};

// Helper function to check if a given date is yesterday
export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const isFullMoonActive = (boss) => {
  if (boss.fullMoon) {
    const currentDay = new Date().getDate(); // Get the current day of the month (1-31)
    const currentHour = new Date().getHours(); // Get the current hour (0-23)

    // Check if the current day is between 12 and 15 (inclusive)
    // and the current time is after 05:00 AM
    if ((currentDay === 12 && currentHour >= 5) || (currentDay > 12 && currentDay < 15)) {
      return true;
    }

    // Check if the current day is 15 and the current time is before 05:00 AM
    if (currentDay === 15 && currentHour < 5) {
      return true;
    }
  }

  return false;
};
