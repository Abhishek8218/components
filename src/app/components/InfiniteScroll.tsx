import React, { use, useEffect } from 'react'
import InfoCard from './postCard'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'

const InfiniteScroll = () => {
const {ref,inView} = useInView()

    const fetchPosts = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json()
        return data
    }


const { data, error, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [['posts']],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage:any, allPages:any) => {
      return lastPage.length === 0 ? null : allPages.length + 1
    },

});

const content = data?.pages.map((posts:any) => posts.map((post:any,index:number) => {
    if(posts.length === index + 1){
        return <InfoCard key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body} innerRef={ref}/>
}
return <InfoCard key={post.id } userId={post.userId} id={post.id} title={post.title} body={post.body}/>;

})
);

useEffect(() => {

    if(inView && hasNextPage){
        fetchNextPage()
    }
},[inView,hasNextPage,fetchNextPage]);





  return (
    <div>
        {content}
    </div>
  )
}

export default InfiniteScroll