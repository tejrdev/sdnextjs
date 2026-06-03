//just redirect the page here after cheking the category to the new route /blog/category/post_id

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GetStaticProps } from 'next';

interface RedirectPageProps {
    post_id: string;
    categoryData: any;
}

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
}

export const getStaticProps: GetStaticProps<RedirectPageProps> = async (context) => {
    const { params } = context;
    const post_id = params?.post_id as string;
    const category = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/news_page/news_category.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${post_id}/&page_no=1&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`);
    const categoryData = await category.json();
    return {
        props: { post_id, categoryData },
        revalidate: 60,
    };
};

export default function RedirectPage({ post_id, categoryData }: RedirectPageProps) {
    const router = useRouter();
    //get category from api and redirect to the new route /blog/category/post_id

    useEffect(() => {
        router.push(`/blog/${categoryData.news_category}/${post_id}`); ///blog/${categoryData.news_category}/${post_id}
    }, [router]);
    return null;
}