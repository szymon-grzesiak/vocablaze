import { getWordSetWithProgress } from "@/lib/actions/action";
import Matching from "@/components/shared/matching";

const MatchingPage = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div>
      <Matching words={wordSet.words} />
    </div>
  );
};

export default MatchingPage;