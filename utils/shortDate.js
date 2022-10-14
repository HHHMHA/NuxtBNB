export default (str) => {
  const date = new Date(str);
  return date.toLocaleDateString(undefined, {month: "long", year: "numeric", });
}
