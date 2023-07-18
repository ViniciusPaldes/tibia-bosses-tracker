
export const getMostRecentTimestamp = (boss) => {
    if (boss.checks && boss.checks.length > 0) {
      const sortedChecks = boss.checks.sort((a, b) => {
        if (!a.timestamp && !b.timestamp) {
          return 0;
        } else if (!a.timestamp) {
          return 1;
        } else if (!b.timestamp) {
          return -1;
        } else {
          return b.timestamp.seconds - a.timestamp.seconds;
        }
      });
      const mostRecentCheck = sortedChecks[0];
      const date = mostRecentCheck.timestamp?.toDate();
      return date.toLocaleString('pt-BR');
    } else {
      return '-';
    }
  };
