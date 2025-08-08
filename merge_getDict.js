function mergeIntoTotal(getDict) {
  for (const block in getDict) {
    if (!(block in totalGetDict)) {
      totalGetDict[block] = [];
    }

    for (const num of getDict[block]) {
      if (!totalGetDict[block].includes(num)) {
        totalGetDict[block].push(num);
        totalGetDict[block] = totalGetDict[block].sort((a,b) => a-b);
      }
    }
  }
}
