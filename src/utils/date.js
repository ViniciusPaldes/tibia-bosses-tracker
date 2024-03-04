import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
    return date?.toLocaleString("pt-BR") || "-";
  } else {
    return "-";
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
    return "-";
  }
};

export const getMostRecentKilledTimestamp = (boss) => {
  if (boss?.checks && boss?.checks.length > 0) {
    const killedChecks = boss?.checks.filter((check) => check?.killed);
    if (killedChecks.length === 0) {
      return "-";
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
    return "-";
  }
};

export const formatTimeDifference = (timestamp) => {
  const formattedTimestamp = timestamp.toDate();
  const formattedDistance = formatDistanceToNow(formattedTimestamp, { locale: ptBR });

  return `${formattedDistance} atrás`;
};

// Helper function to check if a given date is today
export const isToday = (date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const fiveAM = new Date(today);
  fiveAM.setHours(6, 0, 0, 0);

  return (
    date.toDateString() === today.toDateString() ||
    (date.toDateString() === yesterday.toDateString() && today <= fiveAM)
  );
};

export const getTodaysTimestamp = () => {
  const currentHour = new Date().getHours();
  const startTimestamp = new Date();
  const endTimestamp = new Date();

  if (currentHour >= 0 && currentHour < 5) {
    // Set the start time to 06:00 AM of the previous day
    startTimestamp.setDate(startTimestamp.getDate() - 1);
    startTimestamp.setHours(6, 0, 0, 0);

    // Set the end time to 06:00 AM of today
    endTimestamp.setHours(6, 0, 0, 0);
  } else {
    // Set the start time to 06:00 AM of today
    startTimestamp.setHours(6, 0, 0, 0);

    // Set the end time to 06:00 AM of the following day
    endTimestamp.setDate(endTimestamp.getDate() + 1);
    endTimestamp.setHours(6, 0, 0, 0);
  }

  return { start: startTimestamp, end: endTimestamp };
};

// Helper function to check if a given date is yesterday
export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const isFullMoonDate = () => {
  const currentDay = new Date().getDate();
  const currentHour = new Date().getHours();

  if (
    (currentDay === 12 && currentHour >= 5) ||
    (currentDay > 12 && currentDay < 15)
  ) {
    return true;
  }

  // Check if the current day is 15 and the current time is before 05:00 AM
  if (currentDay === 15 && currentHour < 5) {
    return true;
  }
  return false;
}

export const isFullMoonActive = (boss) => {
  if (boss.fullMoon) {
    return isFullMoonDate()
  }

  return false;
};

export const getBossTime = (boss) => {
  if (boss.shorterRespawn) {
      if (isFullMoonActive(boss)) {
          if (getMostRecentKilledTimestamp(boss) !== '-') {
              const minutes = Math.floor((new Date() - getMostRecentKilledTimestamp(boss)?.toDate()) / (1000 * 60));
              const remainingTime = boss.respawnTime - minutes
              if (remainingTime <= 0) {
                  if (remainingTime < -10) {
                      return `Possível aparição a ${Math.abs(remainingTime)} minutos`
                  } else {
                      return "a qualquer momento"
                  }

              } else {
                  return `${remainingTime} minutos`
              }
          } else {
              return "-"
          }
      } else {
          return "Todo mês dos dias 12 ao 15 (SS)"
      }


  } else {
      return ((boss.checkable && boss.chanceLabel !== "Sem chance") || boss.wip) ? getMostRecentTimestampFormat(boss) : `${boss.expectedIn} dias`
  }
}

export const getDaysSinceLastSeen = (lastSeen) => {
  const today = new Date();
  const lastSeenDate = new Date(lastSeen);
  const timeDifference = today.getTime() - lastSeenDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  
  if (!isNaN(daysDifference)) {
    return daysDifference;
  } else {
    return "0";
  }
}