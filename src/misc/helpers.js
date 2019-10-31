export const firebaseLooper = (obj) => {
  const data = [];
  Object.keys(obj).forEach(element => {
    data.push({...obj[element]});
  });
  return data;
}