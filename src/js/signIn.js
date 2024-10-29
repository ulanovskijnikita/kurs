import getData from "./getData.js";

export default async function signIn(context) {

  let query;

  if (context.loginOrMail.value.includes('@')) {
    query = `SELECT id, login, email, password FROM users WHERE email = '${context.loginOrMail.value}'`;
  } else {
    query = `SELECT id, login, password FROM users WHERE login = '${context.loginOrMail.value}'`;
  }

  const [isSignIning] = await getData(
    query,
    "../query.php"
  );

  if (typeof isSignIning === "object") {

    if (isSignIning.password === context.password.value) {
      const [employee] = await getData(`SELECT employee.employee from employees JOIN employee ON employees.employeesId = employee.employeesId WHERE id ='${isSignIning.id}'`, "../query.php");
      if (typeof employee === "object") document.cookie = `employee=${employee.employee}; path=/; max-age=86400`;

      document.cookie = `userId=${isSignIning.id}; path=/; max-age=86400`;
      document.cookie = `userName=${ encodeURIComponent(isSignIning.login) }; path=/; max-age=86400`;

      location.assign('../../../index.html');
    } else {
      const warningPass = document.body.querySelector('#warningPass');
      await new Promise( (resolve) => {
          setTimeout(resolve, 300);
      });
      warningPass.classList.toggle('hidden');
      await new Promise( (resolve) => {
          setTimeout(resolve, 1000);
      });
      warningPass.classList.toggle('hidden');
    }
  } else {
    const warning = document.body.querySelector('#warning');

    await new Promise( (resolve) => {
        setTimeout(resolve, 300);
    });
    warning.classList.toggle('hidden');
  }
}