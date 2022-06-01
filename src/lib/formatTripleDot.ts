const formatTripleDot = (title: string, threshold: number) => {
  if (title.length <= threshold) {
    return title;
  }

  return `${title.substring(0, threshold)}...`;
};

export default formatTripleDot;
