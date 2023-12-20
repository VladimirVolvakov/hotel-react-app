import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useFetchSettings } from "./useFetchSettings";
import { useUpdateSetting } from "./useUpdateSetting";

const UpdateSettingsForm = () => {
  const { settings = {}, isLoading, error } = useFetchSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const { updateSetting, isUpdatingSetting } = useUpdateSetting();

  const updateSettingHandler = (event, updatingSettingName) => {
    const { value } = event.target;

    if (!value) return;

    updateSetting({ [updatingSettingName]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights / booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isLoading || isUpdatingSetting}
          defaultValue={minBookingLength}
          onBlur={(event) => updateSettingHandler(event, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights / booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isLoading || isUpdatingSetting}
          defaultValue={maxBookingLength}
          onBlur={(event) => updateSettingHandler(event, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests / booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isLoading || isUpdatingSetting}
          defaultValue={maxGuestsPerBooking}
          onBlur={(event) => updateSettingHandler(event, "minGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isLoading || isUpdatingSetting}
          defaultValue={breakfastPrice}
          onBlur={(event) => updateSettingHandler(event, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
