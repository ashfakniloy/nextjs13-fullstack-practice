"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DynamicLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  // return (
  //   <a
  //     {...props}
  //     href={href}
  //     onClick={(e) => {
  //       e.preventDefault();
  //       router.push(href);
  //     }}
  //   >
  //     {children}
  //   </a>
  // );

  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      onClick={() => router.refresh()}
    >
      {children}
    </Link>
  );
}

// 'use client';

// import { useRouter } from 'next/navigation';
// import { forwardRef } from 'react';

// const DynamicLink = forwardRef<
//   HTMLAnchorElement,
//   Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'>
// >(({ href, children, ...props }, ref) => {
//   const router = useRouter();

//   return (
//     <a
//       {...props}
//       ref={ref}
//       href={href}
//       onClick={(e) => {
//         e.preventDefault();
//         router.push(href);
//       }}
//     >
//       {children}
//     </a>
//   );
// });

// export default DynamicLink;
