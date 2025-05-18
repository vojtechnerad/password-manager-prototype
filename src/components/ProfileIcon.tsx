import { ProfileIcon as ProfileIconEnum } from "@/enums/ProfileIcon";
import { FaUserTie } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { PiPassword } from "react-icons/pi";

type Props = {
  iconId?: ProfileIconEnum;
};

export default function ProfileIcon({ iconId }: Props) {
  if (iconId === ProfileIconEnum.Work) return <FaUserTie />;
  if (iconId === ProfileIconEnum.School) return <IoSchool />;
  if (iconId === ProfileIconEnum.Password) return <PiPassword />;

  return;
}
