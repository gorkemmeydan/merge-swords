const convertToBase64 = (str) => {
  const buff = new Buffer(str);
  const base64data = buff.toString("base64");
  return base64data;
};

export default convertToBase64;
