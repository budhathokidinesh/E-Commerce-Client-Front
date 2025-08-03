export const reviewStar = (average) => {
  

  
  const maxStar = 5;
  const fullstarrating = Math.floor(average);

  const halfstar = average % 1 != 0 ? 1 : 0;
  const emptystars = maxStar - fullstarrating - halfstar;

  return {
    fullstarrating,
    halfstar,
    emptystars,
  };
};

export default reviewStar;
