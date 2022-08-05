import { useState } from "react";
import { SimpleSouthKoreaMapChart } from "./components";

const data = [
    { locale: "부산광역시", count: 1500 },
    { locale: "대구광역시", count: 3000 },
    { locale: "대전광역시", count: 400 },
    { locale: "강원도", count: 2500 },
    { locale: "광주광역시", count: 1000 },
    { locale: "경기도", count: 4000 },
    { locale: "인천광역시", count: 2200 },
    { locale: "제주특별자치도", count: 100 },
    { locale: "충청북도", count: 49 },
    { locale: "경상북도", count: 2000 },
    { locale: "전라북도", count: 3300 },
    { locale: "세종특별자치시", count: 110 },
    { locale: "충청남도", count: 10 },
    { locale: "경상남도", count: 0 },
    { locale: "전라남도", count: 250 },
    { locale: "울산광역시", count: 100 },
    { locale: "서울특별시", count: 10000 },
];

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [useCustomTooltip, setUseCustomTooltip] = useState<boolean>(false);

    const handleClickDarkMode = () => {
        setDarkMode(!darkMode);
    };
    const handleClickCustomTooltip = () => {
        setUseCustomTooltip(!useCustomTooltip);
    };

    const setColorByCount = (count: number) => {
        if (count === 0) return "#F1F1F1";
        if (count > 5000) return "#79D3C4";
        if (count > 3000) return "#43cdb6";
        if (count > 1000) return "#61CDBB";
        if (count > 200) return "#91D9CD";
        if (count > 100) return "#A9DFD6";
        if (count > 50) return "#C1E5DF";
        if (count > 5) return "#D9EBE8";
        else return "#ebfffd";
    };

    const CustomTooltip = ({ darkMode, tooltipStyle, children }: any) => {
        return (
            <div
                style={{
                    borderRadius: 0,
                    color: "yellow",
                    position: "fixed",
                    minWidth: "80px",
                    padding: "10px",
                    border: `1px solid ${darkMode ? "#41444a" : "#f5f5f5"}`,
                    backgroundColor: "blue",
                    ...tooltipStyle,
                }}
            >
                {children}
            </div>
        );
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "20px",
                background: darkMode ? "black" : "white",
            }}
        >
            <h1 style={{ color: darkMode ? "white" : "black" }}>
                react-simple-south-korea-map-chart
            </h1>
            <button
                onClick={handleClickDarkMode}
                style={{ marginRight: "10px" }}
            >
                Change Mode {darkMode ? "🌝" : "🌚"}
            </button>
            <button onClick={handleClickCustomTooltip}>
                {useCustomTooltip ? "Use DefaultTooltip" : "Use CustomTooltip"}
                💬
            </button>
            <SimpleSouthKoreaMapChart
                darkMode={darkMode}
                setColorByCount={setColorByCount}
                data={data}
                customTooltip={useCustomTooltip && <CustomTooltip />}
            />
        </div>
    );
}

export default App;
