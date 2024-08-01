const formDataToJson = formData => {
  if (!(formData instanceof FormData)) return formData;

  const jsonObj = {};

  formData.forEach((value, key) => {
    jsonObj[key] = value;
  });

  return jsonObj;
};

const delayForDemo = async promise => {
  return new Promise(resolve => setTimeout(() => resolve(promise), 2000));
};
export { formDataToJson, delayForDemo };
