import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations"



const Home = () => {

  const { data, isLoading, isError } = useGetRecentPosts()

  console.log(data?.documents)


  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          <img src={data?.documents[0]?.creator?.imageUrl} className="w-10 h-10 rounded-lg" alt="" />
          <p>{data?.documents[0]?.captions}</p>
          <img src={data?.documents[0]?.imageUrl} alt="фотоф" />
        </div>
      </div>
    </div>
  )
}

export default Home
