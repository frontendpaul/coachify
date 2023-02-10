import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { FiGlobe } from 'react-icons/fi';
import { Language, Level } from 'types/supabase';
import Card from './Card';

type Props = {
  level: Level;
  language: Language;
  participants: number;
  rating: number;
};

const InfoCards = ({ level, language, participants, rating }: Props) => {
  let barIconSrc = '';
  if (level == 'all levels') {
    barIconSrc = '/icons/bars_blank.svg';
  }
  if (level === 'beginner') {
    barIconSrc = '/icons/bars_beginner.svg';
  }
  if (level === 'intermediate') {
    barIconSrc = '/icons/bars_intermediate.svg';
  }
  if (level === 'expert') {
    barIconSrc = '/icons/bars_expert.svg';
  }

  return (
    <section>
      <h2 className="sr-only">Additional Informations</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <Image src={barIconSrc} alt="" width={32} height={32} aria-hidden />
          <span className="block first-letter:capitalize">{level}</span>
        </Card>
        <Card>
          <FiGlobe className="h-8 w-8" aria-hidden />
          <span>{language}</span>
        </Card>
        <Card>
          <span className="text-2xl font-bold">{participants}</span>
          <span>Students</span>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-2xl">
            <span className="font-bold">{rating}</span>
            <AiFillStar aria-hidden />
          </div>
          <span>Avg. Rating</span>
        </Card>
      </div>
    </section>
  );
};
export default InfoCards;
