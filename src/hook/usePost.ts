import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PostService from "../services/PostService";
import { CreatePostType, Post } from "../types/Post";

export const useCreatePost = () => {
  const postService = new PostService();
  const queryClient = useQueryClient();

  const mutate = useMutation<unknown, Error, CreatePostType>({
    mutationFn: async (body) => postService.createPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-posts"] });
    },
  });
  return mutate;
};

export const useGetPosts = () => {
  const postService = new PostService();
  const query = useQuery({
    queryKey: ["get-posts"],
    queryFn: () => postService.getPosts(),
  });

  return query;
};

export const useGetPostById = (postId: string) => {
  const postService = new PostService();
  const query = useQuery({
    queryKey: ["get-post", postId],
    enabled: Boolean(postId),
    queryFn: () => postService.getPostById(postId),
  });

  return query;
};

export const useUpVote = () => {
  const postService = new PostService();
  const queryClient = useQueryClient();

  const mutate = useMutation<unknown, Error, { postId: string }>({
    mutationFn: async (body) => postService.upVote(body.postId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ["get-posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["get-posts"]);

      if (previousPosts) {
        queryClient.setQueryData(
          ["get-posts"],
          previousPosts.map((post) =>
            post.id === postId
              ? { ...post, voteCount: post.voteCount + 1 }
              : post
          )
        );
      }

      return { previousPosts };
    },
    onError: (err, variables, context: any) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["get-posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-posts"] });
    },
  });
  return mutate;
};

export const useDownVote = () => {
  const queryClient = useQueryClient();
  const postService = new PostService();

  const mutate = useMutation<unknown, Error, { postId: string }>({
    mutationFn: async (body) => postService.downVote(body.postId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ["get-posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["get-posts"]);

      if (previousPosts) {
        queryClient.setQueryData(
          ["get-posts"],
          previousPosts.map((post) =>
            post.id === postId
              ? { ...post, voteCount: post.voteCount - 1 }
              : post
          )
        );
      }

      return { previousPosts };
    },
    onError: (err, variables, context: any) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["get-posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-posts"] });
    },
  });
  return mutate;
};
