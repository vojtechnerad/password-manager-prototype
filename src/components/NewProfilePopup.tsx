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
  const [open, setOpen] = useState(false);
  const { addGroup } = usePasswordStore();

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button borderRadius="2xl">Nový profil</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Přidání nového profilu</Dialog.Title>
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
                <Button variant="outline">Zrušit</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={() => {
                  addGroup(name);
                  setOpen(false);
                }}
              >
                Uložit
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
