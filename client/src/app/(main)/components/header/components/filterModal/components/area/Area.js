"use Client";

import "./Area.scss";

export default function Area({ selectValue, setSelectValue }) {
  function selectArea(targetValue) {
    if (selectValue.area === targetValue) {
      setSelectValue({ ...selectValue, area: null });
      return;
    }
    setSelectValue({ ...selectValue, area: targetValue });
  }

  return (
    <div className="area">
      <div className="areaTitle">구역으로 찾기</div>
      <div className="areaSubTitle">
        원하시는 구역을 선택하시면, <br />
        해당 구역의 팝업스토어를 모두 확인하실 수 있습니다.
      </div>
      <svg
        id="seoulMap"
        className="seoulMap"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1217.74 1077.01"
      >
        <g
          id="Gangdong_gu"
          className={`region ${
            selectValue.area === "강동구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("강동구");
          }}
        >
          <polygon
            className="land"
            points="1129.92 662.36 1217.74 617.95 1200.11 518.19 1042.97 561.33 1014.98 605.42 1095.56 745.33 1129.92 662.36"
          />
          <polygon
            className="shadow"
            points="1217.54 636.58 1217.74 617.95 1214.78 619.46 1129.92 662.36 1095.64 745.12 1102.31 759.02 1138.43 676.93 1217.54 636.58"
          />
          <text className="regionText" x="1090" y="610">
            강동구
          </text>
        </g>
        <g
          id="Songpa_gu"
          className={`region ${
            selectValue.area === "송파구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("송파구");
          }}
        >
          <polygon
            className="land"
            points="1010.47 612.16 950.64 705.74 875.53 677.32 1022.02 897.68 1048.28 937.19 1156.35 795.05 1097.89 758.5 1010.47 612.16"
          />
          <polygon
            className="shadow"
            points="1048.88 957.86 1155.14 816.68 1156.35 795.05 1048.28 937.19 1048.88 957.86"
          />
          <text className="regionText" x="1000" y="800">
            송파구
          </text>
        </g>
        <g
          id="Gangnam_gu"
          className={`region ${
            selectValue.area === "강남구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("강남구");
          }}
        >
          <polygon
            className="land"
            points="1042.08 940.51 1013.93 898.16 864.3 673.08 787.1 643.86 721.86 689.95 812.33 877.42 896.52 877.42 959.65 951.74 1042.08 940.51"
          />
          <polygon
            className="shadow"
            points="1042.08 940.51 959.65 951.74 962.47 975.21 1043.2 963.35 1042.08 940.51"
          />
          <text className="regionText" x="820" y="800">
            강남구
          </text>
        </g>
        <g
          id="Seocho_gu"
          className={`region ${
            selectValue.area === "서초구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("서초구");
          }}
        >
          <polygon
            className="land"
            points="807.93 884.42 716.06 694.04 639.67 748.01 609.98 725.84 638.92 819.85 673.53 931.85 683.82 958.06 738.13 957.11 774.22 918.68 781.8 1020.45 866.87 1054.67 955.69 992.49 954.76 956.8 893.28 884.42 807.93 884.42"
          />
          <polygon
            className="shadow"
            points="738.13 957.11 683.82 958.06 674.16 933.27 684.2 987.33 746.15 985.5 776.51 949.43 774.22 918.68 738.13 957.11"
          />
          <polygon
            className="shadow"
            points="958.83 970.34 954.76 956.8 955.12 970.86 955.69 992.49 866.87 1054.67 781.8 1020.45 782.03 1042.71 868.09 1077.01 961.63 1010.98 958.83 970.34"
          />
          <text className="regionText" x="680" y="850">
            서초구
          </text>
        </g>
        <g
          id="Gwanak_gu"
          className={`region ${
            selectValue.area === "관악구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("관악구");
          }}
        >
          <polygon
            className="land"
            points="422.03 843.25 468.45 982.51 520.32 980.44 522.38 1015.5 564.86 1018.28 666.2 931.84 633.87 827.23 416.7 827.23 422.03 843.25"
          />
          <polygon
            className="shadow"
            points="666.2 931.84 564.86 1018.28 522.38 1015.5 521.79 1037.86 567.24 1042.11 666.47 958.54 666.2 931.84"
          />
          <polygon
            className="shadow"
            points="468.45 982.51 471 1010.28 521.97 1008.47 520.32 980.44 468.45 982.51"
          />
          <text className="regionText" x="510" y="910">
            관악구
          </text>
        </g>
        <g
          id="Dongjak_gu"
          className={`region ${
            selectValue.area === "동작구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("동작구");
          }}
        >
          <polygon
            className="land"
            points="631.71 820.23 600.15 718.09 579.15 702.35 492.05 711.19 418.43 820.23 631.71 820.23"
          />
          <polygon
            className="land"
            points="525.25 661.97 518.61 671.71 536.57 670.44 525.25 661.97"
          />
          <text className="regionText" x="500" y="770">
            동작구
          </text>
        </g>
        <g
          id="Geumcheon_gu"
          className={`region ${
            selectValue.area === "금천구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("금천구");
          }}
        >
          <polygon
            className="land"
            points="405.29 827.23 405.54 826.85 326.3 822.05 316.04 821.43 394.8 1017.34 461.85 1017.34 462.45 986.65 416.32 848.23 409.32 827.23 405.29 827.23"
          />
          <polygon
            className="shadow"
            points="461.85 1017.34 394.8 1017.34 315.87 821.43 316.22 843.06 391.92 1039.73 464.01 1039.39 464.6 1013.43 462.45 986.65 461.85 1017.34"
          />
          <text className="regionText" x="360" y="920">
            금천구
          </text>
        </g>
        <g
          id="Yeongdeungpo_gu"
          className={`region ${
            selectValue.area === "영등포구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("영등포구");
          }}
        >
          <polygon
            className="land"
            points="347.2 712.84 345.82 717.25 345.48 719.91 344.99 719.92 315.41 814.38 317.77 814.52 410.05 820.12 482 712.65 466.39 714.22 461.59 615.07 368.04 545.23 359.63 610.33 346.39 712.87 347.2 712.84"
          />
          <polygon
            className="land"
            points="499.71 673.6 508.9 672.95 519.08 657.98 499.31 643.22 499.71 673.6"
          />
          <text className="regionText" x="360" y="720">
            영등포구
          </text>
        </g>
        <g
          id="Guro_gu"
          className={`region ${
            selectValue.area === "구로구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("구로구");
          }}
        >
          <polygon
            className="land"
            points="308.21 813.94 337.58 720.16 170.61 725.54 175.24 875.7 260.14 884.29 279.46 814.1 308.21 813.94"
          />
          <polygon
            className="shadow"
            points="308.21 813.94 279.46 814.1 260.14 884.29 175.24 875.7 175.16 905.37 266.71 913.6 281.8 841.13 302.05 841.28 308.21 813.94"
          />
          <text className="regionText" x="210" y="800">
            구로구
          </text>
        </g>
        <g
          id="Yangcheon_gu"
          className={`region ${
            selectValue.area === "양천구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("양천구");
          }}
        >
          <polygon
            className="land"
            points="344.37 552.15 191.43 621.28 168.3 650.87 168.31 651.03 170.38 718.29 339.3 713.09 353.07 606.5 361.06 544.61 344.37 552.15"
          />
          <text className="regionText" x="230" y="660">
            양천구
          </text>
        </g>
        <g
          id="Gangseo_gu"
          className={`region ${
            selectValue.area === "강서구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("강서구");
          }}
        >
          <polygon
            className="land"
            points="270.22 472.21 108.81 376.97 0 542.24 110.59 614.95 188.45 614.95 239.34 591.95 358.48 538.1 270.22 472.21"
          />
          <polygon
            className="shadow"
            points="188.45 614.95 110.59 614.95 0 542.24 0 570.37 113.16 644.13 165.71 644.13 188.45 614.95"
          />
          <text className="regionText" x="130" y="520">
            강서구
          </text>
        </g>
        <g
          id="Gwangjin_gu"
          className={`region ${
            selectValue.area === "광진구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("광진구");
          }}
        >
          <polygon
            className="land"
            points="892.51 548.16 869.38 627.43 866.09 638.68 937.63 665.76 1008.82 545.56 986.79 542.17 977.49 540.61 976.48 477.9 912.61 479.3 909.05 491.47 892.51 548.16 892.51 548.16"
          />
          <polygon
            className="shadow"
            points="977.49 540.61 979.28 540.91 978.78 489.77 976.23 478.03 977.49 540.61"
          />
          <text className="regionText" x="900" y="580">
            광진구
          </text>
        </g>
        <g
          id="Jungnang_gu"
          className={`region ${
            selectValue.area === "중랑구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("중랑구");
          }}
        >
          <polygon
            className="land"
            points="872.94 367.8 896.89 367.8 896.95 367.8 897.35 370.81 912.7 472.37 979.14 470.96 1033.36 455.47 1033.36 321.61 1010.63 312.77 868.19 332.42 872.94 367.8"
          />
          <polygon
            className="shadow"
            points="980.18 489.07 1032.26 474.2 1033.37 455.47 979.28 470.92 980.18 489.07"
          />
          <text className="regionText" x="930" y="400">
            중랑구
          </text>
        </g>
        <g
          id="Nowon_gu"
          className={`region ${
            selectValue.area === "노원구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("노원구");
          }}
        >
          <polygon
            className="land"
            points="841.57 293.6 851.44 306.66 865.81 325.68 996.59 307.1 996.59 283.04 1017.02 275.89 1017.02 214.64 966.06 200.37 963.83 144.57 977.14 137.41 976.13 99.02 991.48 86.73 991.48 51.64 902.38 1.29 881.63 38.83 854.98 38.45 820.89 252.05 819.04 263.63 841.57 293.6"
          />
          <polygon
            className="shadow"
            points="976.78 123.37 990.18 108.5 991.45 86.76 976.13 99.02 976.78 123.37"
          />
          <polygon
            className="shadow"
            points="963.83 144.57 964.77 168.21 978.19 161.27 977.11 137.41 963.83 144.57"
          />
          <polygon
            className="shadow"
            points="1011.91 273.33 991.48 280.48 991.48 304.54 1012.29 296.64 1011.91 273.33"
          />
          <text className="regionText" x="860" y="200">
            노원구
          </text>
        </g>
        <g
          id="Dobong_gu"
          className={`region ${
            selectValue.area === "도봉구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("도봉구");
          }}
        >
          <polygon
            className="land"
            points="814.1 250.19 847.91 38.35 805.47 37.74 794.25 0 726.54 0 722.56 46.79 720.11 47.97 729.47 79.83 760.63 185.95 813.19 255.86 814.1 250.19"
          />
          <text className="regionText" x="755" y="110">
            도봉구
          </text>
        </g>
        <g
          id="Gangbuk_gu"
          className={`region ${
            selectValue.area === "강북구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("강북구");
          }}
        >
          <polygon
            className="land"
            points="834.4 295.72 817.49 273.35 817.49 273.38 812.6 266.87 811.64 265.6 811.64 265.59 754.99 190.09 754.27 189.14 754.09 188.53 713.71 51.04 646.14 83.46 646.14 241.78 642.64 243.43 757.33 349.79 834.4 295.72"
          />
          <text className="regionText" x="680" y="240">
            강북구
          </text>
        </g>
        <g
          id="Seongbuk_gu"
          className={`region ${
            selectValue.area === "성북구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("성북구");
          }}
        >
          <polygon
            className="land"
            points="644.48 400.88 690.96 407.95 718.29 465.19 756.81 472.02 757.17 471.07 758.47 471.74 866.17 369.99 860.91 330.81 838.63 301.31 756.73 358.77 635.8 246.64 618.84 254.63 659.34 360.75 640.27 383.44 644.48 400.88"
          />
          <text className="regionText" x="720" y="410">
            성북구
          </text>
        </g>
        <g
          id="Dongdaemun_gu"
          className={`region ${
            selectValue.area === "동대문구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("동대문구");
          }}
        >
          <polygon
            className="land"
            points="774.11 475.09 768.38 476.82 847.17 517.28 887.91 538.19 894.09 517 905.03 479.54 904.61 479.55 890.81 374.8 871.27 374.8 766.53 473.75 774.11 475.09"
          />
          <text className="regionText" x="800" y="475">
            동대문구
          </text>
        </g>
        <g
          id="Seongdong_gu"
          className={`region ${
            selectValue.area === "성동구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("성동구");
          }}
        >
          <polygon
            className="land"
            points="731.7 643.2 782.74 608.44 859.26 636.37 885.91 545.03 760.98 480.89 742.24 531.2 721.04 588.11 731.7 643.2"
          />
          <text className="regionText" x="760" y="570">
            성동구
          </text>
        </g>
        <g
          id="Yongsan_gu"
          className={`region ${
            selectValue.area === "용산구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("용산구");
          }}
        >
          <polygon
            className="land"
            points="553.06 624.57 544.99 636.66 640.19 707.72 725.41 647.53 714.47 590.96 586.48 574.54 553.06 624.57"
          />
          <text className="regionText" x="610" y="640">
            용산구
          </text>
        </g>
        <g
          id="Jung_gu"
          className={`region ${selectValue.area === "중구" ? "select" : null}`}
          onClick={() => {
            selectArea("중구");
          }}
        >
          <polygon
            className="land"
            points="578.25 534.26 587.52 567.61 715.11 583.99 745.65 501.99 753.33 481.37 578.25 534.26"
          />
          <text className="regionText" x="650" y="550">
            중구
          </text>
        </g>
        <g
          id="Jongro_gu"
          className={`region ${
            selectValue.area === "종로구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("종로구");
          }}
        >
          <polygon
            className="land"
            points="563.74 364.06 576.53 520.31 577.1 527.29 744.03 476.87 713.53 471.46 686.24 414.31 638.77 407.09 632.64 381.64 651.33 359.39 614.01 261.61 563.74 364.06"
          />
          <text className="regionText" x="600" y="460">
            종로구
          </text>
        </g>
        <g
          id="Seodaemun_gu"
          className={`region ${
            selectValue.area === "서대문구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("서대문구");
          }}
        >
          <polygon
            className="land"
            points="570 526.33 557.18 369.74 426 461.01 487.73 519.74 503.98 535.2 570.19 528.75 570 526.33"
          />
          <text className="regionText" x="460" y="470">
            서대문구
          </text>
        </g>
        <g
          id="Eunpyeong_gu"
          className={`region ${
            selectValue.area === "은평구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("은평구");
          }}
        >
          <polygon
            className="land"
            points="610.76 250.69 607.33 200.28 545.38 143.73 420.94 188.15 420.94 398.42 357.87 396.19 420.83 456.09 557.43 361.03 610.6 252.67 609.98 251.06 610.76 250.69"
          />
          <text className="regionText" x="470" y="300">
            은평구
          </text>
        </g>
        <g
          id="Mapo_gu"
          className={`region ${
            selectValue.area === "마포구" ? "select" : null
          }`}
          onClick={() => {
            selectArea("마포구");
          }}
        >
          <polygon
            className="land"
            points="570.83 536.5 570.77 535.73 501.48 542.48 501.48 542.48 501.48 542.48 481.95 523.9 348.84 397.27 295.89 450.71 525.02 621.76 539.37 632.47 546.66 621.55 580.97 570.18 571.55 536.28 570.83 536.5"
          />
          <text className="regionText" x="490" y="580">
            마포구
          </text>
        </g>
      </svg>
    </div>
  );
}
