import {
  Box,
  Button,
  Editable,
  Field,
  HStack,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { LuCopy } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";
import { usePasswordStore } from "@/stores/passwordsStore";
import { useForm } from "react-hook-form";

export default function PasswordDetails() {
  const { selectedPassword } = usePasswordStore();
  // const [formData, setFormData] = useState({
  //   url: "",
  //   name: "",
  //   email: "",
  //   password: "",
  //   description: "",
  // });

  const {
    register,
    handleSubmit,
    // reset,
    // formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });
  // defaultValues ||

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

  const handleSaveData = (data: unknown) => {
    console.log(data);
  };

  if (!selectedPassword()) {
    return <div>Zvolte heslo</div>;
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleSaveData)}>
      <Editable.Root
        textAlign="start"
        defaultValue="Nové heslo"
        size="lg"
        paddingBottom={4}
      >
        <Editable.Preview />
        <Editable.Input {...register("name")} />
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

      <Button colorScheme="teal" type="submit">
        Uložit
      </Button>
    </Box>
  );
}
