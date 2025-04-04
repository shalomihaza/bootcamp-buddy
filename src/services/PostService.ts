import {
  collection,
  doc,
  FieldValue,
  Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  increment,
} from "firebase/firestore";
import { app } from "./firebase";
import { CreatePostType, Post } from "../types/Post";

class PostService {
  private db!: Firestore;
  constructor() {
    this.db = getFirestore(app);
  }

  async createPost(body: CreatePostType) {
    try {
      const postRef = doc(this.db, "posts", body.id);
      await setDoc(postRef, body);

      return body.id;
    } catch (error) {
      console.error("Error creating post in Firestore:", error);
      throw error;
    }
  }
  async getPosts(): Promise<Post[]> {
    try {
      const postRef = collection(this.db, "posts");
      const snapshot = await getDocs(postRef);
      const posts = snapshot.docs.map(async (val) => {
        const postData = val.data();
        const userRef = collection(this.db, "users");
        const q = query(userRef, where("id", "==", postData.userId));
        const userSnapshot = await getDocs(q);
        const userData = userSnapshot.docs.map((userDoc) => userDoc.data())[0];
        
        return {
          id: val.id,
          ...postData,
          user: userData,
        } as Post;
      });
      
      return Promise.all(posts);
    } catch (error) {
      console.error("Error fetching posts from Firestore:", error);
      throw error;
    }
  }
  
  async getPostById(postId: string): Promise<Post> {
    try {
      const postRef = collection(this.db, "posts");
      const postQuery = query(postRef, where("id", "==", postId));
      const postSnapshot = await getDocs(postQuery);

      const postDoc = postSnapshot.docs[0];
      if (!postDoc) {
        throw new Error("Post not found");
      }
      const postData = postDoc.data();
      const userRef = collection(this.db, "users");
      const q = query(userRef, where("id", "==", postData.userId));
      const userSnapshot = await getDocs(q);
      const userData = userSnapshot.docs[0]?.data();

      return {
        id: postDoc.id,
        ...postData,
        user: userData,
      } as Post;
    } catch (error) {
      console.error("Error fetching post from Firestore:", error);
      throw error;
    }
  }

  async upVote(postId: string) {
    try {
      console.log(postId)
      const postRef = doc(this.db, "posts", postId);
      await updateDoc(postRef, {
        voteCount: increment(1),
      });
    } catch (error) {
      console.error("Error updating vote count:", error);
      throw error;
    }
  }
 
  async downVote(postId: string) {
    try {
      const postRef = doc(this.db, "posts", postId);
      await updateDoc(postRef, {
        voteCount: increment(-1),
      });
    } catch (error) {
      console.error("Error updating vote count:", error);
      throw error;
    }
  }
}

export default PostService;
