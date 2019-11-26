export default function checkLogin() {
  const rawCookies = document.cookie;

  const cookies = {};
  let startIndex = 0;
  let middleIndex = rawCookies.indexOf("=");
  let endIndex = rawCookies.indexOf(";");

  while (middleIndex !== -1 && endIndex !== -1) {
    cookies[
      rawCookies.substring(startIndex, middleIndex)
    ] = rawCookies.substring(startIndex + 1, endIndex);

    startIndex = endIndex + 2;
    middleIndex = rawCookies.indexOf("=", startIndex);
    endIndex = rawCookies.indexOf(";", startIndex);
    break;
  }
  console.log(cookies, middleIndex, endIndex, rawCookies);
  return rawCookies.login;
}
