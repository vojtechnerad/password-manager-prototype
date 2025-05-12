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
import { useEffect } from "react";

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
    reset,
    watch,
    setValue,
    // formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      username: "",
      password: "",
      serviceUrl: "",
      description: "",
    },
  });

  const title = watch("title");

  useEffect(() => {
    const psw = selectedPassword();
    console.log(psw);
    if (psw) {
      reset({
        title: psw?.title,
        serviceUrl: psw?.serviceUrl,
        username: psw?.username,
        password: psw?.password,
        description: psw?.description,
      });
    }
  }, [selectedPassword(), reset]);
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
        size="lg"
        paddingBottom={4}
        value={title}
        onChange={(val) =>
          setValue("title", (val.target as HTMLInputElement).value ?? "")
        }
      >
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>

      <Field.Root paddingBottom={4}>
        <Field.Label>URL služby</Field.Label>
        <Input placeholder="https://example.com" {...register("serviceUrl")} />
      </Field.Root>

      <Field.Root paddingBottom={4}>
        <Field.Label>Uživatelské jméno</Field.Label>
        <HStack width="100%">
          <Input placeholder="me@example.com" {...register("username")} />
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
          <Input
            placeholder="super-strong!Pa$$word1"
            {...register("password")}
          />
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
        <Textarea placeholder="Popis" {...register("description")} />
      </Field.Root>

      <Button colorScheme="teal" type="submit">
        Uložit
      </Button>
    </Box>
  );
}
