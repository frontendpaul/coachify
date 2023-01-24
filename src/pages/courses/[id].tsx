import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCourseById } from 'server/courses';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import Button from '@components/ui/Button';
import { FiHeart, FiShare2 } from 'react-icons/fi';

const Course = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const course = getCourseById(id);

  const usersInput = `
  <p>
  <strong>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, in.
  </strong>
</p>
<br />
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
  dolorem? Quisquam eius soluta, natus dolores recusandae quae modi totam.
  Quaerat!
</p>
<br />
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vitae
  molestias debitis! Culpa provident sapiente praesentium id, expedita,
  quibusdam a necessitatibus maxime quasi officiis maiores suscipit eum
  tempore temporibus sit.
</p>
  `;

  const clean = DOMPurify.sanitize(usersInput, {
    ALLOWED_TAGS: ['h3', 'p', 'span', 'strong', 'br', 'ul', 'li'],
  });

  if (!course)
    return (
      <div className="grid place-items-center mt-20">
        <h3 className="text-xl text-semibold">No such course found.</h3>
        <Link href="/" className="underline">
          Go back to Homepage
        </Link>
      </div>
    );
  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-6
    xl:grid xl:grid-cols-[1fr,480px] xl:gap-6"
    >
      <div className="mb-6 xl:mb-0 xl:order-2">
        {/* <Image src={course.cover_image} width={640} height={360} alt="" /> */}
        <video
          className="w-full"
          src={course.course_content.sections[0].chapters[0].video.url}
          controls
        ></video>
      </div>

      <div className="grid gap-16">
        <div className="grid gap-6">
          <h1 className="text-3xl font-semibold">{course.title}</h1>
          <p className="text-lg">{course.course_metadata.short_description}</p>
          <div className="flex items-center gap-4">
            <Image
              src="/demo_profile_pic.png"
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <p className="leading-none">{course.owner}</p>
          </div>
          <p className="text-2xl font-semibold">
            {course.price
              ? course.price.toString().replace(/\./g, ',') + ' €'
              : 'Free'}
            {course.old_price && (
              <s className="ml-4 text-base text-white/75 line-through">
                {course.old_price.toString().replace(/\./g, ',') + ' €'}
              </s>
            )}
          </p>
          <div className="flex flex-wrap gap-4 max-w-sm sm:max-w-none">
            <Button className="w-full sm:w-44">
              {course.free ? 'Enroll now' : 'Buy now'}
            </Button>
            <Button
              fill="outline"
              icon="icon-left"
              className="flex-1 sm:flex-none"
            >
              <FiHeart />
              <span>Save for later</span>
            </Button>
            <Button fill="outline" icon="icon-only">
              <FiShare2 />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>

        <div>cards</div>

        <div>course content</div>

        <div>
          description
          <div dangerouslySetInnerHTML={{ __html: clean }}></div>
        </div>

        <div>skills</div>

        <div>teacher</div>

        <div>reviews</div>

        <div>more from creator</div>
      </div>
    </section>
  );
};
export default Course;
