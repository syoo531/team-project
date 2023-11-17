import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    secretAccessKey: "Dxk4x3wV68vNRsvMlP2Ot/q4qI1PDC38M2bo/M9r",
    accessKeyId: "AKIARFBUMILQ6S3M63MX",
  },
});

//이미지들을 객체로 받아 S3에 업로드 + 기존 이미지는 S3에서 삭제
export const imageUploader = async (images, existingImage = false) => {
  let imageURL = {};
  let uploadPromises = [];

  for (const [imageName, file] of Object.entries(images)) {
    if (!file) continue;

    const Key = `${Date.now()}-${imageName}`;
    const command = new PutObjectCommand({
      Bucket: "mybucket-elice",
      Key,
      Body: file,
      ContentType: file.type,
    });

    uploadPromises.push(client.send(command));
    imageURL = {
      ...imageURL,
      [imageName]: `https://mybucket-elice.s3.ap-southeast-2.amazonaws.com/${Key}`,
    };

    if (existingImage) uploadPromises.push(deleteImageS3(existingImage[imageName]));
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
  const response = await client.send(command);
  return response;
};

export const deleteAllS3 = async ( imageArray ) => {
  const deletePromises = imageArray.map((image) => {
    return deleteImageS3(image)
  })
  console.log("delete all array", deletePromises)
  const result = await Promise.all(deletePromises)
  return result
}

// export const imageUploader = async (images, existingImage=false) => {
//   let imageURL = {};
//   console.log(images, existingImage)

//   for (const [imageName, file] of Object.entries(images)) {
//     if (!file) continue;

//     const Key = `${Date.now()}-${imageName}`;
//     const command = new PutObjectCommand({
//       Bucket: "mybucket-elice",
//       Key,
//       Body: file,
//       ContentType: file.type,
//     });
//     await client.send(command);

//     imageURL = {
//       ...imageURL,
//       [imageName]: `https://mybucket-elice.s3.ap-southeast-2.amazonaws.com/${Key}`,
//     };

//     if (existingImage) await deleteImageS3(existingImage[imageName]);
//     console.log("image to delete", existingImage[imageName]);
//   }
//   return imageURL;
// };
