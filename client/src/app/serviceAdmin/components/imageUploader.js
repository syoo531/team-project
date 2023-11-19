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

//이미지들을 객체로 받아 S3에 업로드 + 기존 이미지는 S3에서 삭제
export const s3imageUploader = async (images, existingImage= false) => {
  let imageURL = {};
  let uploadPromises = [];

  for (const [imageName, file] of Object.entries(images)) {
    if (!file) continue;

    const uploadParams = {
      Bucket: process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET,
      Key: `${Date.now()}-${imageName}`,
      Body: file,
      ContentType: file.type,
    };

    uploadPromises.push(s3client.send(new PutObjectCommand(uploadParams)));

    imageURL = {
      ...imageURL,
      [imageName]: `https://${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}.s3.ap-southeast-2.amazonaws.com/${uploadParams.Key}`,
    };

    if (existingImage[imageName])
      uploadPromises.push(deleteImageS3(existingImage[imageName]));
  }
  await Promise.all(uploadPromises);
  return imageURL;
};

export const deleteImageS3 = async (imageUrl) => {
  console.log("url to delete", imageUrl);
  const input = {
    Bucket: "mybucket-elice",
    Key: imageUrl.split("/").pop().toString(),
  };
  const command = new DeleteObjectCommand(input);
  const response = await s3client.send(command);
  return response;
};

export const deleteAllS3 = async (imageArray) => {
  const deletePromises = imageArray.map((image) => {
    return deleteImageS3(image);
  });
  console.log("delete all array", deletePromises);
  const result = await Promise.all(deletePromises);
  return result;
};