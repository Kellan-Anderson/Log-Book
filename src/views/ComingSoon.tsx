import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hourglass } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-3">Coming soon...<Hourglass /></CardTitle>
        </CardHeader>
        <CardContent>
          This app has not been developed yet. Please check back at a later time
        </CardContent>
        <CardFooter className="w-full flex items-center justify-center">
          <Button asChild>
            <a href="/">Go to home page</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}