import axios from 'axios';
import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import ArticleHead from '../../../components/News/DetailPages/ArticleHead';
import Info from '../../../components/News/DetailPages/Info';
import Sidebar from '../../../components/News/DetailPages/Sidebar';
import HeadComponent from '@/components/HeadComponent';
import { JSONData } from '@/components/shared/JSONData';
import Aritem from '@/components/Article/Aritem';
import Arbanner from '@/components/Article/Arbanner';
import Latest_posts from '@/components/Article/Latest_posts';
import Subscribe from '@/components/Homepage/Subscriber';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import Page410 from '@/components/Page410';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';

const news_seo_data = JSONData.news_seo_data;
const BLOG_CATEGORIES = JSONData.BLOG_CATEGORIES;

interface NewsCategoryProps {
  error?: number;
  NewsCategoryData: {
    name: string;
    category_post: {
      posts: any[];
      total_page: number;
    };
    recent_post: {
      posts: any[];
    };
  };
  blog_category: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<NewsCategoryProps> = async (context) => {
  const { params } = context;
  const blog_category = params?.blog_category as string;

  if (!BLOG_CATEGORIES.includes(blog_category) || blog_category === 'undefined') {
    return { props: { error: 410 } }
  }

  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/news_page/news_category.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${blog_category}/&page_no=1&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
      key: 'NewsCategoryData',
      defaultData: {},
    },
  ];
  const config: any = await getStaticPropsWithErrorHandling(fetchConfigs);
  config.props.blog_category = blog_category;
  return config;
};

const BlogCategory = ({ NewsCategoryData, blog_category, error }: NewsCategoryProps) => {
  if (error) {
    if (error === 410) {
      return <Page410 />;
    }
    const normalizedError: any = typeof error === 'string' ? { message: error, code: '' } : error;
    return <ErrorDisplay error={normalizedError} />;
  }
  const [NewsCategoryPages, setNewsCategoryPages] = useState<number>(NewsCategoryData.category_post?.total_page || 0);
  const [NewsCategoryCurrentPage, setNewsCategoryCurrentPage] = useState<number>(1);
  const [NewsCategoryListData, setNewsCategoryListData] = useState(NewsCategoryData);
  const [currentCategory, setCurrentCategory] = useState<string>(blog_category);
  const [allPosts, setAllPosts] = useState<any[]>(NewsCategoryData.category_post?.posts || []);

  // Update state when props change (route changes)
  useEffect(() => {
    if (currentCategory !== blog_category) {
      setCurrentCategory(blog_category);
      setNewsCategoryCurrentPage(1);
      setNewsCategoryListData(NewsCategoryData);
      setAllPosts(NewsCategoryData.category_post?.posts || []);
      setNewsCategoryPages(NewsCategoryData.category_post?.total_page || 0);
    }
  }, [blog_category, NewsCategoryData, currentCategory]);

  useEffect(() => {
    if (NewsCategoryCurrentPage === 1) {
      // Reset posts when starting from page 1
      setAllPosts(NewsCategoryData.category_post?.posts || []);
    } else {
      // Load more data for pages > 1
      loadNewsCategoryData();
    }
  }, [NewsCategoryCurrentPage, currentCategory]);

  const loadNewsCategoryData = (): void => {
    axios
      .get<typeof NewsCategoryData>(
        `${process.env.NEXT_PUBLIC_SD_API}/news_page/news_category.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${blog_category}/&page_no=${NewsCategoryCurrentPage}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`
      )
      .then((res) => {
        // setNewsCategoryListData(res.data);
        setNewsCategoryPages(res.data.category_post.total_page);
        // Append new posts to existing posts
        if (res.data.category_post?.posts) {
          setAllPosts(prevPosts => [...prevPosts, ...res.data.category_post.posts]);
        }
      })
      .catch((err) => console.log(err));
  };

  const news_seo_data_item = news_seo_data?.find((item: any) => item.key === blog_category);

  return (
    <>
      <HeadComponent canonical_url={process.env.NEXT_PUBLIC_FRONTEND_URL + '/blog/' + blog_category + '/'} meta_title={news_seo_data_item?.metaTitle} meta_description={news_seo_data_item?.metaDescription} />
      {/* {NewsCategoryDataLoaded && <CategotyNavigation />} */}
      <ArticleHead title={news_seo_data_item?.pageHeading || NewsCategoryData.name} content={news_seo_data_item?.pageContent} />
      {allPosts.length > 0 &&
        <>
          <Arbanner item={allPosts[0]} />
          <section className='arlist'>
            <div className="container">
              <div className="flex flex-wrap justify-between gap-3 ">
                {allPosts.slice(1).map((item, index) =>
                  <Aritem key={`${item.id || index}-${index}`} item={item} />
                )}
              </div>
              {NewsCategoryCurrentPage < NewsCategoryPages && (
                <div className="cardsbtn text-center mt-5 mb-14">
                  <button className="btn" onClick={() => setNewsCategoryCurrentPage(NewsCategoryCurrentPage + 1)}>Load More</button>
                </div>
              )}
            </div>
          </section>
        </>
      }

      <div className="arsubscribe  mb-10">
        <Subscribe />
        <div className="container border-b border-b-gray-400"></div>
      </div>
      <Latest_posts data={NewsCategoryListData?.recent_post.posts} title='Latest posts' href='/blog' />

    </>
  );
};

export default BlogCategory;
