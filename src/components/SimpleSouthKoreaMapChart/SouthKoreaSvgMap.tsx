import React from "react";
import PropTypes from "prop-types";
import "./map.css";
import mapData from "./mapData";

export const SouthKoreaSvgMap = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={mapData.viewBox}
            className={props.className}
            role={props.role}
            aria-label={mapData.label}
        >
            {props.childrenBefore}
            {mapData.locations.map((location, index) => {
                let count = props.data[location.name];
                if (!count) {
                    count = 0;
                }
                return (
                    <path
                        id={location.id}
                        name={location.name}
                        d={location.path}
                        className={
                            typeof props.locationClassName === "function"
                                ? props.locationClassName(location, index)
                                : props.locationClassName
                        }
                        tabIndex={
                            typeof props.locationTabIndex === "function"
                                ? props.locationTabIndex(location, index)
                                : props.locationTabIndex
                        }
                        role={props.locationRole}
                        aria-label={
                            typeof props.locationAriaLabel === "function"
                                ? props.locationAriaLabel(location, index)
                                : location.name
                        }
                        aria-checked={
                            props.isLocationSelected &&
                            props.isLocationSelected(location, index)
                        }
                        onMouseOver={props.onLocationMouseOver}
                        onMouseOut={props.onLocationMouseOut}
                        onMouseMove={props.onLocationMouseMove}
                        onClick={props.onLocationClick}
                        onKeyDown={props.onLocationKeyDown}
                        onFocus={props.onLocationFocus}
                        onBlur={props.onLocationBlur}
                        key={location.id}
                        fill={props.setColorByCount(count)}
                    />
                );
            })}
            {props.childrenAfter}
        </svg>
    );
};

SouthKoreaSvgMap.propTypes = {
    className: PropTypes.string,
    role: PropTypes.string,
    data: PropTypes.any,
    setColorByCount: PropTypes.func,

    // Locations properties
    locationClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    locationTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    locationRole: PropTypes.string,
    locationAriaLabel: PropTypes.func,
    onLocationMouseOver: PropTypes.func,
    onLocationMouseOut: PropTypes.func,
    onLocationMouseMove: PropTypes.func,
    onLocationClick: PropTypes.func,
    onLocationKeyDown: PropTypes.func,
    onLocationFocus: PropTypes.func,
    onLocationBlur: PropTypes.func,
    isLocationSelected: PropTypes.func,

    // Slots
    childrenBefore: PropTypes.node,
    childrenAfter: PropTypes.node,
};

SouthKoreaSvgMap.defaultProps = {
    className: "svg-map",
    role: "none", // No role for map
    locationClassName: "svg-map__location",
    locationTabIndex: "0",
    locationRole: "none",
};
