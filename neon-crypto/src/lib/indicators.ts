// Calcul de la Moyenne Mobile Simple (SMA)
// Lisse la courbe pour montrer la tendance de fond
// windowSize = nombre de points pour la moyenne (ex: 14)
export const calculateSMA = (data: any[], windowSize: number) => {
  if (data.length < windowSize) return data;

  return data.map((point, index, array) => {
    if (index < windowSize - 1) return { ...point, sma: null }; // Pas assez de données au début

    // On prend les N derniers points
    const slice = array.slice(index - windowSize + 1, index + 1);
    // On calcule la moyenne
    const average = slice.reduce((sum, p) => sum + p.value, 0) / windowSize;

    return { ...point, sma: average };
  });
};