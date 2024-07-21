interface GroupData {
  role: string[];
}

export default function isInviteAllowed(data: GroupData) {
  if (data.role.includes("invite")) return true;

  return false;
}
