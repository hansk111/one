import { apiSlice } from "@/store/services/apiSlice";

interface Category {
  map(
    arg0: (row: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  length: number;
  id: number;
  name: string;
}

const blogAipSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (formData) => ({
        url: "/post/",
        method: "POST",
        body: formData,
      }),
    }),
    updatepost: builder.mutation({
      query: ({ postid, formData }) => ({
        url: `/post/${postid}/`,
        method: "PUT",
        body: formData,
      }),
    }),
    deletepost: builder.mutation({
      query: (postid) => ({
        url: `/post/${postid}/`,
        method: "DELETE",
      }),
    }),
    image_delete: builder.mutation({
      query: ({ imgUrl }) => ({
        url: `/delete_image`,
        method: "POST",
        body: { path: imgUrl },
      }),
    }),
    get: builder.query<Post, string>({
      query: (id) => `/post/${id}/`,
    }),
    getAll: builder.query({
      query: ({ page, value }) => `/post/?page=${page}&page_size=${value}`,
    }),
    uploadpostImage: builder.mutation({
      query: (formData) => ({
        url: `/upload-postimage/`,
        method: "POST",
        body: formData,
      }),
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `/comment/`,
        method: "POST",
        body: data,
      }),
    }),
    getCategories: builder.query<Category, void>({
      query: () => `/categories/`,
      providesTags: ["Category"],
    }),
    getCategory: builder.query<Category, void>({
      query: (id) => `/categories/${id}/`,
    }),
    createCategory: builder.mutation({
      query: (formData) => ({
        url: `/categories/`,
        method: "POST",
        body: formData,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/categories/${id}/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useUpdatepostMutation,
  useDeletepostMutation,
  useImage_deleteMutation,
  useGetQuery,
  useGetAllQuery,
  useUploadpostImageMutation,
  useAddCommentMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = blogAipSlice;
