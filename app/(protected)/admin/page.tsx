"use client";
//import { currentRole } from "@/lib/auth";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@/lib/generated/prisma/edge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
  const onServerActionClick = async () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Access granted to admin API route");
      } else {
        toast.error("Access denied to admin API route");
      }
    });
  };
  const role = useCurrentRole();
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin Page</p>
      </CardHeader>
      <CardContent className="p-10 space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess
            message={`Welcome to the admin page! Your role is: ${role}`}
          />
        </RoleGate>
        <div className="flex flex-row items-center rounded-lg p-3 text-center text-sm justify-between shadow-md">
          <p>Admin only Api route</p>
          <Button onClick={onApiRouteClick}>Click me</Button>
        </div>
        <div className="flex flex-row items-center rounded-lg p-3 text-center text-sm justify-between shadow-md">
          <p>Admin only Server Action</p>
          <Button onClick={onServerActionClick}>Click me</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
