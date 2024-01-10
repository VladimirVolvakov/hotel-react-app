import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useFetchUser } from "./useFetchUser";
import { useUpdateUser } from "./useUpdateUser";

const UpdateUserDataForm = () => {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useFetchUser();

  const { updateUser, isUpdatingUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          event.target.reset();
        },
      }
    );
  };

  const cancelBtnClickHandler = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={formSubmitHandler}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          id="fullName"
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(event) => setAvatar(event.target.files[0])}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdatingUser}
          onClick={cancelBtnClickHandler}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
