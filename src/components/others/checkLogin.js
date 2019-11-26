export default function checkLogin() {
  const rawCookies = document.cookie;

  const cookies = {};
  let startIndex = 0;
  let middleIndex = rawCookies.indexOf("=");
  let endIndex =
    rawCookies.indexOf(";") === -1
      ? rawCookies.length
      : rawCookies.indexOf(";");

  while (middleIndex !== -1) {
    cookies[
      rawCookies.substring(startIndex, middleIndex)
    ] = rawCookies.substring(middleIndex + 1, endIndex);

    startIndex = endIndex + 2;
    middleIndex = rawCookies.indexOf("=", startIndex);
    endIndex =
      rawCookies.indexOf(";", startIndex) === -1
        ? rawCookies.length
        : rawCookies.indexOf(";", startIndex);
  }

  return cookies.login === "true";
}
