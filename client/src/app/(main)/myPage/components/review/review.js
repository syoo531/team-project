import "./review.scss";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import ReviewCard from "./components/reviewCard";

export default function Review() {
  const [reviewData, setReviewData] = useState({ message: "", data: [] });
  const [reviewCard, setReviewCard] = useState(true);

  const onCloseCard = () => {
    setReviewCard(false);
  };

  useEffect(() => {
    const axiosReviewData = async () => {
      try {
        const reviewId = "65617bd398aec7b2c407df97";
        const response = await instance(`/review/${reviewId}`);

        const reviewData = response.data;

        // 내 리뷰 상태 업데이트
        setReviewData(reviewData);

        console.log(reviewData.data);
      } catch (error) {
        console.error("내 리뷰 데이터 조회를 실패하였습니다.", error);
        setReviewData({ message: "", data: [] });
      }
    };

    axiosReviewData();
  }, []);

  return (
    <div className="reviewCardContainer">
      <div className="reviewTitle">내 리뷰관리</div>
      <div>
        <div className="reviewCardWrapper">
          <ReviewCard onClose={onCloseCard} />
        </div>
        <div className="reviewCardWrapper">
          <ReviewCard />
        </div>
        <div className="reviewCardWrapper">
          <ReviewCard />
        </div>
        <div className="reviewCardWrapper">
          <ReviewCard />
        </div>
      </div>
    </div>
  );
}
