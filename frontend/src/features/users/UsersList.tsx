import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery();

	if (isLoading) return <p>Loading...</p>;

	if (isError && !isSuccess)
		return <p className="errmsg">{error?.data?.message}</p>;

	const { ids } = users;
	return (
		<table className="table table--users">
			<thead className="table__thead">
				<tr>
					<th scope="col" className="table__th user__username">
						Username
					</th>
					<th scope="col" className="table__th user__roles">
						Roles
					</th>
					<th scope="col" className="table__th user__edit">
						Edit
					</th>
				</tr>
			</thead>
			<tbody>
				{ids?.length
					? ids.map((userId: number) => <User key={userId} userId={userId} />)
					: null}
			</tbody>
		</table>
	);
};
export default UsersList;
