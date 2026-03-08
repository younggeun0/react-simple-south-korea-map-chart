import type { FocusEvent, KeyboardEvent, MouseEvent, ReactNode } from "react";
import "./map.css";
import mapData from "./mapData";

type MapLocation = {
  id: string;
  name: string;
  path: string;
};

type LocationValue<T> = T | ((location: MapLocation, index: number) => T);

export type SouthKoreaSvgMapProps = {
  className?: string;
  role?: string;
  data: Record<string, number>;
  setColorByCount: (count: number) => string;
  locationClassName?: LocationValue<string>;
  locationTabIndex?: LocationValue<number | string>;
  locationRole?: string;
  locationAriaLabel?: (location: MapLocation, index: number) => string;
  onLocationMouseOver?: (event: MouseEvent<SVGPathElement>) => void;
  onLocationMouseOut?: (event: MouseEvent<SVGPathElement>) => void;
  onLocationMouseMove?: (event: MouseEvent<SVGPathElement>) => void;
  onLocationClick?: (event: MouseEvent<SVGPathElement>) => void;
  onLocationKeyDown?: (event: KeyboardEvent<SVGPathElement>) => void;
  onLocationFocus?: (event: FocusEvent<SVGPathElement>) => void;
  onLocationBlur?: (event: FocusEvent<SVGPathElement>) => void;
  isLocationSelected?: (location: MapLocation, index: number) => boolean;
  childrenBefore?: ReactNode;
  childrenAfter?: ReactNode;
};

const resolveClassName = (
  value: LocationValue<string>,
  location: MapLocation,
  index: number
) => {
  return typeof value === "function" ? value(location, index) : value;
};

const resolveTabIndex = (
  value: LocationValue<number | string>,
  location: MapLocation,
  index: number
) => {
  const resolved = typeof value === "function" ? value(location, index) : value;
  return typeof resolved === "string" ? Number.parseInt(resolved, 10) : resolved;
};

export const SouthKoreaSvgMap = ({
  className = "svg-map",
  role = "none",
  data,
  setColorByCount,
  locationClassName = "svg-map__location",
  locationTabIndex = 0,
  locationRole = "none",
  locationAriaLabel,
  onLocationMouseOver,
  onLocationMouseOut,
  onLocationMouseMove,
  onLocationClick,
  onLocationKeyDown,
  onLocationFocus,
  onLocationBlur,
  isLocationSelected,
  childrenBefore,
  childrenAfter
}: SouthKoreaSvgMapProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={mapData.viewBox}
      className={className}
      role={role}
      aria-label={mapData.label}
    >
      {childrenBefore}
      {mapData.locations.map((location, index) => {
        const typedLocation = location as MapLocation;
        const count = data[typedLocation.name] ?? 0;

        return (
          <path
            id={typedLocation.id}
            name={typedLocation.name}
            d={typedLocation.path}
            className={resolveClassName(locationClassName, typedLocation, index)}
            tabIndex={resolveTabIndex(locationTabIndex, typedLocation, index)}
            role={locationRole}
            aria-label={
              locationAriaLabel
                ? locationAriaLabel(typedLocation, index)
                : typedLocation.name
            }
            aria-checked={
              isLocationSelected
                ? isLocationSelected(typedLocation, index)
                : undefined
            }
            onMouseOver={onLocationMouseOver}
            onMouseOut={onLocationMouseOut}
            onMouseMove={onLocationMouseMove}
            onClick={onLocationClick}
            onKeyDown={onLocationKeyDown}
            onFocus={onLocationFocus}
            onBlur={onLocationBlur}
            key={typedLocation.id}
            fill={setColorByCount(count)}
          />
        );
      })}
      {childrenAfter}
    </svg>
  );
};
