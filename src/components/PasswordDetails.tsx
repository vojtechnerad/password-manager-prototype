import { Field, IconButton, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";

export default function PasswordDetails() {
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

  return (
    <div>
      <Field.Root>
        <Field.Label>URL služby</Field.Label>
        <Input placeholder="https://example.com" />
      </Field.Root>

      <Field.Root>
        <Field.Label>Email/uživatelské jméno</Field.Label>
        <Input placeholder="me@example.com" />
        <IconButton
          onClick={() => copyUsernameToClipboard("TODO")}
          aria-label="Search database"
        >
          <LuSearch />
        </IconButton>
      </Field.Root>

      <Field.Root>
        <Field.Label>Heslo</Field.Label>
        <Input placeholder="super-strong!Pa$$word1" />
        <IconButton
          onClick={() => copyPasswordToClipboard("TODO")}
          aria-label="Search database"
        >
          <LuSearch />
        </IconButton>
      </Field.Root>

      <Field.Root>
        <Field.Label>Popis</Field.Label>
        <Textarea placeholder="Popis" />
      </Field.Root>
    </div>
  );
}
