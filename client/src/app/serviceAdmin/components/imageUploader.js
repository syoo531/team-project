import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
  credentials: {
    secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
    accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
  },
});

//s3 이미지 1개 업로드
export const s3UploadSingleImage = async (image) => {
  if (!image) return;

  const uploadParams = {
    Bucket: process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET,
    Key: `${Date.now()}-${image.name}`,
    Body: image,
    ContentType: image.type,
  };
  await s3client.send(new PutObjectCommand(uploadParams));

  //몽고DB에 저장할 정보를 리턴한다
  return {
    Key: uploadParams.Key,
    url: `https://${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}.s3.ap-southeast-2.amazonaws.com/${uploadParams.Key}`,
  };
};

//s3 이미지 여러개 업로드
export const s3UploadMultipleImages = async (images) => {
  let imageURLs = [];

  const uploadPromises = images.map(async (image) => {
    const res = await s3UploadSingleImage(image);
    imageURLs.push(res);
  });

  await Promise.all(uploadPromises);
  return imageURLs;
};

//s3 이미지 1개 삭제
export const deleteImageS3 = async (imageUrl) => {
  if (!imageUrl) {
    return Promise.resolve(true);
  }

  const input = {
    Bucket: "mybucket-elice",
    Key: imageUrl.split("/").pop().toString(),
  };
  const command = new DeleteObjectCommand(input);
  const response = await s3client.send(command);
  console.log("response from s3", response);
  return response;
};

//s3 이미지 여러개 삭제
export const deleteAllS3 = async (imageArray) => {
  if (imageArray.length == 0) {
    return Promise.resolve(true);
  }

  const deletePromises = imageArray.map((image) => {
    return deleteImageS3(image.url);
  });
  console.log("deletePromises", deletePromises);
  const result = await Promise.all(deletePromises);
  return result;
};
