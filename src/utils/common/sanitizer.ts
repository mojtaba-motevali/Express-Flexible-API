export const customQuerySortSanizier = (sortStr: string) => {
  return sortStr.split(",").reduce((currObject, currItem) => {
    if (currItem.length > 0) {
      const isDsc = currItem.charAt(0) === "-";
      const key = isDsc ? currItem.substring(1) : currItem;
      currObject[key] = isDsc ? -1 : 1;
      return currObject;
    }
    return currObject;
  }, {});
};

export const customQuerySanitizer = <T>(
  value: string,
  cast: (value: string) => T
) => {
  if (typeof value === "string") {
    const isComparison = value.includes("|");
    if (isComparison) {
      const splited = value.split("|");
      const result: { $gte?: T; $lte?: T } = {};
      if (splited[0]) {
        result.$gte = cast(splited[0]);
      }
      if (splited[1]) {
        result.$lte = cast(splited[1]);
      }
      return result;
    } else if (value.includes(",")) {
      return {
        $in: value.split(",").map((item) => cast(item)),
      };
    } else if (value.charAt(0) == "%") {
      return {
        $regex: RegExp(value.substring(1), "i"),
      };
    } else {
      return cast(value);
    }
  }
};
