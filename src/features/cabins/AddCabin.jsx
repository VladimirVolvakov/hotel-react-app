import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalWindowHandler = () => setIsModalOpen(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((curState) => !curState)}>
        Add new cabin
      </Button>

      {isModalOpen && (
        <Modal onClose={closeModalWindowHandler}>
          <CreateCabinForm onCloseModal={closeModalWindowHandler} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
