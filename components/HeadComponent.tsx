import Head from 'next/head';

const HeadComponent = ({ data, jsonSchema = null }: any) => {
  return (
    <Head>
      {process.env.NEXT_PUBLIC_DEV_ENV === 'development' ? (
        <meta name='robots' content='noindex, nofollow' />
      ) : (
        data.children &&
        data.children.length > 0 &&
        data.children[0].children.map((item: any, index: number) => {
          const attributes = item.tag.toUpperCase();
          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.href} />;
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
