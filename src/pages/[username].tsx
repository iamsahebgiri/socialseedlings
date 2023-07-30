import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import MainLayout from "@/layouts/main.layout";
import usersService from "@/services/users.service";
import { Profile } from "@/components/profile";
import { UserProfileTab } from "@/components/tab";
import { Spinner } from "@/components/spinner";

interface UserProfileProps {
  username: string;
}

function UserProfile({ username }: UserProfileProps) {
  const { data, isLoading, error } = useSWR(
    "GET_PUBLIC_USER_PROFILE_" + username,
    () => usersService.getPublicProfile(username)
  );

  if (isLoading) {
    return (
      <MainLayout>
        <Spinner />
      </MainLayout>
    );
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  console.log(data);

  return (
    <MainLayout>
      <Profile profile={data} />
      <UserProfileTab profile={data} />
    </MainLayout>
  );
}

export default function UsernamePage() {
  const router = useRouter();
  const { username } = router.query;

  if (!username || typeof username !== "string") {
    return <div>No Username</div>;
  }

  return <UserProfile username={username} />;
}
