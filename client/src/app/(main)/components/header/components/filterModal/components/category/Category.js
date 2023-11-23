import "./Category.scss";

const CATEGORY_LIST = [
  {
    id: 1,
    categoryName: "토이",
    image:
      "https://user-images.githubusercontent.com/126956430/284217671-570ec55d-82e7-47fd-8273-cc50b2d23b28.png",
  },
  {
    id: 2,
    categoryName: "뷰티",
    image:
      "https://user-images.githubusercontent.com/126956430/284217658-afd8328c-3761-4215-a700-dad6c9a698ce.png",
  },
  {
    id: 3,
    categoryName: "패션",
    image:
      "https://user-images.githubusercontent.com/126956430/284217520-a147cf7b-0cd3-4386-845c-e16a3d356fd6.png",
  },
  {
    id: 4,
    categoryName: "음식",
    image:
      "https://user-images.githubusercontent.com/126956430/284217549-9c36e251-9328-4023-b6cf-bd70b21b0242.png",
  },
  {
    id: 5,
    categoryName: "예술",
    image:
      "https://user-images.githubusercontent.com/126956430/284229095-6803210c-a00f-4851-b6ed-fcd427beac99.png",
  },
  {
    id: 6,
    categoryName: "주류",
    image:
      "https://user-images.githubusercontent.com/126956430/284217692-2a3b5a8c-9bbd-42be-a8c7-6facbd5209b6.png",
  },
  {
    id: 7,
    categoryName: "게임",
    image:
      "https://user-images.githubusercontent.com/126956430/284217578-ce29bcbc-5341-4868-a12c-a50a8b6f2272.png",
  },
  {
    id: 8,
    categoryName: "전자기기",
    image:
      "https://user-images.githubusercontent.com/126956430/284229404-e886cb99-652f-4c7d-9688-44daae7788f0.png",
  },
  {
    id: 9,
    categoryName: "가구",
    image:
      "https://user-images.githubusercontent.com/126956430/284229588-53e9f396-5af5-4de2-911b-1737c254a7a2.png",
  },
  {
    id: 10,
    categoryName: "캐릭터",
    image:
      "https://user-images.githubusercontent.com/126956430/284217621-823ddcb5-99f0-42b2-b8b2-30557397cabe.png",
  },
  {
    id: 11,
    categoryName: "럭셔리",
    image:
      "https://user-images.githubusercontent.com/126956430/284217347-f5d18ca4-6c00-4449-b884-9d4061c26219.png",
  },
  {
    id: 12,
    categoryName: "아이돌",
    image:
      "https://user-images.githubusercontent.com/126956430/284217391-63f5a871-314e-44b4-b5ff-83f34abf0792.png",
  },
];

export default function Category({ selectValue, setSelectValue }) {
  function selectCategory(targetValue) {
    if (selectValue.category === targetValue) {
      setSelectValue({ ...selectValue, category: null });
      return;
    }
    setSelectValue({ ...selectValue, category: targetValue });
  }
  return (
    <div className="category">
      <div className="categoryTitle">카테고리로 찾기</div>
      <div className="categorySubTitle">
        원하시는 구역을 선택하시면, <br />
        해당 구역의 팝업스토어를 모두 확인하실 수 있습니다.
      </div>
      <div className="categoryListWrapper">
        {CATEGORY_LIST.map((category) => {
          return (
            <div
              key={category.id}
              className={`categoryWrapper ${
                selectValue.category === category.categoryName ? "select" : null
              }`}
              onClick={() => {
                selectCategory(category.categoryName);
              }}
            >
              <div
                className="backgroundImage"
                style={{ backgroundImage: `url('${category.image}')` }}
              ></div>
              <div className="blackBackground"></div>
              <div className="categoryText"> {category.categoryName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
