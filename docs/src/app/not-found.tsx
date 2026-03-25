import "./global.css";
import { BookOpenIcon, LayoutListIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ROUTES } from "@/constants/routes";
import { publicSans } from "@/lib/fonts";

export default function NotFound() {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <Empty>
          <EmptyHeader>
            <EmptyTitle className="font-mono text-8xl font-black">
              404
            </EmptyTitle>
            <EmptyDescription className="text-nowrap">
              The page you&apos;re looking for might have been <br />
              moved or doesn&apos;t exist.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button
                nativeButton={false}
                render={
                  <Link href={ROUTES.PROGRAMS}>
                    <LayoutListIcon />
                    Browse Programs
                  </Link>
                }
              />

              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <Link href={ROUTES.CLI}>
                    <BookOpenIcon />
                    CLI Docs
                  </Link>
                }
              />
            </div>
          </EmptyContent>
        </Empty>
      </body>
    </html>
  );
}
