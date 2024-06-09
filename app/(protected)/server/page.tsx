import { currentUser } from "@/lib/sessionData"
import { UserInfo } from "@/components/user-info"

const ServerPage = async () => {
  const user = await currentUser()

  return <UserInfo label="💻Server Component" user={user} />
}

export default ServerPage
