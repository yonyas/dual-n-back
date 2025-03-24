export const getSounds = () => {
  if (typeof window !== "undefined") {
    return {
      1: new Audio("/sound/H.wav"),
      2: new Audio("/sound/J.wav"),
      3: new Audio("/sound/K.wav"),
      4: new Audio("/sound/S.wav"),
      5: new Audio("/sound/Q.wav"),
      6: new Audio("/sound/R.wav"),
      7: new Audio("/sound/P.wav"),
      8: new Audio("/sound/A.wav"),
      9: new Audio("/sound/G.wav"),
    };
  }
  return {} as Record<number, HTMLAudioElement>;
};
