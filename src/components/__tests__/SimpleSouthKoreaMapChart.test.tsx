import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  SimpleSouthKoreaMapChart,
  type MapDatum,
  type TooltipProps
} from "../SimpleSouthKoreaMapChart";

const sampleData: MapDatum[] = [
  { locale: "서울특별시", count: 100 },
  { locale: "부산광역시", count: 0 }
];

describe("SimpleSouthKoreaMapChart", () => {
  it("applies fill color from setColorByCount", () => {
    const setColorByCount = (count: number) =>
      count === 100 ? "rgb(1, 2, 3)" : "rgb(4, 5, 6)";

    const { container } = render(
      <SimpleSouthKoreaMapChart
        data={sampleData}
        setColorByCount={setColorByCount}
      />
    );

    const seoul = container.querySelector('path[name="서울특별시"]');
    const jeju = container.querySelector('path[name="제주특별자치도"]');

    expect(seoul).toHaveAttribute("fill", "rgb(1, 2, 3)");
    expect(jeju).toHaveAttribute("fill", "rgb(4, 5, 6)");
  });

  it("shows and hides default tooltip with location and unit", () => {
    const { container } = render(
      <SimpleSouthKoreaMapChart
        data={sampleData}
        setColorByCount={() => "#000"}
        unit="명"
      />
    );

    const seoul = container.querySelector('path[name="서울특별시"]');
    if (!seoul) {
      throw new Error("서울특별시 path not found");
    }

    fireEvent.mouseOver(seoul);
    fireEvent.mouseMove(seoul, { clientX: 300, clientY: 200 });

    expect(screen.getByText("서울특별시: 100명")).toBeInTheDocument();

    fireEvent.mouseOut(seoul);

    const tooltip = screen.getByText("서울특별시: 100명").closest("div");
    expect(tooltip).toHaveStyle({ display: "none" });
  });

  it("injects props into custom tooltip", () => {
    const CustomTooltip = ({ children, darkMode }: TooltipProps) => {
      return (
        <div data-testid="custom-tooltip" data-dark={String(darkMode)}>
          {children}
        </div>
      );
    };

    const { container } = render(
      <SimpleSouthKoreaMapChart
        data={sampleData}
        setColorByCount={() => "#000"}
        darkMode
        customTooltip={<CustomTooltip darkMode={false} tooltipStyle={{}} />}
      />
    );

    const seoul = container.querySelector('path[name="서울특별시"]');
    if (!seoul) {
      throw new Error("서울특별시 path not found");
    }

    fireEvent.mouseOver(seoul);

    const tooltip = screen.getByTestId("custom-tooltip");
    expect(tooltip).toHaveAttribute("data-dark", "true");
    expect(tooltip).toHaveTextContent("서울특별시: 100개");
  });
});
