import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import MainLayout from "@/layouts/main.layout";
import { Spinner } from "@/components/spinner";
import { ErrorState } from "@/components/state";
import cloudError24Regular from "@iconify/icons-fluent/cloud-error-24-regular";
import photosService from "@/services/photos.service";
import { SinglePhoto } from "@/components/single-photo";

interface SinglePhotosPageProps {
  photoId: string;
}

function SinglePhotosPage({ photoId }: SinglePhotosPageProps) {
  const { data, isLoading, error } = useSWR("GET_PHOTO_" + photoId, () =>
    photosService.getPhoto(photoId)
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
      <SinglePhoto image={data} />
    </MainLayout>
  );
}

export default function PhotosPage() {
  const router = useRouter();
  const { photoId } = router.query;

  if (!photoId || typeof photoId !== "string") {
    return <div>No photoId</div>;
  }

  return <SinglePhotosPage photoId={photoId} />;
}
