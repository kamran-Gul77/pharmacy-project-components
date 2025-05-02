import Avatar from "@/components/elements/Avatar";
import { Heading } from "@/components/typography/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import imgg from "../../public/next.svg";
export default function Home() {
  return (
    <div>
      {/* avatart  */}
      <div className="space-y-6">
        <Avatar src="/profile.jpg" fallback="AB" />
        <Avatar src={imgg.src} fallback="sda" />
      </div>
      {/* button */}

      {/* inputss */}
      <div className="space-y-6">
        <div>
          <Heading level="h4" className="mb-3">
            Default
          </Heading>
          <Input placeholder="Default input" />
        </div>

        <div>
          <Heading level="h4" className="mb-3">
            Disabled
          </Heading>
          <Input placeholder="Disabled input" disabled />
        </div>

        <div>
          <Heading level="h4" className="mb-3">
            With Label
          </Heading>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
            <p className="text-sm text-muted-foreground">
              Enter your email address.
            </p>
          </div>
        </div>

        <div>
          <Heading level="h4" className="mb-3">
            With Icon
          </Heading>
          <div className="relative">
            <Input placeholder="Search..." className="pl-8" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
