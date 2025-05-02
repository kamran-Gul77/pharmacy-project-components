import { FC } from "react";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TrendType = "up" | "down";

interface StatCardProps {
  title: string;
  value: string;
  badgeValue: string;
  trend: TrendType;
  footerPrimary: string;
  footerSecondary: string;
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  badgeValue,
  trend,
  footerPrimary,
  footerSecondary,
}) => {
  const TrendIcon = trend === "up" ? IconTrendingUp : IconTrendingDown;

  return (
    <Card className="@container/card" data-slot="card">
      <CardHeader>
        {title && <CardDescription>{title}</CardDescription>}
        {value && (
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
        )}
        {badgeValue && (
          <CardAction>
            <Badge variant="outline">
              <TrendIcon />
              {badgeValue}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        {footerPrimary && (
          <div className="line-clamp-1 flex gap-2 font-medium">
            {footerPrimary} <TrendIcon className="size-4" />
          </div>
        )}
        {footerSecondary && (
          <div className="text-muted-foreground">{footerSecondary}</div>
        )}
      </CardFooter>
    </Card>
  );
};
