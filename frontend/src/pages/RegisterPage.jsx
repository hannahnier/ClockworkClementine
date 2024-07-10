import { useCalContext } from "../utils/ContextProvider";

const RegisterPage = () => {
  const { calendars, setCalendars, users, setUsers } = useCalContext();
  return (
    <div>
      <h2> Registration</h2>
      <form action="">
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" />

        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
