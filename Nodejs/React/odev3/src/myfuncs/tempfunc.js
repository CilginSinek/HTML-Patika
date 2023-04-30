export function tempfunc(temp, temptur) {
  if (temptur === "C") {
    return (temp - 273.15).toFixed(2)
  } else {
    return temp
  }
};