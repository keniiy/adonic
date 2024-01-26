const isset = (value: any) => {
  if (typeof value == "undefined" || value == null || value === "") {
    return false;
  }

  return true;
};

export default isset;
