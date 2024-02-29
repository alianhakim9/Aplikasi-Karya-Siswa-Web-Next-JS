import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";

const HeaderBreadcrumb = (props) => {
  const { dashboardUrl, previousUrl, currentTitle, previousTitle } = props;

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href={dashboardUrl}>Dashboard</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link href={previousUrl}>{previousTitle}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{currentTitle}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default HeaderBreadcrumb;
