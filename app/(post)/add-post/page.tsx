import PostForm from "../../../components/PostForm";

export const metadata = {
  title: "Add new post",
};

function AddPostpage() {
  const initialState = {
    title: "",
    category: "",
    description: "",
  };

  return (
    <div>
      <h4 className="text-2xl text-gray-400 font-bold">Add New Post</h4>
      <div className="mt-5">
        <PostForm initialState={initialState} formType="post" />
      </div>
    </div>
  );
}

export default AddPostpage;
