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

export const s3UploadSingleImage = async (image) => {
  const uploadParams = {
    Bucket: process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET,
    Key: `${Date.now()}-${image.name}`,
    Body: image,
    ContentType: image.type,
  };
  await s3client.send(new PutObjectCommand(uploadParams));

  return {
    Key: uploadParams.Key,
    url: `https://${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}.s3.ap-southeast-2.amazonaws.com/${uploadParams.Key}`,
  };
};

export const s3UploadMultipleImages = async (images) => {
  let imageURLs = [];

  const uploadPromises = images.map(async (image) => {
    const res = await s3UploadSingleImage(image);
    imageURLs.push(res);
  });

  await Promise.all(uploadPromises);
  return imageURLs;
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
    return deleteImageS3(image.url);
  });
  console.log("delete all array", deletePromises);
  const result = await Promise.all(deletePromises);
  return result;
};