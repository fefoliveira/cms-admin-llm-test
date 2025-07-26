import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

// ----------------------------------------------------------------------

interface RouterLinkProps extends Omit<LinkProps, "to"> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, children, className, ...other }, ref) => (
    <Link ref={ref} to={href} className={className} {...other}>
      {children}
    </Link>
  )
);

RouterLink.displayName = "RouterLink";

export default RouterLink;
