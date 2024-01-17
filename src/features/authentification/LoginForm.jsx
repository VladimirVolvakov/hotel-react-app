import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("guest@gmail.com");
  const [password, setPassword] = useState("guest");

  const { login, isLoggingIn } = useLogin();

  const submitHandler = (event) => {
    event.preventDefault();

    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // Auto-completion for password managers:
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoggingIn}>
          Login {isLoggingIn && <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
