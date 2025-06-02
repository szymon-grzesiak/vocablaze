import Matching from "@/components/shared/Matching";
import { getWordSetWithProgress } from "@/lib/actions/action";

const MatchingPage = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);

  return <Matching words={wordSet.words} />
   

};

export default MatchingPage;