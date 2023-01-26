import { nanoid } from 'nanoid';

export type Course = {
  id: string;
  title: string;
  owner: string;
  free: boolean;
  price?: number;
  old_price?: number;
  cover_image: string;
  course_metadata: CourseMetadata;
  course_content: CourseContent;
  reviews?: Review[];
  //TODO: to be addded later
  category?: string;
  slug?: string;
  state?: 'published' | 'unlisted' | 'draft';
  created_at?: string;
  updated_at?: string;
};

type CourseMetadata = {
  rating: number;
  participants: number;
  duration: string;
  language: 'English' | 'German';
  level: 'Beginner' | 'Intermediate' | 'Expert' | 'All levels';
  short_description: string;
  description: string; // ultimately reach text
  skill_tags: string[];
};

type Review = {
  id: string;
  author: string;
  profile_image: string;
  reating: number;
  created_at: string;
  updated_at?: string;
};

type CourseContent = {
  sections: Section[];
};

type Section = {
  id: string;
  title: string;
  chapters: Chapter[];
};

type Chapter = {
  id: string;
  title: string;
  description?: string;
  video: {
    url: string;
    duration: string;
    //TODO: to be addded later
    id?: string;
  };
};

const courses: Course[] = [
  {
    id: 'UJV8zBbfNsSYscnIK7fJ_',
    title: 'How to create stunning motion Scenes',
    owner: 'John Smith',
    free: false,
    price: 14.99,
    cover_image: '/courses/filmmaking.jpg',
    course_metadata: {
      rating: 4.9,
      participants: 320,
      duration: '4h30min',
      language: 'English',
      level: 'Beginner',
      short_description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
      description: `
<p style="font-size: 2rem"><strong>Embroidery is for everyone with something to say — and Danielle Clough is here to help you find your voice.</strong></p>
<p><span style="font-weight:400;">Stuffy embroidery with rigid rules is a thing of the past — find new inspiration and a new way to express your creativity with master embroiderer Danielle Clough! Known for her groundbreaking techniques and nontraditional materials, Danielle’s warm and funny teaching style will make you wonder why you’ve never tried this before.</span></p>
<p>Danielle believes that embroidery is for absolutely everyone, and her colorful class breaks down the process of stitching into simple, easy to follow steps. From preparing your needle, thread, and fabric, through basic stitches, to her signature (and surprisingly simple) color-blending stitching technique, this class will have you working with fabric and thread as comfortably as you do with your tablet, your paints, or your pencils.</p>
<ol><li><span style="font-weight:400;">Use stitching to create different textures, color gradients, and dimension</span></li>
<li><span style="font-weight:400;">Prepare your fabric, hoop, design, and needle and thread</span></li>
<li><span style="font-weight:400;">Create a complete (and beautiful) floral embroidery</span></li></ol>
<p>Working with Danielle, you’ll learn how to:</p>
<ul><li><span style="font-weight:400;">Create a variety of basic stitches, including French knots</span></li>
<li><span style="font-weight:400;">Use stitching to create different textures, color gradients, and dimension</span></li>
<li><span style="font-weight:400;">Prepare your fabric, hoop, design, and needle and thread</span></li>
<li><span style="font-weight:400;">Create a complete (and beautiful) floral embroidery</span></li>
</ul><p><span style="font-weight:400;">Pick up a </span><a href="https://www.amazon.com/Caydo-Embroidery-Instruction-Pattern-Threads/dp/B07RWX5M9K/ref=sr_1_40?gclid=EAIaIQobChMI1c-L3ump5wIVyp-zCh3vXw9HEAAYASAAEgLIzvD_BwE&amp;hvadid=177578537506&amp;hvdev=c&amp;hvlocphy=9004338&amp;hvnetw=g&amp;hvqmt=b&amp;hvrand=4043106024154581224&amp;hvtargid=kwd-267468683987&amp;hydadcr=29537_10164147&amp;keywords=embroidery+kit+beginner+adults&amp;qid=1580335833&amp;sr=8-40" rel="nofollow noreferrer noopener" target="_blank"><span style="font-weight:400;">complete beginner kit</span></a><span style="font-weight:400;"> (don’t forget your </span><a href="https://www.amazon.com/Caydo-Pieces-Embroidery-Plastic-Multicolor/dp/B01LCEOMRE/ref=sr_1_16?keywords=embroidery+kit+beginner+adults+plastic+hoops&amp;qid=1580335964&amp;sr=8-16" rel="nofollow noreferrer noopener" target="_blank"><span style="font-weight:400;">plastic hoops</span></a><span style="font-weight:400;">) and get started with a brand new way to explore your creative voice!</span></p><p></p>
        `,
      skill_tags: ['HTML', 'CSS', 'JavaScript'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Introduction',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Welcome to the course!',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
            {
              id: '9MMMYNLyVh6',
              title: 'What you will learn',
              video: {
                url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                duration: '10m53s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'What is ReactJS?',
          chapters: [
            {
              id: 'SYsnIK7fJ',
              title: 'A little bit of history',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
            {
              id: '9MMYNLyVh6',
              title: 'Basics',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'dsiXfimpcH9MMMYNLyVh6',
    title: 'Create native mobile Apps add more text for testing',
    owner: 'Sara Doe',
    free: false,
    price: 114.99,
    old_price: 249.99,
    cover_image: '/courses/mobile-app.jpg',
    course_metadata: {
      rating: 4.7,
      participants: 120,
      duration: '30min',
      language: 'German',
      level: 'Intermediate',
      short_description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'Responsive Design',
        'Mobile first',
        'Skill',
        'Other skill',
      ],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
            {
              id: '9MMMYNLyVh6',
              title: 'Chapter title',
              video: {
                url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                duration: '10m53s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
            {
              id: 'SYscnI',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
            {
              id: 'SK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
            {
              id: 'cnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
            {
              id: 'SYcnIK7J',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'yCZFTzlhEW6U',
          title: 'Section title',
          chapters: [
            {
              id: 'Un83LcC',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'yCZFTzlhEW6',
          title: 'Section title',
          chapters: [
            {
              id: 'Un83LcC',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'yCZFTzlhEW',
          title: 'Section title',
          chapters: [
            {
              id: 'Un83LcC',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'yCZFTzlhE',
          title: 'Section title',
          chapters: [
            {
              id: 'Un83LcC',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'yCZFTzl',
          title: 'Section title',
          chapters: [
            {
              id: 'Un83LcC',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'yCZFTz',
          title: 'Section title',
          chapters: [
            {
              id: 'Un83LcC',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'CZFTzlhEW6U',
          title: 'Section title',
          chapters: [
            {
              id: 'Un83LcC',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'PbyyCZFTzlhEW6Un83LcC',
    title: 'Cooking 101',
    owner: 'Sara Doe',
    free: true,
    cover_image: '/courses/cooking.jpg',
    course_metadata: {
      rating: 5.0,
      participants: 17,
      duration: '1h27min',
      language: 'German',
      level: 'Expert',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'F3SzYuhyZ4jS-paCf8SYm',
    title: 'Learn JavaScript',
    owner: 'Poul Sparrow',
    free: false,
    price: 99.99,
    cover_image: '/courses/coding.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 78,
      duration: '7h12min',
      language: 'English',
      level: 'All levels',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'REuq4PB-2OU1NGKvfoSNI',
    title: 'Knitting',
    owner: 'Sara Doe',
    free: false,
    price: 69.99,
    cover_image: '/courses/knitting.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 3,
      duration: '7h12min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'cKSDVDId2kbIsGoZcKqrr',
    title: 'Oil Painting',
    owner: 'Sara Doe',
    free: false,
    price: 39.99,
    cover_image: '/courses/painting.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 33,
      duration: '2h42min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'UJV8zBbfNsSYscnIK7f',
    title: 'How to create stunning motion Scenes',
    owner: 'John Smith',
    free: false,
    price: 14.99,
    cover_image: '/courses/filmmaking.jpg',
    course_metadata: {
      rating: 4.0,
      participants: 320,
      duration: '4h30min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'dsiXfimpcH9MMMYNLyV',
    title: 'Create native mobile Apps add more text for testing',
    owner: 'Sara Doe',
    free: false,
    price: 114.99,
    cover_image: '/courses/mobile-app.jpg',
    course_metadata: {
      rating: 4.7,
      participants: 420,
      duration: '30min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'PbyyCZFTzlhEW6Un83L',
    title: 'Cooking 101',
    owner: 'Sara Doe',
    free: true,
    cover_image: '/courses/cooking.jpg',
    course_metadata: {
      rating: 5.0,
      participants: 170,
      duration: '1h27min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'F3SzYuhyZ4jS-paCf8S',
    title: 'Learn JavaScript',
    owner: 'Poul Sparrow',
    free: false,
    price: 29.99,
    old_price: 99.99,
    cover_image: '/courses/coding.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 780,
      duration: '7h12min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'REuq4PB-2OU1NGKvfoS',
    title: 'Knitting',
    owner: 'Sara Doe',
    free: false,
    price: 69.99,
    cover_image: '/courses/knitting.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 30,
      duration: '7h12min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'cKSDVDId2kbIsGoZcKq',
    title: 'Oil Painting',
    owner: 'Sara Doe',
    free: false,
    price: 39.99,
    cover_image: '/courses/painting.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 330,
      duration: '2h42min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'UJV8zBbfNsSYscnIK',
    title: 'How to create stunning motion Scenes',
    owner: 'John Smith',
    free: false,
    price: 14.99,
    cover_image: '/courses/filmmaking.jpg',
    course_metadata: {
      rating: 4.0,
      participants: 32,
      duration: '4h30min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'dsiXfimpcH9MMMYNL',
    title: 'Create native mobile Apps add more text for testing',
    owner: 'Sara Doe',
    free: false,
    price: 114.99,
    cover_image: '/courses/mobile-app.jpg',
    course_metadata: {
      rating: 4.7,
      participants: 42,
      duration: '30min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'PbyyCZFTzlhEW6Un8',
    title: 'Cooking 101',
    owner: 'Sara Doe',
    free: true,
    cover_image: '/courses/cooking.jpg',
    course_metadata: {
      rating: 5.0,
      participants: 17,
      duration: '1h27min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'F3SzYuhyZ4jS-paCf',
    title: 'Learn JavaScript',
    owner: 'Poul Sparrow',
    free: false,
    price: 29.99,
    old_price: 99.99,
    cover_image: '/courses/coding.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 78,
      duration: '7h12min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'REuq4PB-2OU1NGKvf',
    title: 'Knitting',
    owner: 'Sara Doe',
    free: false,
    price: 69.99,
    cover_image: '/courses/knitting.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 10,
      duration: '7h12min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'cKSDVDId2kbIsGoZc',
    title: 'Oil Painting',
    owner: 'Sara Doe',
    free: false,
    price: 39.99,
    cover_image: '/courses/painting.jpg',
    course_metadata: {
      rating: 4.8,
      participants: 30,
      duration: '2h42min',
      language: 'English',
      level: 'Beginner',
      short_description: 'Short description',
      description:
        '<strong>Long description</strong><br/><br/>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
      skill_tags: ['Skill 1', 'Skill 2', 'Skill 3'],
    },
    course_content: {
      sections: [
        {
          id: 'UJV8zBbfNsS',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
        {
          id: 'dsiXfimpcH9M',
          title: 'Section title',
          chapters: [
            {
              id: 'SYscnIK7fJ',
              title: 'Chapter title',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dolor quasi magnam sunt labore debitis nam officia esse quae obcaecati?',
              video: {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                duration: '0m31s',
              },
            },
          ],
        },
      ],
    },
  },
];

export function getCourses(): Course[] {
  return courses;
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getTopRankedCourses() {
  const filteredCourses = courses.filter(
    (course) => course.course_metadata.rating > 4.5
  );
  const topRankedCourses = filteredCourses.sort(
    (a, b) =>
      b.course_metadata.rating * b.course_metadata.participants -
      a.course_metadata.rating * a.course_metadata.participants
  );
  return topRankedCourses;
}
