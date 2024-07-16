import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  InviteListing,
  InviteT,
} from "../../src/components/Invite/InviteListing/InviteListing";

const testInviteData: InviteT = {
  createdAt: "12345",
  groups: [{ id: "1321234", name: "test group" }],
  inviteCode: "3fewafawe",
  invitePassword: "dfdafdafsad",
  status: "pending",
};

describe("InviteListing", () => {
  it("should render listing when invite is provided ", () => {
    render(<InviteListing invite={testInviteData} />);

    const row = screen.getByRole("row");

    expect(row).toBeInTheDocument();
  });
  it("should render listing with missing props ", () => {
    render(<InviteListing />);

    const row = screen.getByRole("row");

    expect(row).toBeInTheDocument();
  });

  it("should render listing with invalid data ", () => {
    render(<InviteListing invite={{ id: 12312, test: 12314 }} />);

    const row = screen.getByRole("row");

    expect(row).toBeInTheDocument();
  });
});
