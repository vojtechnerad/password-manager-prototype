import {
  Editable,
  Field,
  HStack,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";
import { usePasswordStore } from "@/stores/passwordsStore";

export default function PasswordDetails() {
  const { selectedPassword } = usePasswordStore();
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    email: "",
    password: "",
    description: "",
  });

  const copyUsernameToClipboard = async (username: string) => {
    try {
      await navigator.clipboard.writeText(username);
      toaster.create({
        title: "Uživatelské jméno zkopírováno do schránky",
        type: "success",
      });
    } catch {}
  };

  const copyPasswordToClipboard = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      toaster.create({
        title: "Toast Title",
        description: "Toast Description",
      });
    } catch {}
  };

  if (!selectedPassword()) {
    return <div>Zvolte heslo</div>;
  }

  return (
    <div>
      <span>psw details {selectedPassword()?.toString()}</span>
      <Editable.Root
        textAlign="start"
        defaultValue="Nové heslo"
        size="lg"
        paddingBottom={4}
      >
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>

      <Field.Root paddingBottom={4}>
        <Field.Label>URL služby</Field.Label>
        <Input placeholder="https://example.com" />
      </Field.Root>

      <Field.Root paddingBottom={4}>
        <Field.Label>Email/uživatelské jméno</Field.Label>
        <HStack width="100%">
          <Input placeholder="me@example.com" />
          <IconButton
            onClick={() => copyUsernameToClipboard("TODO")}
            aria-label="Search database"
          >
            <LuCopy />
          </IconButton>
        </HStack>
      </Field.Root>

      <Field.Root paddingBottom={4}>
        <Field.Label>Heslo</Field.Label>
        <HStack width="100%">
          <Input placeholder="super-strong!Pa$$word1" />
          <IconButton
            onClick={() => copyPasswordToClipboard("TODO")}
            aria-label="Search database"
          >
            <LuCopy />
          </IconButton>
        </HStack>
      </Field.Root>

      <Field.Root>
        <Field.Label>Popis</Field.Label>
        <Textarea placeholder="Popis" />
      </Field.Root>
    </div>
  );
}
