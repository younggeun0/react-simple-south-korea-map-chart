# react-simple-korea-map-chart 🇰🇷

행정구역별 통계 데이터를 여러 색으로 시각화해주는 간단한 대한민국 지도 리액트 컴포넌트입니다.

<img src="https://raw.githubusercontent.com/younggeun0/younggeun0.github.io/cb8cb489e820d67a986b45995146dd1cbf7e7a55/_posts/img/toyProjects/react-simple-south-korea-map-chart/01.png" alt="demo" style="width:400px;"/>

## 설치

```bash
npm i react-simple-south-korea-map-chart
```

## 사용법

```tsx
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";

const data = [
  { locale: "부산광역시", count: 1500 },
  { locale: "서울특별시", count: 10000 }
];

function App() {
  const setColorByCount = (count: number) => {
    if (count === 0) return "#F1F1F1";
    if (count > 5000) return "#79D3C4";
    if (count > 3000) return "#43cdb6";
    if (count > 1000) return "#61CDBB";
    return "#ebfffd";
  };

  return (
    <SimpleSouthKoreaMapChart
      setColorByCount={setColorByCount}
      data={data}
    />
  );
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| data | Array<{ locale: string; count: number }> | **필수** | 행정구역별 데이터 |
| setColorByCount | (count: number) => string | **필수** | 데이터 `count`값에 따라 표시할 색상을 반환하는 콜백 |
| darkMode | boolean | false | 다크모드 여부(값에 따라 Default Tooltip 색상이 변경됨) |
| customTooltip | ReactElement | &lt;DefaultTooltip /&gt; | 커스텀 툴팁 컴포넌트 |
| unit | string | "개" | 툴팁에 count 뒤에 표시될 단위 |

## 커스텀 툴팁 사용하기

```tsx
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

<SimpleSouthKoreaMapChart
  darkMode={darkMode}
  setColorByCount={setColorByCount}
  data={data}
  customTooltip={<CustomTooltip />}
/>
```

## 개발

```bash
npm i
npm run demo
```

## 품질 점검

```bash
npm run typecheck
npm run test
npm run build
```

## 참고 모듈

- [react-svg-map (MIT)](https://github.com/VictorCazanave/react-svg-map)
- [svg-maps (CC BY 4.0)](https://github.com/VictorCazanave/svg-maps/tree/master/packages/south-korea)
