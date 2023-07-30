import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import MainLayout from "@/layouts/main.layout";
import usersService from "@/services/users.service";
import { Profile } from "@/components/profile";
import { UserProfileTab } from "@/components/tab";
import { Spinner } from "@/components/spinner";
import { ErrorState } from "@/components/state";
import cloudError24Regular from "@iconify/icons-fluent/cloud-error-24-regular";
import Head from "next/head";
import { siteConfig } from "@/config/site";

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
    return (
      <MainLayout>
        <ErrorState error={error} icon={cloudError24Regular} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>
          {data.name} - {siteConfig.name}
        </title>
      </Head>
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
