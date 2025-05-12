import { usePasswordStore } from "@/stores/passwordsStore";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useState } from "react";

export default function NewProfilePopup() {
  const [name, setName] = useState("");
  const { addGroup } = usePasswordStore();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Nový profil</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Field.Root>
                <Field.Label>Název profilu</Field.Label>
                <Input
                  placeholder="Název profilu"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={() => {
                  addGroup(name);
                }}
              >
                Save
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
