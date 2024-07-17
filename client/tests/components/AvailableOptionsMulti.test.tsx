import { render, screen, fireEvent } from "@testing-library/react";
import AvailableOptionsMulti from "../../src/components/AvailableOptions/AvailableOptionsMulti";
import "@testing-library/jest-dom/vitest";

const testOptions = [
  {
    value: "option1",
    label: "option1",
  },
  {
    value: "option2",
    label: "option2",
  },
  {
    value: "option3",
    label: "option3",
  },
];

describe("AvailableOptionsMulti", () => {
  it("should render with no props", () => {
    //@ts-expect-error testing no prop render
    render(<AvailableOptionsMulti />);

    const component = screen.getByTestId("available-options-multi");

    expect(component).toBeInTheDocument();
  });

  it("should contain options passed in", async () => {
    render(
      <AvailableOptionsMulti
        title="test title"
        options={testOptions}
      />
    );

    const component = screen.getByText("Select...");
    fireEvent.mouseDown(component);

    testOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("should callback on change", async () => {
    const callback = vi.fn();

    render(
      <AvailableOptionsMulti
        callback={callback}
        title="test title"
        options={testOptions}
      />
    );

    const component = screen.getByText(/select/i);
    fireEvent.mouseDown(component);

    fireEvent.click(screen.getByText(/option2/i));

    fireEvent.mouseDown(screen.getByText(/option2/i));
    fireEvent.click(screen.getByText(/option3/i));

    expect(callback).toBeCalledTimes(2);
  });
});
