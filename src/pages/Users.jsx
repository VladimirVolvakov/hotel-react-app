import SignupForm from "../features/authentification/SignUpForm";
import Heading from "../ui/Heading";

const Users = () => {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
};

export default Users;
