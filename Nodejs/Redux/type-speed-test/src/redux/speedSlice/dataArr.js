import data from "./data.json";

export default function getElements(count) {
  const result = [];
  const arrayCopy = [...data.words];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    const selectedElement = arrayCopy.splice(randomIndex, 1)[0];
    result.push(selectedElement);
  }
  return result;
}
