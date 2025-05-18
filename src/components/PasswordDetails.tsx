import {
  Box,
  createListCollection,
  Editable,
  Field,
  HStack,
  IconButton,
  Input,
  Portal,
  Select,
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
  const { groups, selectedPassword, updatePassword } = usePasswordStore();

  const {
    register,
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
  const groupId = watch("groupId");

  const groupsList = createListCollection({
    items: [
      { label: "Nezařazeno", value: "" },
      ...groups.map((grp) => {
        return { label: grp.name, value: grp.id };
      }),
    ],
  });

  useEffect(() => {
    const psw = selectedPassword();

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
    <VStack>
      <ButtonToolbar
        isDataChanged={isDirty}
        reset={() => reset()}
        save={async () => {
          const isValid = await trigger();
          if (!isValid) return;

          const values = getValues();
          updatePassword(values);
          toaster.create({
            title: "Záznam úspěšně aktualizován",
            type: "success",
          });
        }}
      />
      <Box as="form" padding={4} width="100%">
        <Editable.Root
          textAlign="start"
          size="lg"
          paddingBottom={4}
          value={title}
          onChange={(val) =>
            setValue("title", (val.target as HTMLInputElement).value ?? "", {
              shouldDirty: true,
            })
          }
        >
          <Editable.Preview width="100%" borderRadius="xl" />
          <Editable.Input borderRadius="xl" />
        </Editable.Root>

        <Select.Root
          collection={groupsList}
          width="fit-content"
          value={[groupId]}
          onValueChange={(e) => {
            setValue("groupId", e.value[0], { shouldDirty: true });
          }}
        >
          <Select.HiddenSelect />
          <Select.Label>Skupina</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Skupina" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {groupsList.items.map((grp) => (
                  <Select.Item item={grp} key={grp.value}>
                    {grp.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

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
              onClick={() => copyUsernameToClipboard(getValues().username)}
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
              onClick={() => copyPasswordToClipboard(getValues().password)}
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
