const parseBool = (value: any) => value === "true" || value === 1 || value=== "1" || value === true ? true : false

export default parseBool;