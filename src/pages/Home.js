import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Product from "../components/Product";

const Home = () => {
  const API = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.log("error fetching data");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : posts.length !== 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 lg:grid-cols-4 max-w-4xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {posts.map((post) => {
            return <Product key={post.id} post={post} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No data found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
