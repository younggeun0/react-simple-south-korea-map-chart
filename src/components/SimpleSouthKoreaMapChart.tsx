import {
  cloneElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  useMemo,
  useState
} from "react";
import { SouthKoreaSvgMap } from "./SouthKoreaSvgMap";

export type MapDatum = {
  locale: string;
  count: number;
};

export type TooltipProps = {
  darkMode?: boolean;
  tooltipStyle?: CSSProperties;
  children?: ReactNode;
};

export type SimpleSouthKoreaMapChartProps = {
  darkMode?: boolean;
  data: MapDatum[];
  unit?: string;
  setColorByCount: (count: number) => string;
  customTooltip?: ReactElement<TooltipProps>;
};

type MapDataType = Record<string, number>;

const DefaultTooltip = ({ darkMode, tooltipStyle, children }: TooltipProps) => {
  return (
    <div
      style={{
        borderRadius: "10px",
        color: darkMode ? "#f5f5f5" : "#41444a",
        position: "fixed",
        minWidth: "80px",
        padding: "10px",
        border: `1px solid ${darkMode ? "#41444a" : "#f5f5f5"}`,
        backgroundColor: darkMode ? "#41444a" : "#fff",
        ...tooltipStyle
      }}
    >
      {children}
    </div>
  );
};

const hiddenTooltipStyle: CSSProperties = { display: "none" };

export const SimpleSouthKoreaMapChart = ({
  darkMode = false,
  data,
  unit = "개",
  setColorByCount,
  customTooltip
}: SimpleSouthKoreaMapChartProps) => {
  const [tooltipMsg, setTooltipMsg] = useState<string>("");
  const [tooltipStyle, setTooltipStyle] =
    useState<CSSProperties>(hiddenTooltipStyle);

  const mapData = useMemo<MapDataType>(() => {
    return data.reduce<MapDataType>((acc, item) => {
      acc[item.locale] = item.count;
      return acc;
    }, {});
  }, [data]);

  const handleLocationMouseOver = (
    event: React.MouseEvent<SVGPathElement>
  ) => {
    const location = event.currentTarget.getAttribute("name") ?? "";
    const count = mapData[location] ?? 0;
    setTooltipMsg(`${location}: ${count}${unit}`);
  };

  const handleLocationMouseOut = () => {
    setTooltipStyle(hiddenTooltipStyle);
  };

  const handleLocationMouseMove = (
    event: React.MouseEvent<SVGPathElement>
  ) => {
    setTooltipStyle({
      display: "block",
      top: event.clientY - 50,
      left: event.clientX - 60
    });
  };

  return (
    <>
      <SouthKoreaSvgMap
        data={mapData}
        setColorByCount={setColorByCount}
        onLocationMouseOver={handleLocationMouseOver}
        onLocationMouseOut={handleLocationMouseOut}
        onLocationMouseMove={handleLocationMouseMove}
      />
      {customTooltip
        ? cloneElement(customTooltip, {
            darkMode,
            tooltipStyle,
            children: tooltipMsg
          })
        : (
          <DefaultTooltip darkMode={darkMode} tooltipStyle={tooltipStyle}>
            {tooltipMsg}
          </DefaultTooltip>
        )}
    </>
  );
};
