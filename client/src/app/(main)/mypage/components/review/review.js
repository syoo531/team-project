import "./review.scss";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import ReviewCard from "./components/reviewCard";

export default function Review() {
  const [reviewData, setReviewData] = useState(undefined);
  const axiosReviewData = async () => {
    try {
      const response = await instance.get("/review/getMyReview");
      const resData = response.data.data;

      setReviewData(resData);
    } catch (error) {
      console.error("내 리뷰 데이터 조회를 실패하였습니다.", error);
    }
  };

  useEffect(() => {
    axiosReviewData();
  }, []);

  return (
    <div className="reviewContainer">
      <div className="reviewTitle">내 리뷰관리</div>
      <div>
        <div className="reviewCardWrapper">
          {reviewData
            ? reviewData.map((v) => {
                return <ReviewCard data={v} onSubmit={axiosReviewData} />;
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
