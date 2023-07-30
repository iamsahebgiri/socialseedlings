import { useEffect, useRef, useState } from "react";
import style from "./tabs.module.css";
import { UserProfile } from "@/types/unsplash";
import LikesTab from "./likes-tab";
import PhotosPage from "@/pages/photos/[photoId]";
import PhotosTab from "./photos-tab";
import CollectionsTab from "./collections-tab";

const tabs = [
  { id: "photos", label: "Photos" },
  { id: "likes", label: "Likes" },
  { id: "collections", label: "Collections" },
];

interface UserProfileTabProps {
  profile: UserProfile;
}

interface TabMeta {
  width: number;
  left: number;
}

export function UserProfileTab({ profile }: UserProfileTabProps) {
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [tabsMeta, setTabsMeta] = useState<TabMeta[]>([]);

  const [tabMeta, setTabMeta] = useState<TabMeta>();
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    if (tabsRef.current) {
      let tabsMetadata = [];
      let prev = 0;
      for (let i = 0; i < tabsRef.current.childElementCount; i++) {
        const element = tabsRef.current.children[i] as HTMLElement;
        tabsMetadata.push({
          width: element.offsetWidth,
          left: prev,
        });
        prev += element.offsetWidth;
      }
      setTabsMeta(tabsMetadata);
      setTabMeta({
        left: 0,
        width: (tabsRef.current.children[0] as HTMLElement).offsetWidth,
      });
    }
  }, [tabsRef]);

  const getBadgeCount = (id: string) => {
    if (id === "likes") {
      return profile.total_likes;
    } else if (id === "photos") {
      return profile.total_photos;
    } else if (id === "collections") {
      return profile.total_collections;
    }
    return 0;
  };

  const getActiveTabContent = () => {
    if (activeTab === "likes") {
      return <LikesTab key="likes" username={profile.username} />;
    } else if (activeTab === "photos") {
      return <PhotosTab key="photos" username={profile.username} />;
    } else if (activeTab === "collections") {
      return <CollectionsTab />;
    }
  };

  return (
    <>
      <div className={style.tabs__scroller}>
        <div className={style.tabs__container} ref={tabsRef}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              title={tab.label}
              onClick={(e) => {
                setActiveTab(tab.id);
                setTabMeta(tabsMeta[index]);
              }}
              className={`${
                activeTab === tab.id ? style.tabs__tab_active : ""
              } ${style.tabs__tab}`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {tab.label}
              {getBadgeCount(tab.id) !== 0 ? (
                <span className={style.tabs__tab_badge}>
                  {getBadgeCount(tab.id)}
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <span
          className={style.tabs__indicator}
          style={{
            left: tabMeta?.left,
            width: tabMeta?.width,
          }}
        />
      </div>
      <div className={style.tabs__active_content}>{getActiveTabContent()}</div>
    </>
  );
}
