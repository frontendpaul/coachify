import Reviews from '@components/pages/course/learn/Reviews';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ReviewsPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Head>
        <title>No such course found.</title>
        <meta
          name="description"
          content="No such course found. Please search again or return to homepage."
        />
      </Head>
      <section className="mx-auto max-w-3xl py-6 px-4 md:px-6">
        <Reviews productId={id} />
      </section>
    </>
  );
};
export default ReviewsPage;
