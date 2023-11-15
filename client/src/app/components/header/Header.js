import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

export default function Header() {
  return (
    <div className="headerContainer">
      <img
        className="logo"
        src="https://user-images.githubusercontent.com/126956430/282671069-a09c630b-27dd-4089-9cdc-a2117ca9c132.png"
        alt="로고이미지"
      />
      <div className="searchBarWrapper">
        <label htmlFor="search">
          <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
        </label>
        <input
          id="search"
          type="text"
          placeholder="다양한 팝업스토어를 검색해보세요."
          autoComplete="off"
        />
      </div>
      <div className="btnWrapper">
        <div className="loginBtn">LOGIN</div>
        <div className="signUpBtn">SIGN UP</div>
        <div className="filterBtn">FIND</div>
      </div>
    </div>
  );
}
