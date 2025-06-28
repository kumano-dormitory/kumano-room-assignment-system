function enableReentry(losers) {
  const wakuDict = {};
  for (const block in losers) {
    wakuDict[block] = losers[block]; // 負けた回数が指名数になる
  }
  applyWakuDict(wakuDict);
}
