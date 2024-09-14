"use client";
import SubsTableItem from "@/components/adminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Email {
  _id: string;
  email: string;
  date: string;
}

const page = () => {
  const [emails, setEmails] = useState<Email[]>([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      console.log(response);
      setEmails(response.data.emails);
    } catch (error) {
      console.error("Failed to fetch emails: ", error);
      toast.error("Error fetching emails");
    }
  };

  const deleteEmail = async (mongoId: string) => {
    try {
      const response = await axios.delete("/api/email", {
        params: {
          id: mongoId,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchEmails(); // refetch emails after deletion
      } else {
        toast.error("Error deleting email");
      }
    } catch (error) {
      console.error("Failed to delete email: ", error);
      toast.error("Error occurred during deletion");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscriptions</h1>
      <div className="relative max-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.length > 0 ? (
              emails.map((item) => {
                return (
                  <SubsTableItem
                    key={item._id}
                    mongoId={item._id}
                    email={item.email}
                    date={new Date(item.date)}
                    deleteEmail={deleteEmail}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No emails found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
