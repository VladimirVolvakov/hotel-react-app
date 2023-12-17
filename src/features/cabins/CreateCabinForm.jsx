import styled, { css } from "styled-components";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Form = styled.form`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FileInput = styled.input`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;
`;

const CreateCabinForm = () => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { mutate, isLoading: isCreatingCabin } = useMutation({
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin was successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data) => mutate(data);
  const onError = (errors) => console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isCreatingCabin}
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreatingCabin}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least equal to 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreatingCabin}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price should be at least equal to 1",
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreatingCabin}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreatingCabin}
          {...register("description", {
            required: "This field is required",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreatingCabin}>Add cabin</Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
