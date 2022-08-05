# react-simple-korea-map-chart 🇰🇷

행정구역별 통계 데이터를 여러 색으로 시각화해주는 간단한 대한민국 지도 리액트 컴포넌트입니다.

<img src="https://raw.githubusercontent.com/younggeun0/younggeun0.github.io/cb8cb489e820d67a986b45995146dd1cbf7e7a55/_posts/img/toyProjects/react-simple-south-korea-map-chart/01.png" alt="demo" style="width:400px;"/>

## 데모

[react-simple-south-korea-map-chart](https://younggeun0.github.io/projects/react-simple-south-korea-map-chart/index.html)

## 설치

```bash
npm i react-simple-south-korea-map-chart
```

## 사용법

```js
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";

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

    return (
        <SimpleSouthKoreaMapChart
            setColorByCount={setColorByCount}
            data={data}
        />
    );
}

export default App;
```

| Prop            | Type                     | Default                  | Description                                            |
| --------------- | ------------------------ | ------------------------ | ------------------------------------------------------ |
| data            | Array<{ locale: string; count: number }> | **필수**                 | 행정구역별 데이터                                      |
| setColorByCount | Function                 | **필수**                 | 데이터 `count`값에 따라 표시할 색상을 반환하는 콜백    |
| darkMode        | boolean                  | false                    | 다크모드 여부(값에 따라 Default Tooltip 색상이 변경됨) |
| customTooltip   | JSX.element              | &lt;DefaultTooltip /&gt; | 커스텀 툴팁 컴포넌트
| unit   | String              | "개" | 툴팁에 count 뒤에 표시될 단위

## 커스텀 툴팁 사용하기

```js
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

...
<SimpleSouthKoreaMapChart
    darkMode={darkMode}
    setColor={setColor}
    data={data}
    customTooltip={<CustomTooltip />}
/>

```

## 데모 실행

```bash
npm i
npm run demo
```

## 참고 모듈

-   [react-svg-map (MIT)](https://github.com/VictorCazanave/react-svg-map)
-   [svg-maps (CC BY 4.0)](https://github.com/VictorCazanave/svg-maps/tree/master/packages/south-korea)
