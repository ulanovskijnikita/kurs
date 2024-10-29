import getData from "./getData.js";

export default async function setUser(context) {
  const [isSignIningEmail] = await getData(
    `SELECT email FROM users WHERE email = '${context.email.value}'`,
    "../query.php"
  );

  const [isSignIningLogin] = await getData(
    `SELECT login FROM users WHERE login = '${context.login.value}'`,
    "../query.php"
  );

  if (typeof isSignIningEmail === "object") {
    const warning = document.body.querySelector('#warning');

    await new Promise( (resolve) => {
        setTimeout(resolve, 300);
    });
    warning.classList.toggle('hidden');
  } else if (typeof isSignIningLogin === "object") {
    const warningLogin = document.body.querySelector('#warningLogin');

    await new Promise( (resolve) => {
        setTimeout(resolve, 300);
    });
    warningLogin.classList.toggle('hidden');

  } else {
    const body = {
      query: `INSERT INTO users (login, password, tel, email) VALUES (
        '${context.login.value}',
        '${context.password.value}',
        '${context.tel.value}',
        '${context.email.value}')`,
    };

    const response = await fetch("../input.php", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const json = await response.json();
      // console.log(json); переход
    } else {
      return JSON.stringify({
        error: `Тут должны быть данные, но произошла ошибка при ответе: ${response.status}`,
      });
    }
  }
}