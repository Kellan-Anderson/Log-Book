export default function useGenerateId({
  prefix,
  length = 5,
} : {
  length: number,
  prefix: string
}) {

  const generateNewId = () => {
    const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321";
    let id = '';
    for(let i = 0; i < length; i++) {
      const randChar = key[Math.floor(Math.random() * key.length)]
      id = id + randChar;
    }
    return prefix + id;
  }

  const defaultId = generateNewId()

  return {
    defaultId,
    generateNewId
  }
}