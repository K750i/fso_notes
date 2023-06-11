/* eslint-disable react/prop-types */
export default function LoginForm({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username{' '}
        <input type="text" value={username} name="username" onChange={setUsername} />
      </div>
      <div>
        Password{' '}
        <input
          type="password"
          value={password}
          name="password"
          onChange={setPassword}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
