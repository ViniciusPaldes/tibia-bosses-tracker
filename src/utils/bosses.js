import { isFullMoonActive, isToday } from "./date";

export const isKilled = (boss) => {
  // Check if "checks" property exists and it is an array
  if (boss && boss.checks && Array.isArray(boss.checks)) {
    // Check if any of the checks match the current date and have "killed" set to true
    return boss.checks.some((check) => {
      if (check.killed) {
        // Convert the timestamp to a Date object
        const checkDate = new Date(
          check.timestamp?.seconds * 1000 +
            check.timestamp?.nanoseconds / 1000000
        );

        // Check if the check date matches the current date (ignoring the time)
        return isToday(checkDate);
      }
      return false;
    });
  }

  // Return false if checks are not defined or not an array
  return false;
};

export const countChances = (bosses) => {
  let altaCount = 0;
  let mediaCount = 0;
  let baixaCount = 0;
  let semChanceCount = 0;
  let wipCount = 0;

  bosses.forEach((boss) => {
    const chanceLabel = boss.chanceLabel;
    if (boss.shorterRespawn && isFullMoonActive(boss)) {
      altaCount++;
      return;
    }
    if (boss.wip) {
      wipCount++;
      return;
    }
    switch (chanceLabel) {
      case "Alta":
        altaCount++;
        break;
      case "Média":
        mediaCount++;
        break;
      case "Baixa":
        baixaCount++;
        break;
      default:
        semChanceCount++;
        break;
    }
  });
  return {
    alta: altaCount,
    media: mediaCount,
    baixa: baixaCount,
    semChance: semChanceCount,
    wip: wipCount,
  };
};

export const filterBosses = ({selectedFilters, bosses}) => {
  if (selectedFilters.length === 0) {
    return bosses;
  }

  const selectedCities = selectedFilters
    .filter((filter) => filter.type === "city")
    .map((cityFilter) => cityFilter.name);

  const selectedChances = selectedFilters
    .filter((filter) => filter.type === "chance")
    .map((chanceFilter) => chanceFilter.name);

  // Filter bosses based on selected cities and chances
  const filteredBosses = bosses?.filter((boss) => {
    // Check if the boss's city is included in the selectedCities array
    let isCityMatch = true;
    if (selectedCities.length > 0) {
      isCityMatch = selectedCities.includes(boss.city);
    }
    // Check if the boss's chance is included in the selectedChances array
    let isChanceMatch = true;
    if (selectedChances.length > 0) {
      if (boss.wip) {
        return false;
      } else {
        isChanceMatch = selectedChances.includes(boss.chanceLabel);
      }
    }
    // Return true if both city and chance match, otherwise return false
    return isCityMatch && isChanceMatch;
  });

  return filteredBosses;
}