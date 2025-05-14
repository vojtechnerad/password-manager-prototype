import {
  Box,
  Button,
  Editable,
  Field,
  HStack,
  IconButton,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { LuCopy } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";
import { usePasswordStore } from "@/stores/passwordsStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ButtonToolbar from "./ButtonToolbar";

export default function PasswordDetails() {
  const { selectedPassword, updatePassword } = usePasswordStore();
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
    trigger,
    getValues,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      id: "",
      groupId: "",
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
        id: psw?.id,
        groupId: psw?.groupId ?? undefined,
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
    <VStack>
      <ButtonToolbar
        isDataChanged={isDirty}
        reset={() => reset()}
        save={async () => {
          const isValid = await trigger();
          if (!isValid) return;

          const values = getValues();
          updatePassword(values);
        }}
      />
      <Box
        as="form"
        onSubmit={handleSubmit(handleSaveData)}
        padding={4}
        width="100%"
      >
        <Editable.Root
          textAlign="start"
          size="lg"
          paddingBottom={4}
          value={title}
          onChange={(val) =>
            setValue("title", (val.target as HTMLInputElement).value ?? "")
          }
        >
          <Editable.Preview width="100%" borderRadius="xl" />
          <Editable.Input borderRadius="xl" />
        </Editable.Root>

        <Field.Root paddingBottom={4}>
          <Field.Label>URL služby</Field.Label>
          <Input
            borderRadius="xl"
            variant="subtle"
            placeholder="https://example.com"
            {...register("serviceUrl")}
          />
        </Field.Root>

        <Field.Root paddingBottom={4}>
          <Field.Label>Uživatelské jméno</Field.Label>
          <HStack width="100%">
            <Input
              variant="subtle"
              placeholder="me@example.com"
              borderRadius="xl"
              {...register("username")}
            />
            <IconButton
              borderRadius="xl"
              variant="subtle"
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
              borderRadius="xl"
              variant="subtle"
              placeholder="super-strong!Pa$$word1"
              {...register("password")}
            />
            <IconButton
              borderRadius="xl"
              variant="subtle"
              onClick={() => copyPasswordToClipboard("TODO")}
              aria-label="Search database"
            >
              <LuCopy />
            </IconButton>
          </HStack>
        </Field.Root>

        <Field.Root>
          <Field.Label>Popis</Field.Label>
          <Textarea
            placeholder="Popis"
            borderRadius="xl"
            variant="subtle"
            {...register("description")}
          />
        </Field.Root>
      </Box>
    </VStack>
  );
}
