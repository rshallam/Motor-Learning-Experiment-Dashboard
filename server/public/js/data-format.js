var zippedData = [];

data.forEach((d,i) => {
  d["cursorPosX"] = d["cursorPosX"].map((d, i) => d - 720);
  d["cursorPosY"] = d["cursorPosY"].map((d, i) => 600 - d);

  var zipCursorPos = d["cursorPosX"].map((x, i) => ({cursorPosX: x, cursorPosY: d["cursorPosY"][i]}))
  zippedData.push(zipCursorPos);
});

console.log(zippedData);
