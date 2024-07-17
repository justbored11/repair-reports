import { it, expect, describe, vi, assert } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import AvailableOptions, {
  OptionT,
} from "../../src/components/AvailableOptions/AvailableOptions";

const testOptions: OptionT[] = [
  { label: "option1", value: "option1" },
  { label: "option2", value: "option2" },
  { label: "option3", value: "option3" },
];

describe("AvailableOptions component", () => {
  it("should not crash when no options given", () => {
    render(<AvailableOptions />);
    const component = screen.getByTestId("available-options-single");
    expect(component).toBeInTheDocument();
    expect(1).toBeTruthy();
  });
  it("should display original option", () => {
    render(
      <AvailableOptions
        title="title text"
        options={testOptions}
      />
    );
    const component = screen.getByText("option1", { exact: false });
    expect(component).toBeInTheDocument();
  });
});
