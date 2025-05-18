import { ProfileIcon as ProfileIconEnum } from "@/enums/ProfileIcon";
import { usePasswordStore } from "@/stores/passwordsStore";
import {
  Box,
  Button,
  CloseButton,
  createListCollection,
  Dialog,
  Field,
  Flex,
  Input,
  Portal,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ProfileIcon from "./ProfileIcon";

type Props = {
  mode: "create" | "edit";
  button: React.ReactNode;
};

export default function ProfilePopup({ mode, button }: Props) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<ProfileIconEnum>(ProfileIconEnum.Password);
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addGroup } = usePasswordStore();

  const title =
    mode === "create" ? "Přidání nového profilu" : "Editace profilu";

  const iconList = [
    { value: ProfileIconEnum.Password },
    { value: ProfileIconEnum.Work },
    { value: ProfileIconEnum.School },
  ];
  const icons = createListCollection({
    items: iconList,
  });

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>{button}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex>
                <Field.Root flex={1}>
                  <Input
                    placeholder="Název profilu"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Field.Root>

                <Select.Root
                  width={20}
                  collection={icons}
                  defaultValue={[ProfileIconEnum.School]}
                  onValueChange={(e) => {
                    setIcon(e.value[0] as ProfileIconEnum);
                  }}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Flex alignItems="center">
                        <Box paddingRight={1}>
                          <ProfileIcon iconId={icon ?? undefined} />
                        </Box>
                      </Flex>
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal container={contentRef}>
                    <Select.Positioner>
                      <Select.Content>
                        {icons.items.map((iconValue) => (
                          <Select.Item item={iconValue} key={iconValue.value}>
                            <Flex alignItems="center">
                              <Box paddingRight={1}>
                                <ProfileIcon iconId={iconValue.value} />
                              </Box>
                            </Flex>
                            {iconValue.value === icon && (
                              <Select.ItemIndicator />
                            )}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Zrušit</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={() => {
                  addGroup(name, icon);
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
