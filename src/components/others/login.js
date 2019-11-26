export default function login() {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 30);
  document.cookie = `login=true; expires=${expireDate}`;
  window.location = '/';
}
