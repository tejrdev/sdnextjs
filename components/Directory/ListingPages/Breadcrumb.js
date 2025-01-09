const Breadcrumb = ({ parentLink, parentTitle, pageLink, pageTitle }) => {
  return (
    <div className='distbreadcrumb'>
      <ul>
        <li>
          <a href={parentLink} title={parentTitle}>
            <span>{parentTitle}</span>
          </a>
        </li>
        <li>
          <a href={pageLink} title={pageTitle}>
            {pageTitle}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
