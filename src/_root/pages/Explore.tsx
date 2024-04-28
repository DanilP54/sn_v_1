import React from 'react'
import { Input } from "@/components/ui/input.tsx";
import { useGetInfinityPosts, useSearchPost } from '@/lib/react-query/queriesAndMutations';
import GridPostsList from '@/components/shared/GridPostsList';
import { useDebounce } from '@/hooks/useDebounce';
import Loader from '@/components/shared/Loader';
import { useInView } from "react-intersection-observer";

const SearchResult = ({ searchedPosts, isSearchFetching }: {
    searchedPosts: any,
    isSearchFetching: boolean
}) => {

    if (isSearchFetching) {
        return <Loader />;
    } else if (searchedPosts && searchedPosts.documents.length > 0) {
        return <GridPostsList posts={searchedPosts.documents} />;
    } else {
        return (
            <p className="text-light-4 mt-10 text-center w-full">No results found</p>
        );
    }
}

const Explore = () => {

    const [searchValue, setSearchValue] = React.useState('');
    const debounceValue = useDebounce(searchValue, 500)

    const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPost(debounceValue);
    const { data: posts, fetchNextPage, hasNextPage, isLoading: isGetPosts } = useGetInfinityPosts();

    console.log(hasNextPage)

    const [ref, inView] = useInView()

    if (!posts)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    // React.useEffect(() => {
    //     if (inView && !searchValue) fetchNextPage()
    // }, [inView, searchValue])


    const shouldShowSearchResults = searchValue !== "";
    const shouldShowPosts = !shouldShowSearchResults &&
        posts?.pages?.every((item) => item?.documents.length === 0);


    return (
        <div className="explore-container">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
                <div
                    className="flex gap-4 items-center focus-within:outline focus-within:outline-blue-800 px-4 m-1 w-full rounded-lg bg-dark-4">
                    <img
                        src={'/assets/icon/search.svg'}
                        width={20}
                        height={20}
                        alt="search icon"
                    />
                    <Input
                        type="text"
                        placeholder={"Search"}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        className='bg-transparent border-none p-0 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none'
                    />
                </div>
            </div>

            <div className='flex items-center flex-between w-full max-w-5xl mt-16 mb-7'>
                <h3 className='body-bold md:h3-bold'>Popular Today</h3>
                <div className="flex-center gap-3 bg-dark-3 rounded-xl py-2 px-4 cursor-pointer">
                    <p className="small-medium md:base-medium text-light-2">All</p>
                    <img src={'/assets/icon/filter.svg'} width={20} height={20} className='cursor-pointer'
                        alt="filter icon" />
                </div>
            </div>
            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                {
                    shouldShowSearchResults ? (
                        <SearchResult
                            searchedPosts={searchedPosts}
                            isSearchFetching={isSearchFetching}
                        />
                    ) : shouldShowPosts ? (
                        <p>Emty</p>
                    ) : posts?.pages?.map((item, index) => (
                        <GridPostsList
                            key={`page-${index}`}
                            posts={item?.documents}
                            showUser={true}
                            showStats={true}
                        />
                    ))
                }
            </div>

            {/* {
                hasNextPage && !searchValue && (
                    <div ref={ref} className='mt-10'>
                        <Loader />
                    </div>
                )
            } */}
        </div>
    )
}

export default Explore
