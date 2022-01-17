import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { useUsersQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () =>
{
    const [{ data }] = useUsersQuery();
    return (
        <>
            <Navbar />
            {!data && <div>loading...</div>}
            {data && data.users.map((user) =>
                <div key={user.id}>
                    {user.username} - {user.email}
                </div>)}
        </>)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
