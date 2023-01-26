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
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil possimus reiciendis. Dolores officia maxime eum amet est odit quam ducimus eaque nemo pariatur aperiam libero recusandae soluta aliquid praesentium, dolorum nobis culpa. Blanditiis, consequatur natus aspernatur id veniam voluptate maiores accusantium odit eius excepturi animi et alias sit ad praesentium beatae dolores ea provident iure impedit libero necessitatibus, non deleniti? Ut qui modi neque eius nemo. Aperiam quaerat magni perferendis voluptatibus sed nesciunt fuga et amet, rerum corrupti praesentium ut delectus reiciendis vero omnis iusto, soluta dolorum porro eligendi explicabo earum. Omnis optio libero nobis officia repudiandae sunt in.',
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
