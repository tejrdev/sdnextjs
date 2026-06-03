interface BlogTitleProps {
    title: string;
    description: string;
}

const BlogTitle = ({ title, description }: BlogTitleProps) => (
    <section className="introtxt sm:py-8 py-5">
        <div className="container">
            <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
    </section>
);

export default BlogTitle;