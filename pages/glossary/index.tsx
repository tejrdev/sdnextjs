
import GlossaryFilter from '@/components/Glossary/glossaryFilter'
import HeadComponent from '@/components/HeadComponent';
import { JSONData } from '@/components/shared/JSONData';

const SEOdata = JSONData.Glossary_SEOData;

export async function getStaticProps() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const raw = `{"apikey" : "${process.env.NEXT_PUBLIC_PRIVATEAPI_TOKEN}"}`;

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/glossary/glossary-list.php`, requestOptions as RequestInit);
    const data = await res.json();
    return {
        props: { data, revalidate: 60 },
    }
}

const GlossarySEO = SEOdata.find((item: any) => item.key === 'glossary') as any;

const Glossary = ({ data }: { data: any }) => {
    return (
        <div className='glossaryPage'>
            <HeadComponent meta_title={GlossarySEO?.metaTitle} meta_description={GlossarySEO?.metaDescription} canonical_url={process.env.NEXT_PUBLIC_FRONTEND_URL + '/glossary/'} />
            <section className='hero_txt secspace'>
                <div className='container'>
                    <h1 className='h2'>{data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
            </section>
            <GlossaryFilter data={data} />
        </div>
    )
}

export default Glossary