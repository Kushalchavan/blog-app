import React from "react";

interface Props {
  email: string;
  mongoId: string;
  date: Date;
  deleteEmail: (mongoId: string) => Promise<void>;
}

const SubsTableItem = ({ email, mongoId, date, deleteEmail }: Props) => {
  const emailDate = new Date(date).toDateString();

  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace"
      >
        {email || "No Email"}
      </th>
      <td className="px-6 py-4  hidden sm:block">{emailDate}</td>
      <td
        className="px-6 py-4  cursor-pointer"
        onClick={() => deleteEmail(mongoId)}
      >
        x
      </td>
    </tr>
  );
};

export default SubsTableItem;
