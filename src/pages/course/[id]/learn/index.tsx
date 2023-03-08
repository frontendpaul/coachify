import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Content from '@components/pages/course/learn/Content';
import * as Tabs from '@radix-ui/react-tabs';
import SectionTitle from '@components/ui/SectionTitle';
import { isMediumScreenAtom } from '@components/Layout';
import { useAtom } from 'jotai';
import About from '@components/pages/course/learn/About';
import Reviews from '@components/pages/course/learn/Reviews';
import Resources from '@components/pages/course/learn/Resources';
import TabTriggerList from '@components/pages/course/learn/TabTriggerList';
import { isCourseOwnedByUser } from 'utils/helpers';
import useUserContracts from 'hooks/useUserContracts';
import useProduct from 'hooks/useProduct';
import { Chapter } from 'types/supabase';
import { GetServerSidePropsContext } from 'next';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import useUserProgress from 'hooks/useUserProgress';
import { FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { mutate } from 'swr';

const Learn = ({ id }: { id: string }) => {
  const router = useRouter();
  const { product, isLoading } = useProduct(id);

  const videoPlayer = useRef<HTMLVideoElement>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | undefined>(
    undefined
  );
  const [currentSection, setCurrentSection] = useState<string>('');

  const { data: progress } = useUserProgress(id);

  useEffect(() => {
    if (progress?.current_chapter && product?.content?.sections) {
      product.content.sections.find((section) =>
        section.chapters.find((chapter) => {
          if (chapter.id === progress.current_chapter)
            setCurrentChapter(chapter);
        })
      );
    }
  }, [progress]);

  useEffect(() => {
    if (product && currentChapter) {
      product.content?.sections.forEach((section) => {
        const isChapterInSection = section.chapters.some(
          (chapter) => chapter.id === currentChapter.id
        );

        if (isChapterInSection) {
          setCurrentSection(section.id as string);
          return;
        }
      });
    }
  }, [product, currentChapter]);

  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    if (progress?.playlist.length && currentChapter) {
      const index = progress.playlist.findIndex(
        (chapter) => chapter === currentChapter.id
      );
      progress.playlist[index - 1]
        ? setHasPrevious(true)
        : setHasPrevious(false);
      progress.playlist[index + 1] ? setHasNext(true) : setHasNext(false);
    }
  }, [progress, currentChapter]);

  const supabase = useSupabaseClient();

  const handleChapterChange = async (chapterId: string) => {
    product?.content?.sections.find((section) =>
      section.chapters.find((chapter) => {
        if (chapter.id === chapterId) setCurrentChapter(chapter);
      })
    );

    if (user && progress) {
      const { data, error } = await supabase
        .from('progress')
        .update({ current_chapter: chapterId })
        .match({ user_id: user.id, product_id: id });

      if (error) {
        console.log(error);
        return;
      }

      mutate(`/api/users/products/${id}/progress`);
    }
  };

  const playPrevious = () => {
    if (progress?.playlist.length && currentChapter) {
      const index = progress.playlist.findIndex(
        (chapter) => chapter === currentChapter.id
      );
      handleChapterChange(progress?.playlist[index - 1]);
    }
  };
  const playNext = () => {
    if (progress?.playlist.length && currentChapter) {
      const index = progress.playlist.findIndex(
        (chapter) => chapter === currentChapter.id
      );
      handleChapterChange(progress?.playlist[index + 1]);
    }
  };

  const [isMediumScreen] = useAtom(isMediumScreenAtom);

  const [openTab, setOpenTab] = useState('about');

  useEffect(() => {
    !isMediumScreen && openTab === 'content' && setOpenTab('about');
  }, [isMediumScreen, openTab, setOpenTab]);

  const user = useUser();
  const { contracts } = useUserContracts(user?.id as string);

  useEffect(() => {
    if (id && contracts) {
      const isOwned = isCourseOwnedByUser(contracts, id);
      if (!isOwned) {
        router.push('/course/' + id);
      }
    }
  }, [id, contracts, router]);

  if (isLoading) {
    return (
      <div className="mt-20 grid place-items-center">
        <h1 className="text-semibold text-xl">Loading...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Head>
          <title>No such course found.</title>
          <meta
            name="description"
            content="No such course found. Please search again or return to homepage."
          />
        </Head>
        <div className="mt-20 grid place-items-center">
          <h1 className="text-semibold text-xl">No such course found.</h1>
          <Link href="/" className="underline">
            Go back to Homepage
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.metadata?.title}</title>
        <meta
          name="description"
          content={product.metadata?.short_description}
        />
      </Head>

      <section className="flex min-h-screen flex-col">
        <h1 className="sr-only">{product.metadata?.title}</h1>
        <div className="border-white/10 lg:grid lg:grid-cols-[1fr,min(30%,550px)]">
          <h2 className="sr-only">Video for {currentChapter?.title}</h2>
          <div className="group relative">
            {hasPrevious && (
              <button
                onClick={playPrevious}
                className="transition-200-out-quart absolute bottom-1/2 left-1 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-xl opacity-0 hover:bg-[#17181b]/80 group-hover:opacity-100 2xl:left-6"
              >
                <span className="sr-only">Previous</span>
                <FiSkipBack fill="white" />
              </button>
            )}
            {hasNext && (
              <button
                onClick={playNext}
                className="transition-200-out-quart absolute bottom-1/2 right-1 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-xl opacity-0 hover:bg-[#17181b]/80 group-hover:opacity-100 2xl:right-6"
              >
                <span className="sr-only">Next</span>
                <FiSkipForward fill="white" />
              </button>
            )}
            <video
              className="max-h-[50vh] w-full bg-coachify-teal-1200 lg:max-h-[70vh]"
              src={currentChapter?.video?.src || ''}
              controls
              ref={videoPlayer}
            ></video>
          </div>
          <div className="custom-scrollbar hidden h-0 min-h-full overflow-auto px-2 lg:block lg:px-4">
            <SectionTitle className="mb-4">Course content</SectionTitle>
            {product.content && currentChapter && (
              <Content
                content={product.content}
                currentSectionId={currentSection}
                currentChapter={currentChapter}
                handleChapterChange={handleChapterChange}
                videoPlayer={videoPlayer}
              />
            )}
          </div>
        </div>
        <div className="flex-1 bg-coachify-teal-1200 px-4 pb-4 md:px-6 md:pb-6">
          <Tabs.Root value={openTab} onValueChange={setOpenTab}>
            {/* TODO: add scroll on mouse drag */}
            <TabTriggerList productId={product.id ?? ''} />

            <div className="mx-auto py-4 md:max-w-2xl md:py-6">
              {isMediumScreen && (
                <Tabs.Content value="content">
                  {product.content && currentChapter && (
                    <Content
                      content={product.content}
                      currentSectionId={currentSection}
                      currentChapter={currentChapter}
                      handleChapterChange={handleChapterChange}
                      videoPlayer={videoPlayer}
                    />
                  )}
                </Tabs.Content>
              )}

              <Tabs.Content value="about">
                {currentChapter?.description ? (
                  <About description={currentChapter.description} />
                ) : (
                  <h2>
                    A description for this chapter has not yet been added by the
                    author.
                  </h2>
                )}
              </Tabs.Content>
              <Tabs.Content value="resources">
                {currentChapter?.resources ? (
                  <Resources resources={currentChapter.resources} />
                ) : (
                  <h2>No resources attached to this chapter.</h2>
                )}
              </Tabs.Content>
              <Tabs.Content value="discussion">
                <div className="mx-auto lg:max-w-3xl">
                  <SectionTitle>Comments</SectionTitle>
                </div>
              </Tabs.Content>
              <Tabs.Content value="announcements">
                <div className="mx-auto lg:max-w-3xl">
                  <SectionTitle>Announcements</SectionTitle>
                </div>
              </Tabs.Content>
              <Tabs.Content value="reviews">
                <Reviews productId={product.id as string} />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;
  return {
    props: {
      id: id,
    },
  };
}

export default Learn;
