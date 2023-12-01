"use client";

import Search from "../Search/Search";
import Chip from "./Chip";

export default function UserList({ userData, totalUsers }) {
  return (
    <div className="main__layout">
      <div className="main__header list__header">
        <div className="main-title">
          <h1>사용자 목록</h1>
        </div>
      </div>
      <div className="list__container user-list">
        <Search userList={true} />
        <p className="list__total">조회 결과: 총 {totalUsers}개</p>
        <table className="list-table">
          <thead>
            <tr>
              <th>사용자 이름</th>
              <th>전화번호</th>
              <th className="email-col">이메일 주소</th>
              <th className="category-list-col">관심 카테고리</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {userData && userData.length > 0 ? (
              userData.map((user) => (
                <tr className="table-row" key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.category.map((chip, i) => (
                      <Chip category={chip} key={i} />
                    ))}
                  </td>
                  <td>{user.createdAt?.split("T")[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
