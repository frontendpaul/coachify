import Card from '@components/pages/course/InfoCards/Card';

const Loader = () => {
  return (
    <div
      className="mx-auto max-w-3xl animate-pulse py-6 px-4 md:px-6
  xl:grid xl:max-w-7xl xl:grid-cols-[1fr,min(35%,400px)] xl:gap-6"
    >
      {/* Video */}
      <div className="relative mb-6 block xl:order-2 xl:mb-0">
        <div className="aspect-video rounded-2xl bg-white/5"></div>
      </div>

      {/* Overview */}
      <div className="grid gap-16">
        <div className="grid gap-6">
          <div>
            <div className="mb-4 h-6 rounded-full bg-white/5 xl:mb-5 xl:h-8"></div>
            <div className="mb-2 h-4 rounded-full bg-white/5 xl:h-5"></div>
            <div className="mb-1 h-4 w-1/2 rounded-full bg-white/5 xl:h-5"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-white/5"></div>
            <div className="h-4 w-32 rounded-full bg-white/5"></div>
          </div>
          <div className="my-1 h-6 w-20 rounded-full bg-white/5"></div>
          <div className="grid w-full grid-cols-2 justify-items-start gap-4 sm:flex md:grid md:grid-cols-4">
            <div className="h-12 w-full rounded-lg bg-white/5"></div>
            <div className="h-12 w-full rounded-lg bg-white/5"></div>
            <div className="h-12 w-10 shrink-0 rounded-lg bg-white/5"></div>
          </div>
        </div>

        {/* InfoCards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <div className="h-8 w-8 rounded-lg bg-white/5"></div>
            <div className="my-1 h-4 w-20 rounded-full bg-white/5"></div>
          </Card>
          <Card>
            <div className="h-8 w-8 rounded-lg bg-white/5"></div>
            <div className="my-1 h-4 w-20 rounded-full bg-white/5"></div>
          </Card>
          <Card>
            <div className="h-8 w-14 rounded-full bg-white/5"></div>
            <div className="my-1 h-4 w-20 rounded-full bg-white/5"></div>
          </Card>
          <Card>
            <div className="h-8 w-14 rounded-full bg-white/5"></div>
            <div className="my-1 h-4 w-20 rounded-full bg-white/5"></div>
          </Card>
        </div>

        {/* Content */}
        <div>
          <div className="mb-7 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-5 w-64 rounded-full bg-white/5 xl:h-6"></div>
            <div className="h-4 w-40 rounded-full bg-white/5"></div>
          </div>
          <div className="grid gap-0.5">
            <div className="h-10 rounded-lg bg-white/5"></div>
            <div className="h-10 rounded-lg bg-white/5"></div>
            <div className="h-10 rounded-lg bg-white/5"></div>
            <div className="h-10 rounded-lg bg-white/5"></div>
            <div className="h-10 rounded-lg bg-white/5"></div>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="mb-7 h-5 w-64 rounded-full bg-white/5 xl:h-6"></div>
          <p aria-hidden>
            <span className="rounded-full bg-white/5 box-decoration-clone text-transparent">
              Embroidery is for everyone with something to say — and Danielle
              Clough is here to help you find your voice.
            </span>
            <br />
            <br />
            <span className="rounded-full bg-white/5 box-decoration-clone text-transparent">
              Stuffy embroidery with rigid rules is a thing of the past — find
              new inspiration and a new way to express your creativity with
              master embroiderer Danielle Clough! Known for her groundbreaking
              techniques and nontraditional materials, Danielle’s warm and funny
              teaching style will make you wonder why you’ve never tried this
              before.
            </span>
            <br />
            <br />
            <span className="rounded-full bg-white/5 box-decoration-clone text-transparent">
              Danielle believes that embroidery is for absolutely everyone, and
              her colorful class breaks down the process of stitching into
              simple, easy to follow steps. From preparing your needle, thread,
              and fabric, through basic stitches, to her signature (and
              surprisingly simple) color-blending stitching technique, this
              class will have you working with fabric and thread as comfortably
              as you do with your tablet, your paints, or your pencils.
            </span>
          </p>
        </div>

        {/* Tags */}
        <div>
          <div className="mb-7 h-5 w-64 rounded-full bg-white/5 xl:h-6"></div>
          <div className="flex flex-wrap gap-3 align-top">
            <div className="h-10 w-32 rounded-full bg-white/5"></div>
            <div className="h-10 w-20 rounded-full bg-white/5"></div>
            <div className="h-10 w-44 rounded-full bg-white/5"></div>
          </div>
        </div>

        {/* Teacher */}
        <div>
          <div className="mb-7 h-5 w-64 rounded-full bg-white/5 xl:h-6"></div>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/5"></div>
            <div className="h-6 w-32 rounded-full bg-white/5"></div>
          </div>
          <p aria-hidden>
            <span className="rounded-full bg-white/5 box-decoration-clone text-transparent">
              Stuffy embroidery with rigid rules is a thing of the past — find
              new inspiration and a new way to express your creativity with
              master embroiderer Danielle Clough! Known for her groundbreaking
              techniques and nontraditional materials, Danielle’s warm and funny
              teaching style will make you wonder why you’ve never tried this
              before.
            </span>
            <br />
            <br />
            <span className="rounded-full bg-white/5 box-decoration-clone text-transparent">
              Danielle believes that embroidery is for absolutely everyone, and
              her colorful class breaks down the process of stitching into
              simple, easy to follow steps. From preparing your needle, thread,
              and fabric, through basic stitches, to her signature (and
              surprisingly simple) color-blending stitching technique, this
              class will have you working with fabric and thread as comfortably
              as you do with your tablet, your paints, or your pencils.
            </span>
          </p>
        </div>

        {/* Reviews */}
        <div>
          <div className="mb-7 h-5 w-64 rounded-full bg-white/5 xl:h-6"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            <li className="flex flex-col gap-4 rounded-lg bg-coachify-teal-1100 p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/5"></div>
                <div className="flex-1">
                  <div className="mb-2 h-4 w-32 rounded-full bg-white/5"></div>
                  <div className="h-3 w-20 rounded-full bg-white/5"></div>
                </div>
              </div>
              <p aria-hidden className="text-sm">
                <span className="rounded-full bg-white/5 box-decoration-clone text-transparent">
                  Danielle believes that embroidery is for absolutely everyone,
                  and her colorful class
                </span>
              </p>
            </li>
            <li className="flex flex-col gap-4 rounded-lg bg-coachify-teal-1100 p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/5"></div>
                <div className="flex-1">
                  <div className="mb-2 h-4 w-32 rounded-full bg-white/5"></div>
                  <div className="h-3 w-20 rounded-full bg-white/5"></div>
                </div>
              </div>
              <p aria-hidden className="mb-16 text-sm">
                <span className="rounded-full bg-white/5 box-decoration-clone text-transparent">
                  Danielle believes that embroidery is for absolutely everyone,
                  and her colorful class breaks down the process of stitching
                  into simple, easy to follow steps. From preparing your needle,
                  thread,
                </span>
              </p>
            </li>
          </div>
          <div className="mt-6 h-10 w-32 rounded-lg bg-white/5"></div>
        </div>

        {/* More Courses */}
        <div>
          <div className="mb-7 h-5 w-64 rounded-full bg-white/5 xl:h-6"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            <div className="overflow-hidden rounded-xl bg-coachify-teal-1100 p-4">
              <div className="animate-pulse">
                <div className="aspect-video rounded-lg bg-white/5"></div>
                <div className="flex flex-1 flex-col pt-3">
                  <div className="mb-3 mt-1 h-4 rounded-full bg-white/5"></div>
                  <div className="mb-3 h-[14px] w-32 rounded-full bg-white/5"></div>
                  <div className="my-1 h-4 w-14 rounded-full bg-white/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
