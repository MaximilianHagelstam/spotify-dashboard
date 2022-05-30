const formatTripleDot = (title: string, threshold: number): string => {
  if (title.length <= threshold) {
    return title;
  }

  return `${title.substring(0, threshold)}...`;
};

export default formatTripleDot;
