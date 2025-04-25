import Avatar from "@/components/elements/Avatar";
import { Heading } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

      <div className="space-y-6">
        <div>
          <Heading level="h4" className="mb-3">
            Variants
          </Heading>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div>
          <Heading level="h4" className="mb-3">
            Sizes
          </Heading>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="default">Default</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" className="h-9 w-9">
              <span className="font-bold">A</span>
            </Button>
          </div>
        </div>

        <div>
          <Heading level="h4" className="mb-3">
            States
          </Heading>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline" className="bg-primary/10">
              Active
            </Button>
          </div>
        </div>
      </div>

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
      {/* slectc */}
      <div className="space-y-6">
        <div>
          <Heading level="h4" className="mb-3">
            Basic Select
          </Heading>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Heading level="h4" className="mb-3">
            With Groups
          </Heading>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
                <SelectItem value="spinach">Spinach</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Heading level="h4" className="mb-3">
            Disabled
          </Heading>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
