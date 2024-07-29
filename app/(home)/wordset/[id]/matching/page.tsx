import { getWordSetWithProgress } from "@/lib/actions/action";
import Matching from "@/components/shared/matching";

const MatchingPage = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);

  return <Matching words={wordSet.words} />
   

};

export default MatchingPage;