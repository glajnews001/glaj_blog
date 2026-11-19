export type PostRecord = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishBy: string;
  category: string;
  blogType: string;
  fileType: string;
  blogId: string;
  isEyeWitness: boolean;
  isActive: boolean;
  isApproved: boolean;
  createdAt: Date;
};

export type PostView = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  PublishBy: string;
  category: string;
  Blogtype: string;
  fileType: string;
  blogid: string;
  is_eye_witness: boolean;
  is_active: boolean;
  is_Approved: boolean;
  createdAt: string;
};

export function toPostView(post: PostRecord): PostView {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
    PublishBy: post.publishBy,
    category: post.category,
    Blogtype: post.blogType,
    fileType: post.fileType,
    blogid: post.blogId,
    is_eye_witness: post.isEyeWitness,
    is_active: post.isActive,
    is_Approved: post.isApproved,
    createdAt: post.createdAt.toISOString(),
  };
}
