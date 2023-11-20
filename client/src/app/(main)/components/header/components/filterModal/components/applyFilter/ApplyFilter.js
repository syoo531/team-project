import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./ApplyFilter.scss";

export default function ApplyFilter({
  areaSelectList,
  handleAreaSelect,
  categorySelectList,
  handleCategorySelect,
  closeModal,
}) {
  return (
    <div className="applyFilter">
      <div className="headerWrapper">
        <div className="title">Apply Filter</div>
        <FontAwesomeIcon
          className="closeBtn"
          icon={faCircleXmark}
          onClick={() => {
            closeModal();
          }}
        />
      </div>
      <div className="applyFilterWrapper">
        <div className="filterWrapper">
          <div className="filerTitle">Area :</div>
          <div className="applyList">
            {areaSelectList.map((area) => (
              <div className="applyItemWrapper">
                <div className="applyItem">{area}</div>
                <div
                  className="removeBtn"
                  onClick={() => {
                    handleAreaSelect(area);
                  }}
                >
                  ✕
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="filterWrapper">
          <div className="filerTitle">Categoty : </div>
          <div className="applyList">
            {categorySelectList.map((area) => (
              <div className="applyItemWrapper">
                <div className="applyItem">{area}</div>
                <div
                  className="removeBtn"
                  onClick={() => {
                    handleCategorySelect(area);
                  }}
                >
                  ✕
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="periodWrapper">
          <div className="periodTitle">Period :</div>
          <div className="period"></div>
        </div>
        <div className="filteringCount">팝업스토어 수</div>
        <div className="btnWrapper">
          <div className="resetBtn">초기화</div>
          <div className="applyBtn">적용하기</div>
        </div>
      </div>
    </div>
  );
}
