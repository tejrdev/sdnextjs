import Head from 'next/head';

const HeadComponent = ({ data, jsonSchema = null, meta_title = null, meta_description = null, canonical_url = null, robots = null }: any) => {
  // If all three meta fields are provided directly, use them without looping
  const hasDirectMeta = meta_title && meta_description && canonical_url;

  return (
    <Head>
      {process.env.NEXT_PUBLIC_DEV_ENV === 'development' ? (
        <meta name='robots' content='noindex, nofollow' />
      ) : hasDirectMeta ? (
        // Direct meta tags - no need to loop
        <>
          <title>{meta_title}</title>
          <meta name='description' content={meta_description} />
          <link rel='canonical' href={canonical_url} />
          <meta name='robots' content={robots || 'index, follow'} />
        </>
      ) : (
        // Fallback to looping through data if direct meta not provided
        data &&
        data.children &&
        data.children.length > 0 &&
        data.children[0].children?.map((item: any, index: number) => {
          const attributes = item.tag.toUpperCase();
          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{meta_title ? meta_title : item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={name === 'description' ? (meta_description ? meta_description : item.content) : item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.rel === 'canonical' ? (canonical_url ? canonical_url : item.href) : item.href} />;
            case 'SCRIPT':
              return <script key={index} type={item.type} className={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
            default:
              return null;
          }
        })
      )}
      {jsonSchema && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }} />}
    </Head>
  );
};

export default HeadComponent;
