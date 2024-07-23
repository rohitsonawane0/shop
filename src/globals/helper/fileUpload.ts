import { ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { AWS_ACCESS_KEYS, AWS_SECRET, AWS_BUCKET } from '~/config/config'
//000
export class FileUpload {
  client: S3Client
  region: string
  constructor(accessKeyId: string, secretAccessKey: string, region: string) {
    const client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      region
    })
    this.client = client
    this.region = region
  }
  public async uploadFile(file: IFile): Promise<string | null> {
    const fileKey = `${Date.now().toString()}-${file.originalname}`
    const contentType = 'image/jpeg'
    const params = {
      ACL: 'public-read' as ObjectCannedACL,
      Bucket: AWS_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ContentType: contentType
    }

    const command = new PutObjectCommand(params)
    try {
      const response = await this.client.send(command)
      console.log('File uploaded successfully:', response)

      // Construct and return the S3 URL
      const s3Url = `https://${AWS_BUCKET}.s3.${this.region}.amazonaws.com/${fileKey}`
      return s3Url
    } catch (error) {
      console.error('Error uploading file:', error)
      return null
    }
  }
}

export const fileUpload = new FileUpload(AWS_ACCESS_KEYS!, AWS_SECRET!, 'ap-south-1')
