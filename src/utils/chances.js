export const getFormattedChance = (chance) => {
    return (chance * 100).toFixed(0) + '%';
}

export const getChanceLabel = (chance) => {
    if (!chance) return 'Sem chance';
    if (chance > 0.1) return 'Alta';
    if (chance > 0.01) return 'Média';
    return chance > 0 ? 'Baixa' : 'Sem chance';
  };

  export const getChanceStyle = (chance) => {
    if (!chance) return 'no';
    if (chance > 0.1) return 'high';
    if (chance > 0.01) return 'medium';
    return chance > 0 ? 'low' : 'no';
  };